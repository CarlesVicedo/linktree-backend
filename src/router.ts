import { Router } from 'express'
import { createAccount } from './handlers'

const router = Router()

// Autentication and sign in
router.post('/auth/register', createAccount)


export default router