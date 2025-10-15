const mongoose = require('mongoose');

let isConnected = false;

async function connectDB(uri, { retries = 3, delayMs = 1500 } = {}) {
  if (!uri) throw new Error('Missing MONGODB_URI. Set it in your .env file.');

  mongoose.set('strictQuery', true);

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await mongoose.connect(uri);
      isConnected = true;
      console.log(`MongoDB connected (attempt ${attempt}) host:`, mongoose.connection.host);
      return mongoose.connection;
    } catch (err) {
      console.error(`MongoDB connection failed (attempt ${attempt}/${retries}):`, err.message);
      if (attempt === retries) throw err;
      await new Promise(r => setTimeout(r, delayMs));
    }
  }
}

function getConnection() {
  return mongoose.connection;
}

module.exports = { connectDB, getConnection };
