import { Router } from 'express'
import { body } from 'express-validator'
import { createAccount } from './handlers'

const router = Router()

// Autentication and sign in
router.post('/auth/register', 
    body('handle')
        .notEmpty()
        .withMessage('Handle can not be empty.'),
    body('name')
        .notEmpty()
        .withMessage('Name can not be empty.'),
    body('email')
        .isEmail()
        .withMessage('Invalid email.'),
    body('password')
        .isLength({min: 8})
        .withMessage('Password must be at least 8 characters long.'),

    createAccount)


export default router