import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const validateRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const headerToken = req.headers['authorization'];
    console.log('Validando token y rol...');
    next();

    if (headerToken != undefined && headerToken.startsWith('Bearer ')) {
      // Tiene token
      try {
        const bearerToken = headerToken.slice(7); // Elimina 'Bearer ' del encabezado
        const secretKey = process.env.SECRET_KEY;
        
        // Verificar el token (decodificarlo)
        const decoded: any = jwt.verify(bearerToken, secretKey || 'Contraseña123'); // Usar clave secreta
        console.log('Rol del usuario:', decoded.role);

        // Validar si el rol del usuario está dentro de los roles permitidos
        if (roles.includes(decoded.role)) {
          next(); // El rol está permitido, continuar
        } else {
          // Si el rol no está permitido
          return res.status(403).json({ message: 'Acceso denegado: Rol insuficiente' });
        }
        
      } catch (error: any) {
        // Si hay un error al verificar el token (ej. token inválido)
        return res.status(401).json({ message: 'Token inválido' });
      }
    } else {
      // Si no hay token en la solicitud
      return res.status(403).json({ message: 'Acceso denegado: Token faltante' });
    }
  };
};

export default validateRole;
