import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

// Helper function to connect to database
export async function connectToDatabase() {
  try {
    await prisma.$connect()
    console.log('Successfully connected to PostgreSQL database')
    return prisma
  } catch (error) {
    console.error('Failed to connect to PostgreSQL database:', error)
    throw error
  }
}

// Helper function to disconnect from database
export async function disconnectFromDatabase() {
  try {
    await prisma.$disconnect()
    console.log('Disconnected from PostgreSQL database')
  } catch (error) {
    console.error('Error disconnecting from database:', error)
    throw error
  }
} 