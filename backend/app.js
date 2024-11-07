const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const connectDatabase = require('./config/connectDatabase');
dotenv.config({path: path.join(__dirname, 'config', 'config.env')})

const userRoute = require('./routes/userRoute');
const protectedRoute = require('./routes/protectedRoute')

connectDatabase();

// Middleware to parse incoming JSON data and handle CORS
app.use(express.json());

app.use('/api/v1/',userRoute);
app.use('/api/v1/',protectedRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server listening to Port ${process.env.PORT} in ${process.env.NODE_ENV}`)
})