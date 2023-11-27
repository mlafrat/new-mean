const express = require('express');
const mongoose = require('mongoose'); // Import mongoose for database connection
const loginRouter = require('./routes/login'); // Import your login route
require('dotenv').config()
const app = express();
const port = process.env.PORT || 3001;

// Middleware for handling CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Body parsing middleware
app.use(express.json());

// Database connection setup
mongoose
    .connect(process.env.DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log(`Database connected successfully`))
    .catch((err) => console.error('Database connection error:', err));

// Mounting the login route
app.use('/login', loginRouter); // Assuming your login route is under '/auth/login'

// Default route
app.use((req, res, next) => {
    res.send('Welcome to Express');
});

// Starting the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
