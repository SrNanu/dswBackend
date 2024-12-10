import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'


const validateToken = (req: Request,res:Response, next:NextFunction) => {
console.log('Validating token...')
const headerToken = req.headers['authorization']
console.log(headerToken)

if(headerToken != undefined && headerToken.startsWith('Bearer ')){
    // Tiene token 
    try {
    const bearerToken =headerToken.slice(7);
    const secretKey = process.env.SECRET_KEY;
    if (secretKey) {
        jwt.verify(bearerToken, secretKey || "Contraseña123");
        next();
    } else {
        res.status(500).json({ message: 'Internal Server Error' });
    }
    } catch (error: any) {
    res.status(401).json({ message: 'Invalid token' });
    }
  next()
}else{
    res.status(401).json({message: 'Acceso Denegado'})
}

}
export default validateToken