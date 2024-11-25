/* eslint-disable no-undef */
import 'dotenv/config.js'
import express from 'express'
import { CreateUserController } from './src/controllers/create-user.js'
import { PostgresHelper } from './src/db/postgres/helper.js'

const app = express()

app.use(express.json())

app.get('/', async (req, res) => {
    const results = await PostgresHelper.query('SELECT * FROM users')

    res.send(JSON.stringify(results.rows))
})

app.post('/api/users', async (request, response) => {
    const createUserController = new CreateUserController()

    const { statusCode, body } = await createUserController.execute(request)

    response.status(statusCode).send(body)
})

app.patch('/api/users/:userId', async (request, response) => {
    const updateUserController = new UpdateUserController()

    const { statusCode, body } = await updateUserController.execute(request)

    response.status(statusCode).send(body)
})

app.get('/api/users/:userId', async (request, response) => {
    const getByIdIdController = new GetByIdIdController()

    const { statusCode, body } = await getByIdIdController.execute(request)

    response.status(statusCode).send(body)
})

app.listen(process.env.PORT, () => {
    console.log('Server is running')
})
