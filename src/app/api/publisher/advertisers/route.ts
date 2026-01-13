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

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') || 'joined'
    const search = searchParams.get('search') || ''
    const country = searchParams.get('country') || ''
    const advertiserType = searchParams.get('advertiserType') || ''
    const category = searchParams.get('category') || ''
    const promotionalMethod = searchParams.get('promotionalMethod') || ''

    // Get advertisers that the publisher has joined
    // In a real app, you'd have a join table for publisher-advertiser relationships
    const advertisers = await prisma.advertiser.findMany({
      where: {
        status: 'ACTIVE',
        ...(search && {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        }),
        ...(country && { region: country }),
        ...(advertiserType && advertiserType !== 'all' && { advertiserType }),
        ...(category && {
          categories: {
            has: category,
          },
        }),
        ...(promotionalMethod && {
          allowedMethods: {
            has: promotionalMethod,
          },
        }),
      },
      take: 100,
    })

    // Map to the format expected by frontend
    const formattedAdvertisers = advertisers.map((adv: any) => ({
      id: adv.id,
      name: adv.name,
      logo: adv.logo || '',
      website: adv.website,
      commission: adv.commissionRate,
      commissionType: adv.commissionType,
      region: adv.region,
      averagePaymentCycle: adv.averagePaymentCycle,
      status: status as 'joined' | 'hold' | 'rejected',
      category: adv.categories[0],
      advertiserType: adv.advertiserType,
      promotionalMethods: adv.allowedMethods,
    }))

    return NextResponse.json({
      advertisers: formattedAdvertisers,
      total: formattedAdvertisers.length,
    })
  } catch (error: any) {
    console.error('Error fetching advertisers:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = await getUserIdFromToken(request)
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      name,
      website,
      baseUrl,
      logo,
      description,
      about,
      commissionRate,
      commissionType,
      region,
      averagePaymentCycle,
      advertiserType,
      categories,
      allowedMethods,
      restrictedMethods,
    } = body

    // Validate required fields
    if (!name || !website || !baseUrl || !commissionRate || !region) {
      return NextResponse.json(
        { error: 'Missing required fields: name, website, baseUrl, commissionRate, region' },
        { status: 400 }
      )
    }

    // Create advertiser
    const advertiser = await prisma.advertiser.create({
      data: {
        name,
        website,
        baseUrl: baseUrl || website,
        logo: logo || null,
        description: description || null,
        about: about || null,
        commissionRate,
        commissionType: commissionType || 'percentage',
        region,
        averagePaymentCycle: averagePaymentCycle || null,
        advertiserType: advertiserType || null,
        categories: categories || [],
        allowedMethods: allowedMethods || [],
        restrictedMethods: restrictedMethods || [],
        status: 'ACTIVE',
      },
    })

    return NextResponse.json({
      success: true,
      advertiser,
    })
  } catch (error: any) {
    console.error('Error creating advertiser:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

