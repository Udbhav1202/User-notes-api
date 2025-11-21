const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const noteRoutes = require('./routes/noteRoutes');


dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/notes', noteRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));