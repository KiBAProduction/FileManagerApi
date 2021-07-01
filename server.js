const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const PORT = 3000;
const SECRET_KEY = 'keytest';

// Init express
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// User list test
const users = [
    { id: 1, username: 'antoine', password: '123123' }
];

app.get('/users', (req, res) => {
    return res.status(200).json({ users });
});

app.get('*', (req, res) => {
    return res.status(404).json({ message: 'Not Found' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});