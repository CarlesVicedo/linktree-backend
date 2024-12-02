import { Router } from 'express'
import { body } from 'express-validator'
import { createAccount, getUser, login } from './handlers'
import { handleInputErrors } from './middleware/validation'
import { authenticate } from './middleware/auth'

const router = Router()

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
    handleInputErrors,
    createAccount
)

router.post('/auth/login', 
    body('email')
        .isEmail()
        .withMessage('Invalid email.'),
    body('password')
        .notEmpty()
        .withMessage('Password is mandatory.'),
    handleInputErrors,
    login
)

router.get('/user',authenticate, getUser)


export default router