import {Request, Response} from 'express'
import { validationResult } from 'express-validator'
import User from "../models/User"
import { hashPassword } from '../utils/auth'
import slug from 'slug'

export const createAccount = async (req: Request, res: Response) => {

    // Handle errors
    let errors = validationResult(req)
    if(!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()})
        return
    }

    const {email, password} = req.body
    
    const userExists = await User.findOne({email})
    if (userExists) {
        const error = new Error('An account with this email already exist')
       res.status(409).json({error: error.message})
       return
    }

    const handle = slug(req.body.handle, '')
    const handleExists = await User.findOne({handle})
    if (handleExists) {
        const error = new Error('Handle already exist')
       res.status(409).json({error: error.message})
       return
    }

    const user = new User(req.body)
    user.password = await hashPassword(password)
    user.handle = handle

    await user.save()

    res.status(201).send('Register was created')
}