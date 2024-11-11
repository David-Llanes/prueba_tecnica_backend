import { NextFunction, Request, Response } from 'express'

// TODO: Implementar FUNCIONALIDAD DE LOGIN

type ErrorHandlerKey =
  | 'JsonWebTokenError'
  | 'TokenExpiredError'
  | 'defaultError'

const ERROR_HANDLERS: Record<ErrorHandlerKey, (res: Response) => void> = {
  JsonWebTokenError: (res: Response) =>
    res.status(401).json({ error: 'Token inválido.' }),
  TokenExpiredError: (res: Response) =>
    res.status(401).json({ error: 'Token expirado.' }),
  defaultError: (res: Response) =>
    res.status(500).send('Error interno del servidor.'),
}

export function notFound(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  res.status(404).send('La ruta a la que intentas acceder no existe.')
}

export function serverError(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.error('Error capturado:', error)

  const errorName = (error instanceof Error && error.name) as ErrorHandlerKey

  const handler = ERROR_HANDLERS[errorName] || ERROR_HANDLERS.defaultError
  handler(res)
}
