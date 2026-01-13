import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from './prisma'

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export function generateToken(userId: string, role: string): string {
  return jwt.sign(
    { userId, role },
    process.env.JWT_SECRET || 'fallback-secret',
    { expiresIn: '7d' }
  )
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
    include: {
      publisherProfile: true,
    },
  })
}

export async function createUser(data: {
  email: string
  password: string
  firstName?: string
  lastName?: string
  role: 'PUBLISHER' | 'ADMIN'
  companyName?: string
}) {
  const hashedPassword = await hashPassword(data.password)
  
  const user = await prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role,
      companyName: data.companyName,
      ...(data.role === 'PUBLISHER' && {
        publisherProfile: {
          create: {},
        },
      }),
    },
    include: {
      publisherProfile: true,
    },
  })

  return user
}



