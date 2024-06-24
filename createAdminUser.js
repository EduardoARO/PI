// createAdminUser.js
const bcrypt = require('bcrypt');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const mongoUri = process.env.MONGODB_URI;

async function createAdminUser() {
  const client = new MongoClient(mongoUri);
  try {
    await client.connect();
    const db = client.db('BancoPI');
    const hashedPassword = await bcrypt.hash('adminpassword', 10);
    await db.collection('user_tb').insertOne({
      name: 'Admin',
      email: 'admin@email.com',
      password: hashedPassword,
      createdAt: new Date(),
    });
    console.log('Admin user created');
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await client.close();
  }
}

createAdminUser();