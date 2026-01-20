export type UserRole = 'PUBLISHER' | 'ADMIN'

export type CommissionStatus = 'PENDING' | 'APPROVED' | 'DECLINED' | 'PAID'

export type TrackingLinkStatus = 'ACTIVE' | 'INACTIVE' | 'PAUSED'

export interface User {
  id: string
  email: string
  firstName?: string
  lastName?: string
  role: UserRole
  companyName?: string
}

export interface Advertiser {
  id: string
  name: string
  logo?: string
  website: string
  baseUrl: string
  description?: string
  about?: string
  commissionRate: string
  commissionType: string
  region: string
  averagePaymentCycle?: number
  status: string
  categories: string[]
  advertiserType?: string
  allowedMethods: string[]
  restrictedMethods: string[]
}

export interface TrackingLink {
  id: string
  trackingCode: string
  trackingLink: string
  isDeepLink: boolean
  landingPage?: string
  status: TrackingLinkStatus
  clickCount: number
  conversionCount: number
  advertiser: Advertiser
  createdAt: Date
}

export interface Commission {
  id: string
  amount: number
  status: CommissionStatus
  advertiser: Advertiser
  createdAt: Date
  approvedAt?: Date
  paidAt?: Date
}




