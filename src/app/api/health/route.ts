import {getPool} from '@/lib/db'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    await getPool().query('SELECT 1')
    return Response.json({status: 'ok'})
  } catch (error) {
    console.error('Database health check failed', error)
    return Response.json({status: 'error'}, {status: 503})
  }
}
