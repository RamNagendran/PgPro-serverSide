import {NextFunction, Request, Response} from 'express';
import * as jwt from 'jsonwebtoken';

export function generateToken(data: any) {
    return jwt.sign(data, process.env.JWT_SECRET!, {expiresIn: '24h'});
}

export function verifyToken(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET!);
}

export function authorize(req: Request, res: Response, next: NextFunction) {
    
    const authHeader = req.headers.authorization || req.body.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            error: 'No authorization header'
        });
    }

    var parts = authHeader!.split(" ");

    if (parts.length != 2 || parts[ 0 ] != "Bearer") {
        return res.status(401).json({error: 'Invalid token'});
    }
    const token = parts[ 1 ];
    try {
        const decoded = verifyToken(token);
        (req as any).user = decoded;
        next();
    } catch (e) {
        res.status(401).json({error: 'Invalid token'});
    }
}