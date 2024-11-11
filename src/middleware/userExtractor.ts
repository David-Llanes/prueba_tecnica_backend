import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

// Extender la interfaz Request de Express para agregar la propiedad `user`
interface CustomRequest extends Request {
  user?: string | JwtPayload
}

export default function (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.headers['authorization']

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' })
  }

  try {
    const tokenWithoutBearer = token.startsWith('Bearer ')
      ? token.slice(7)
      : token

    // TODO: Sacar el secret desde CONFIG
    const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET!)
    req.user = decoded

    next()
  } catch (err) {
    // return res.status(401).json({ message: 'Token inválido o expirado' })
    next(err)
  }
}

// Este middleware se encargara de validar que el usuario esta autenticado y que el token es valido.
// Si el token no es valido o no esta presente jwt.verify lanzara un error y llegara al error handler, el cual regresara un 401.
// Si el token es valido, agregara el id del usuario al request y llamara al siguiente middleware.
