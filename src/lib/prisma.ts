import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient({
  log: ['query'],
}) // automatically reads settings from .env
