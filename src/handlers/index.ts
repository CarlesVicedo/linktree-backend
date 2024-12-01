import {Request, Response} from 'express'
import User from "../models/User"
import { checkPassword, hashPassword } from '../utils/auth'
import slug from 'slug'
import { generateJWT } from '../utils/jwt'

export const createAccount = async (req: Request, res: Response) => {

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

export const login = async (req: Request, res: Response) => {

    const {email, password} = req.body
    
    // Check if user exist
    const user = await User.findOne({email})
    if (!user) {
        const error = new Error('This user does not exist.')
       res.status(404).json({error: error.message})
       return
    }

    // Check password
    const isPasswordCorrect = await checkPassword(password, user.password)
    if (!isPasswordCorrect) {
        const error = new Error('Wrong password')
       res.status(401).json({error: error.message})
       return
    }

    const token = generateJWT({id: user._id})

    res.send(token)
}