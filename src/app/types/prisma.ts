import { Prisma } from '@prisma/client'

// User types
export type User = Prisma.UserGetPayload<{}>
export type UserCreateInput = Prisma.UserCreateInput
export type UserUpdateInput = Prisma.UserUpdateInput

// Category types
export type Category = Prisma.CategoryGetPayload<{}>
export type CategoryCreateInput = Prisma.CategoryCreateInput
export type CategoryUpdateInput = Prisma.CategoryUpdateInput
export type CategoryWithProducts = Prisma.CategoryGetPayload<{
  include: { products: true }
}>

// Product types
export type Product = Prisma.ProductGetPayload<{}>
export type ProductCreateInput = Prisma.ProductCreateInput
export type ProductUpdateInput = Prisma.ProductUpdateInput
export type ProductWithCategory = Prisma.ProductGetPayload<{
  include: { category: true }
}>
export type ProductWithCategoryName = Prisma.ProductGetPayload<{
  include: { category: { select: { name: true } } }
}>

// Enums
export { Role } from '@prisma/client'

// API Response types
export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    total: number
    page: number
    pages: number
    limit: number
  }
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
} 