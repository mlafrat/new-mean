const express = require('express');
const mongoose = require('mongoose');
const loginRouter = require('./routes/login');
const cors = require('cors'); // Import the 'cors' middleware
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware for handling CORS
app.use(cors()); // Enable CORS for all routes

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection setup
mongoose
    .connect(process.env.DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log(`Database connected successfully`))
    .catch((err) => console.error('Database connection error:', err));

// Redirect root URL to the login route
app.get('/', (req, res) => {
    res.redirect('/login');
});

// Mounting the login route
app.use('/login', loginRouter);

app.use((req, res, next) => {
    res.status(404).send("Sorry, the requested route doesn't exist.");
});

// Starting the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}.`);
});
