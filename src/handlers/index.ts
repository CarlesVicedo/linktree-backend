import {Request, Response} from 'express'
import User from "../models/User"
import { checkPassword, hashPassword } from '../utils/auth'
import slug from 'slug'
import formidable from 'formidable'
import { v4 as uuid } from 'uuid'
import { generateJWT } from '../utils/jwt'
import cloudinary from '../config/cloudinary'

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

export const getUser = async (req: Request, res: Response) => {
    res.json(req.user)
}

// TODO: Delete this any
export const updateProfile = async (req: Request, res: Response): Promise<any> => {
    try {
        const {description} = req.body

        const handle = slug(req.body.handle, '')
        const handleExists = await User.findOne({handle})
        if (handleExists && handleExists.email !== req.user.email) {
            const error = new Error('Handle already exist')
           res.status(409).json({error: error.message})
           return
        }

        req.user.description = description
        req.user.handle = handle

        await req.user.save()
        res.send('Successfully updated user')

    } catch (e) {
        const error = new Error('There was an error handling your request.')
        return res.status(500).json({error: error.message})
    }
}

// TODO: Delete this any
export const uploadImage = async (req: Request, res: Response): Promise<any> => {
    try {
        const form = formidable({multiples: false})
        form.parse(req, (error, fields, files) => {
            cloudinary.uploader.upload(files.file[0].filepath, {public_id: uuid()}, async (error, result) => {
                if(error) {
                    const error = new Error('There was an error uploading your image.')
                    return res.status(500).json({error: error.message})
                }
    
                if(result) {
                    req.user.image = result.secure_url
                    await req.user.save()
                    res.json({image: result.secure_url})
                }
            })
        })
    } catch(e) {
        const error = new Error('There was an error handling your request.')
        return res.status(500).json({error: error.message})
    }
}