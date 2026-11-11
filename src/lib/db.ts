import 'server-only'
import {Pool} from 'pg'

const globalForDb = globalThis as typeof globalThis & {postgresPool?: Pool}

export function getPool() {
  if (globalForDb.postgresPool) return globalForDb.postgresPool

  const connectionString = process.env.DATABASE_URL
  if (!connectionString) throw new Error('DATABASE_URL is required')

  const pool = new Pool({
    connectionString,
    connectionTimeoutMillis: 5000,
    query_timeout: 5000,
  })

  pool.on('error', (error) => {
    console.error('Unexpected PostgreSQL connection error', error.message)
  })

  globalForDb.postgresPool = pool
  return pool
}
