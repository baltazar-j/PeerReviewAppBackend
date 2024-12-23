const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config( { path: '.env' } );
const cookieParser = require('cookie-parser');


const app = express();
const PORT = process.env.PORT || 5050; 

const corsOptions = {
  origin: ['https://client-wheat-delta.vercel.app', 'http://localhost:5050'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(cors(corsOptions)); 
app.use(express.json()); 
app.use(cookieParser());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI) 
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((error) => console.error('MongoDB connection error:', error));

//Routes
const postRoutes = require('./routes/postRoutes.js');
const userRoutes = require('./routes/userRoutes.js');


//const userRoutes = require('./routes/userRoutes.js'); 
app.use('/api/posts', postRoutes);
app.use('/api', userRoutes);
app.use('/api/users', userRoutes);

// Default Route
app.get('/', (req, res) => res.send('Server is running!'));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
