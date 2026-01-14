import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import jwt from 'jsonwebtoken'

async function getUserIdFromToken(request: NextRequest): Promise<string | null> {
  const authHeader = request.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return null
  }

  const token = authHeader.substring(7)
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as any
    return decoded.userId
  } catch {
    return null
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserIdFromToken(request)
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user with profile
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        publisherProfile: true,
      },
    })

    if (!user || user.role !== 'PUBLISHER') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get performance data dates
    const now = new Date()
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000)

    // Get earnings data
    const commissions = await prisma.commission.findMany({
      where: { publisherId: userId },
      include: {
        advertiser: {
          select: {
            name: true,
          },
        },
      },
    })

    // Get previous period commissions for comparison
    const previousPeriodCommissions = await prisma.commission.findMany({
      where: {
        publisherId: userId,
        createdAt: { gte: sixtyDaysAgo, lt: thirtyDaysAgo },
      },
    })

    // Current period earnings
    const currentPending = commissions
      .filter((c: any) => c.status === 'PENDING')
      .reduce((sum: number, c: any) => sum + Number(c.amount), 0)
    const currentApproved = commissions
      .filter((c: any) => c.status === 'APPROVED')
      .reduce((sum: number, c: any) => sum + Number(c.amount), 0)

    // Previous period earnings
    const previousPending = previousPeriodCommissions
      .filter((c: any) => c.status === 'PENDING')
      .reduce((sum: number, c: any) => sum + Number(c.amount), 0)
    const previousApproved = previousPeriodCommissions
      .filter((c: any) => c.status === 'APPROVED')
      .reduce((sum: number, c: any) => sum + Number(c.amount), 0)

    // Calculate percentage changes
    const pendingChange = previousPending
      ? ((currentPending - previousPending) / previousPending) * 100
      : 0
    const approvedChange = previousApproved
      ? ((currentApproved - previousApproved) / previousApproved) * 100
      : 0

    const earnings = {
      pending: currentPending,
      approved: currentApproved,
      declined: commissions
        .filter((c: any) => c.status === 'DECLINED')
        .reduce((sum: number, c: any) => sum + Number(c.amount), 0),
      paid: commissions
        .filter((c: any) => c.status === 'PAID')
        .reduce((sum: number, c: any) => sum + Number(c.amount), 0),
      pendingChange: pendingChange,
      approvedChange: approvedChange,
    }

    const currentPeriodCommissions = await prisma.commission.count({
      where: {
        publisherId: userId,
        createdAt: { gte: thirtyDaysAgo },
      },
    })

    const previousPeriodCommissionsCount = previousPeriodCommissions.length

    // Calculate performance metrics
    const totalSales = commissions.reduce((sum: number, c: any) => sum + Number(c.amount), 0)
    
    // Use already fetched previous period commissions data
    const previousPeriodCommissionsData = previousPeriodCommissions
    
    const previousPeriodSales = previousPeriodCommissionsData.reduce(
      (sum: number, c: any) => sum + Number(c.amount),
      0
    )
    
    const salesChange = previousPeriodSales
      ? ((totalSales - previousPeriodSales) / previousPeriodSales) * 100
      : 0

    const performance = {
      totalCommissions: commissions.length,
      totalTransactions: commissions.length,
      totalSales: totalSales,
      commissionsChange: previousPeriodCommissionsCount
        ? ((currentPeriodCommissions - previousPeriodCommissionsCount) / previousPeriodCommissionsCount) * 100
        : 0,
      transactionsChange: previousPeriodCommissionsCount
        ? ((currentPeriodCommissions - previousPeriodCommissionsCount) / previousPeriodCommissionsCount) * 100
        : 0,
      salesChange: salesChange,
      chartData: Array.from({ length: 31 }, (_, i) => {
        const day = i + 1
        const dayDate = new Date(now)
        dayDate.setDate(dayDate.getDate() - (31 - day))
        
        // Get commissions for this day
        const dayStart = new Date(dayDate.setHours(0, 0, 0, 0))
        const dayEnd = new Date(dayDate.setHours(23, 59, 59, 999))
        
        const currentDayCommissions = commissions.filter((c: any) => {
          const cDate = new Date(c.createdAt)
          return cDate >= dayStart && cDate <= dayEnd
        }).length
        
        const previousDayCommissions = previousPeriodCommissionsData.filter((c: any) => {
          const cDate = new Date(c.createdAt)
          const prevDayStart = new Date(dayStart)
          prevDayStart.setDate(prevDayStart.getDate() - 30)
          const prevDayEnd = new Date(dayEnd)
          prevDayEnd.setDate(prevDayEnd.getDate() - 30)
          return cDate >= prevDayStart && cDate <= prevDayEnd
        }).length
        
        return {
          day: day,
          current: currentDayCommissions,
          previous: previousDayCommissions,
        }
      }),
    }

    // Get account summary (advertiser counts)
    const allAdvertisers = await prisma.advertiser.findMany({
      where: { status: 'ACTIVE' },
    })
    
    // Get tracking links to determine joined advertisers
    const trackingLinks = await prisma.trackingLink.findMany({
      where: { publisherId: userId },
      select: { advertiserId: true },
      distinct: ['advertiserId'],
    })
    
    const joinedAdvertiserIds = new Set(trackingLinks.map((tl) => tl.advertiserId))
    const joinedCount = joinedAdvertiserIds.size
    const notJoinedCount = allAdvertisers.length - joinedCount

    const accountSummary = {
      joinedAdvertisers: joinedCount,
      pendingAdvertisers: 0, // Would need a separate table for pending applications
      rejectedAdvertisers: 0, // Would need a separate table for rejected applications
      holdAdvertisers: 0, // Would need a separate table for hold status
      notJoinedAdvertisers: notJoinedCount,
    }

    // Get top advertisers by sales (from commissions)
    const topAdvertisersBySales = await prisma.commission.groupBy({
      by: ['advertiserId'],
      where: { publisherId: userId },
      _sum: { amount: true },
      orderBy: { _sum: { amount: 'desc' } },
      take: 5,
    })

    const topAdvertisersBySalesData = await Promise.all(
      topAdvertisersBySales.map(async (item) => {
        const advertiser = await prisma.advertiser.findUnique({
          where: { id: item.advertiserId },
          select: { name: true },
        })
        return {
          name: advertiser?.name || 'Unknown',
          totalSales: Number(item._sum.amount || 0),
        }
      })
    )

    // Get top advertisers by clicks (from tracking links)
    const topAdvertisersByClicks = await prisma.trackingLink.findMany({
      where: { publisherId: userId },
      select: {
        advertiserId: true,
        clickCount: true,
        advertiser: {
          select: { name: true },
        },
      },
      orderBy: { clickCount: 'desc' },
      take: 5,
    })

    const topAdvertisersByClicksData = topAdvertisersByClicks.map((link) => ({
      name: link.advertiser?.name || 'Unknown',
      totalClicks: link.clickCount,
    }))

    return NextResponse.json({
      profile: user.publisherProfile,
      earnings,
      performance,
      accountSummary,
      topAdvertisersBySales: topAdvertisersBySalesData,
      topAdvertisersByClicks: topAdvertisersByClicksData,
    })
  } catch (error: any) {
    console.error('Dashboard error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

