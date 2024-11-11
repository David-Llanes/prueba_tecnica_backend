import 'dotenv/config'

export const CONFIG = {
  PORT: process.env.PORT || 4000,
  BASE_URL:
    process.env.BASE_URL || `http://localhost:${process.env.PORT || 4000}`,
  DATABASE_URL: process.env.DATABASE_URL!,
}
