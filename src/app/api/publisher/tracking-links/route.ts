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
    const advertiserId = searchParams.get('advertiserId')

    const where: any = { publisherId: userId }
    if (advertiserId) {
      where.advertiserId = advertiserId
    }

    const links = await prisma.trackingLink.findMany({
      where,
      include: {
        advertiser: {
          select: {
            name: true,
            logo: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ links })
  } catch (error: any) {
    console.error('Error fetching tracking links:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}



