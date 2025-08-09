import dotenv from 'dotenv'
import { createServer } from 'http'
import app from './app.js'
import { connectToDatabase } from './config/db.js'

dotenv.config()

const PORT = process.env.PORT || 5000

async function start() {
  try {
    await connectToDatabase()
    const server = createServer(app)
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

start()