import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import router from './router'
import { connectDB } from './config/db'
import { corsConfig } from './config/cors'
import swaggerUI from 'swagger-ui-express'
import swaggerDocumentation from '../swagger.json'

connectDB()

const app = express()

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocumentation))

// Cors
app.use(cors(corsConfig))

// Read data from form
app.use(express.json())

app.use('/', router)

export default app;