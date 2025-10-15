const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const { connectDB } = require('./config/db');

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;

// Import routes
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');

app.use('/admin', adminRoutes);
app.use('/users', userRoutes);

async function start() {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb+srv://ankittsingh763_db_user:xH0kY4BNnLkfetV1@cluster0.5lj54ou.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
    await connectDB(uri);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (err) {
    console.error('Failed to start server due to DB connection error:', err.message);
    process.exit(1);
  }
}

start();