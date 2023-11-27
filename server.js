const express = require('express');
const mongoose = require('mongoose');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const path = require('path'); // Import the 'path' module
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware for handling CORS
app.use(cors());
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

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/login', loginRouter);
app.use('/register', registerRouter);

// All other routes should serve the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

// Starting the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}.`);
});
