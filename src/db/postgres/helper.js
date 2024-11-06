import pg from 'pg'

const { Pool } = pg

export const pool = new Pool({
    // eslint-disable-next-line no-undef
    user: process.env.POSTGRES_USER,
    // eslint-disable-next-line no-undef
    password: process.env.POSTGRES_PASSWORD,
    // eslint-disable-next-line no-undef
    port: process.env.POSTGRES_PORT,
    // eslint-disable-next-line no-undef
    database: process.env.POSTGRES_DB,
    // eslint-disable-next-line no-undef
    host: process.env.POSTGRES_HOST,
})

export const PostgresHelper = {
    query: async (query, params) => {
        const client = await pool.connect()
        const results = await client.query(query, params)
        await client.release()
        return results.rows
    },
}
