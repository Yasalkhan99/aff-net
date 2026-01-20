import { NextRequest, NextResponse } from 'next/server'
import { createTrackingLink } from '@/lib/tracking'
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

export async function POST(request: NextRequest) {
  try {
    const userId = await getUserIdFromToken(request)
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { advertiserId, isDeepLink, landingPage } = await request.json()

    if (!advertiserId) {
      return NextResponse.json({ error: 'Advertiser ID is required' }, { status: 400 })
    }

    const trackingLink = await createTrackingLink({
      publisherId: userId,
      advertiserId,
      isDeepLink: isDeepLink || false,
      landingPage: landingPage || null,
    })

    return NextResponse.json({
      success: true,
      trackingLink: trackingLink.trackingLink,
      trackingCode: trackingLink.trackingCode,
      id: trackingLink.id,
    })
  } catch (error: any) {
    console.error('Error creating tracking link:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create tracking link' },
      { status: 500 }
    )
  }
}




