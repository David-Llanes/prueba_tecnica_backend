import { ZodError } from 'zod'

export const formatErrors = (
  error: ZodError<{
    name: string
    lastname: string
    email: string
    numbers: [string, ...string[]]
    addresses: [string, ...string[]]
  }>
) => {
  return error.errors.reduce((acc, err) => {
    const field = err.path[0]
    acc[field] = err.message
    return acc
  }, {})
}
