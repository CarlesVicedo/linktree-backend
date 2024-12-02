import type { Request, Response, NextFunction } from "express"
import jwt from 'jsonwebtoken'
import User, { IUser } from "../models/User"

declare global {
    namespace Express {
        interface Request {
            user?: IUser
        }
    }
}


export const authenticate = async (req: Request, res:Response, next: NextFunction) => {
    const bearer = req.headers.authorization
  
    if(!bearer) {
        const err = new Error('Not authorized')
        res.status(401).json({error: err.message})
        return
    }

    const [ , token] = bearer.split(' ')

    if(!token) {
        const err = new Error('Not authorized')
        res.status(401).json({error: err.message})
        return
    }

    try {
        const result = jwt.verify(token, process.env.JWT_SECRET)
        if(typeof result === 'object' && result.id){
            const user = await User.findById(result.id).select('-password')
            
            if(!user) {
                const err = new Error('User not found')
                res.status(404).json({error: err.message})
                return
            }
            req.user = user
            next()
        }

    } catch(error) {
        res.status(500).json({error: 'Invalid token'})
    }
}