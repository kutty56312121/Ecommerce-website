import mongoose from 'mongoose'

export async function connectToDatabase() {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ecommerce'
  if (!mongoUri) {
    throw new Error('MONGODB_URI is not set')
  }
  mongoose.set('strictQuery', true)
  await mongoose.connect(mongoUri)
  console.log('Connected to MongoDB')
}