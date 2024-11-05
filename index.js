import 'dotenv/config.js'
import express from 'express'
import { PostgresHelper } from './src/db/postgres/helper.js'

const app = express()

app.get('/', async (req, res) => {
    const results = await PostgresHelper('SELECT * FROM users')

    res.send(JSON.stringify(results.rows))
})

app.listen('3000', () => {
    console.log('Server is running http://localhost:3000')
})
