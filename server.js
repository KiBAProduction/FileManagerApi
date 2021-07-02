const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { scandir } = require('./modules/ls');

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
app.get('/ls', async (req, res) => {
    const data = await scandir('/');
    console.log('data', data);
    return res.status(200).json({
        data: data
    });
});
app.get('*', (req, res) => {
    return res.status(404).json({ message: 'Not Found' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});