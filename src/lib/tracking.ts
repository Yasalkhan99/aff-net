import { prisma } from './prisma'
import { nanoid } from 'nanoid'

export async function getTrackingLink(code: string) {
  return prisma.trackingLink.findUnique({
    where: { trackingCode: code },
    include: {
      advertiser: true,
      publisher: true,
    },
  })
}

export async function recordClick(data: {
  trackingLinkId: string
  ipAddress?: string
  userAgent?: string
  referrer?: string
}): Promise<string> {
  // Save click to database and return click ID
  const click = await prisma.linkClick.create({
    data: {
      trackingLinkId: data.trackingLinkId,
      ipAddress: data.ipAddress,
      userAgent: data.userAgent,
      referrer: data.referrer,
    },
  })

  // Update click count
  await prisma.trackingLink.update({
    where: { id: data.trackingLinkId },
    data: {
      clickCount: { increment: 1 },
    },
  })

  return click.id
}

export function generateUniqueTrackingCode(): string {
  // Generate a short, URL-safe unique code
  return nanoid(10)
}

export async function createTrackingLink(data: {
  publisherId: string
  advertiserId: string
  isDeepLink: boolean
  landingPage?: string | null
}) {
  // Generate unique tracking code
  let trackingCode = generateUniqueTrackingCode()
  
  // Ensure uniqueness (retry if exists)
  let exists = await prisma.trackingLink.findUnique({
    where: { trackingCode },
  })
  
  let attempts = 0
  while (exists && attempts < 5) {
    trackingCode = generateUniqueTrackingCode()
    exists = await prisma.trackingLink.findUnique({
      where: { trackingCode },
    })
    attempts++
  }

  if (exists) {
    throw new Error('Failed to generate unique tracking code')
  }

  // Create tracking link
  const baseUrl = process.env.TRACKING_DOMAIN || 'http://localhost:3000/go'
  const trackingLink = `${baseUrl}/short/${trackingCode}`

  // Save to database
  return prisma.trackingLink.create({
    data: {
      publisherId: data.publisherId,
      advertiserId: data.advertiserId,
      trackingCode,
      trackingLink,
      isDeepLink: data.isDeepLink,
      landingPage: data.landingPage || null,
      status: 'ACTIVE',
    },
    include: {
      advertiser: true,
    },
  })
}



