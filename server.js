const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config( { path: './config/.env' } );
const cookieParser = require('cookie-parser');


const app = express();
const PORT = process.env.PORT || 5050; 

// Middleware
app.use(cors()); 
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

//const userRoutes = require('./routes/userRoutes.js'); ROUTE FOR 

app.use('/api/posts', postRoutes);
app.use('/api', userRoutes); //POST user info to mongo

// Default Route
app.get('/', (req, res) => res.send('Server is running!'));

app.get('/api/resource', (req, res) => {
  const { key1, key2 } = req.query;
  // console.log(Key1: ${key1}, Key2: ${key2});
  res.send({ message: 'Data received!', key1, key2 });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
