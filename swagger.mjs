import swaggerAutogen from 'swagger-autogen'

const outputFile = './swagger.json'
const endPointsFiles = ['./src/server.ts']

const doc = {
    info: {
        title: 'Linkbaum API',
        description: 'This API allows to manage users, user profiles and links',
    },
    host: process.env.FRONTEND_URL,
    schemes: ['http', 'https']
}

swaggerAutogen()(outputFile, endPointsFiles, doc)