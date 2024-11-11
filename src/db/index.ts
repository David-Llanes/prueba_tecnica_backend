import { drizzle } from 'drizzle-orm/node-postgres'
import { CONFIG } from '../config'

export const db = drizzle(CONFIG.DATABASE_URL)
