import express from 'express'
import router from './router'

const app = express()

// Read data from form
app.use(express.json())

app.use('/', router)

export default app;