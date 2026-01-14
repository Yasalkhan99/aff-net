import { NextRequest, NextResponse } from 'next/server'
import { getTrackingLink, recordClick } from '@/lib/tracking'

export async function GET(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    const code = params.code

    if (!code) {
      return NextResponse.json({ error: 'Invalid tracking code' }, { status: 400 })
    }

    // Get tracking link from database
    const trackingLink = await getTrackingLink(code)

    if (!trackingLink || trackingLink.status !== 'ACTIVE') {
      return NextResponse.json(
        { error: 'Tracking link not found or inactive' },
        { status: 404 }
      )
    }

    // Record click and get click ID
    const forwarded = request.headers.get('x-forwarded-for')
    const ipAddress = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || ''

    const clickId = await recordClick({
      trackingLinkId: trackingLink.id,
      ipAddress: ipAddress || undefined,
      userAgent: request.headers.get('user-agent') || undefined,
      referrer: request.headers.get('referer') || undefined,
    })

    // Determine destination URL
    let destinationUrl = trackingLink.advertiser.baseUrl

    if (trackingLink.isDeepLink && trackingLink.landingPage) {
      destinationUrl = trackingLink.landingPage
    }

    // Add tracking parameters including click ID
    const url = new URL(destinationUrl)
    url.searchParams.set('ref', trackingLink.publisherId)
    url.searchParams.set('track', trackingLink.trackingCode)
    url.searchParams.set('click_id', clickId)
    url.searchParams.set('source', 'affnet')

    // Redirect
    return NextResponse.redirect(url.toString(), { status: 302 })
  } catch (error: any) {
    console.error('Error processing tracking link:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}



