import {Router} from 'express'
import User from './models/User'

const router = Router()

// Autentication and sign in
router.post('/auth/register', async (req, res) => {
    const user = new User(req.body)

    await user.save()

    res.send('Register was created')
})


export default router