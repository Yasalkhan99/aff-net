import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { click_id, order_id, transaction_id, amount, status, currency } = body

    // Validate required fields
    if (!click_id) {
      return NextResponse.json({ error: 'click_id is required' }, { status: 400 })
    }

    // Find the click record
    const click = await prisma.linkClick.findUnique({
      where: { id: click_id },
      include: {
        trackingLink: {
          include: {
            advertiser: true,
            publisher: true,
          },
        },
      },
    })

    if (!click) {
      return NextResponse.json({ error: 'Click not found' }, { status: 404 })
    }

    const trackingLink = click.trackingLink

    // Mark click as converted
    const saleAmountNum = amount ? parseFloat(amount.toString()) : 0
    const saleAmount = new Prisma.Decimal(saleAmountNum)
    
    await prisma.linkClick.update({
      where: { id: click_id },
      data: {
        converted: true,
        convertedAt: new Date(),
        conversionValue: amount ? new Prisma.Decimal(amount.toString()) : null,
      },
    })

    // Calculate commission amount
    let commissionAmount = new Prisma.Decimal(0)

    if (trackingLink.advertiser.commissionType === 'percentage') {
      const rate = parseFloat(trackingLink.advertiser.commissionRate.replace('%', ''))
      commissionAmount = new Prisma.Decimal((saleAmountNum * rate) / 100)
    } else if (trackingLink.advertiser.commissionType === 'fixed') {
      commissionAmount = new Prisma.Decimal(trackingLink.advertiser.commissionRate)
    } else if (trackingLink.advertiser.commissionType === 'cpa') {
      commissionAmount = new Prisma.Decimal(trackingLink.advertiser.commissionRate)
    }

    // Create commission record
    const commissionStatus = status === 'approved' || status === 'completed' ? 'APPROVED' : 'PENDING'

    const commission = await prisma.commission.create({
      data: {
        publisherId: trackingLink.publisherId,
        advertiserId: trackingLink.advertiserId,
        trackingLinkId: trackingLink.id,
        amount: commissionAmount,
        status: commissionStatus,
        transactionId: transaction_id || null,
        orderId: order_id || null,
        ...(commissionStatus === 'APPROVED' && { approvedAt: new Date() }),
      },
    })

    // Update tracking link stats
    await prisma.trackingLink.update({
      where: { id: trackingLink.id },
      data: {
        conversionCount: { increment: 1 },
        totalRevenue: { increment: saleAmount },
      },
    })

    return NextResponse.json({
      success: true,
      commission: {
        id: commission.id,
        amount: commission.amount.toString(),
        status: commission.status,
      },
    })
  } catch (error: any) {
    console.error('Postback error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

// Also support GET for simple postback URLs
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const click_id = searchParams.get('click_id')
    const order_id = searchParams.get('order_id')
    const transaction_id = searchParams.get('transaction_id')
    const amount = searchParams.get('amount')
    const status = searchParams.get('status')

    if (!click_id) {
      return NextResponse.json({ error: 'click_id is required' }, { status: 400 })
    }

    // Find the click record
    const click = await prisma.linkClick.findUnique({
      where: { id: click_id },
      include: {
        trackingLink: {
          include: {
            advertiser: true,
            publisher: true,
          },
        },
      },
    })

    if (!click) {
      return NextResponse.json({ error: 'Click not found' }, { status: 404 })
    }

    const trackingLink = click.trackingLink

    // Mark click as converted
    const saleAmountNum = amount ? parseFloat(amount) : 0
    const saleAmount = new Prisma.Decimal(saleAmountNum)
    
    await prisma.linkClick.update({
      where: { id: click_id },
      data: {
        converted: true,
        convertedAt: new Date(),
        conversionValue: amount ? new Prisma.Decimal(amount) : null,
      },
    })

    // Calculate commission amount
    let commissionAmount = new Prisma.Decimal(0)

    if (trackingLink.advertiser.commissionType === 'percentage') {
      const rate = parseFloat(trackingLink.advertiser.commissionRate.replace('%', ''))
      commissionAmount = new Prisma.Decimal((saleAmountNum * rate) / 100)
    } else if (trackingLink.advertiser.commissionType === 'fixed') {
      commissionAmount = new Prisma.Decimal(trackingLink.advertiser.commissionRate)
    } else if (trackingLink.advertiser.commissionType === 'cpa') {
      commissionAmount = new Prisma.Decimal(trackingLink.advertiser.commissionRate)
    }

    // Create commission record
    const commissionStatus = status === 'approved' || status === 'completed' ? 'APPROVED' : 'PENDING'

    const commission = await prisma.commission.create({
      data: {
        publisherId: trackingLink.publisherId,
        advertiserId: trackingLink.advertiserId,
        trackingLinkId: trackingLink.id,
        amount: commissionAmount,
        status: commissionStatus,
        transactionId: transaction_id || null,
        orderId: order_id || null,
        ...(commissionStatus === 'APPROVED' && { approvedAt: new Date() }),
      },
    })

    // Update tracking link stats
    await prisma.trackingLink.update({
      where: { id: trackingLink.id },
      data: {
        conversionCount: { increment: 1 },
        totalRevenue: { increment: saleAmount },
      },
    })

    return NextResponse.json({
      success: true,
      commission: {
        id: commission.id,
        amount: commission.amount.toString(),
        status: commission.status,
      },
    })
  } catch (error: any) {
    console.error('Postback error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
