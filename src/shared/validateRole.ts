import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const validateRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const headerToken = req.headers['authorization'];
    console.log('Validating token and role...');

    if (headerToken != undefined && headerToken.startsWith('Bearer ')) {
      // Tiene token
      try {
        const bearerToken = headerToken.slice(7);
        const secretKey = process.env.SECRET_KEY;
        
        
          // Verificar el token
          const decoded: any = jwt.verify(bearerToken, 'Contraseña123');
          // Validar si el rol coincide con el rol esperado
          console.log('Role:', decoded.role);
          if (decoded.role && decoded.role === role) {
            next(); // El rol coincide, continuar
          } else {
            return res.status(403).json({ message: 'Acceso denegado: Rol insuficiente' });
          }
        
      } catch (error: any) {

        return res.status(401).json({ message: 'Invalid token' });
        
      }
    } else {

      return res.status(403).json({ message: 'Acceso Denegado' });
    }
  };
};

export default validateRole;
