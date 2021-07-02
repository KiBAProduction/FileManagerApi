const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { scandir } = require('./modules/ls');

const PORT = 3000;
const SECRET_KEY = 'keytest';

// Init express
const config = require('./config.json');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const users = config.users;
let refreshTokens = [];

function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401);

    jwt.verify(token, config.ACCESS_SECRET_KEY, (error, user) => {
        console.log(error);
        if (error) return res.status(403);
        req.user = user;
        next();
    });
}

function generateAccessToken(user) {
    return jwt.sign(user, config.ACCESS_SECRET_KEY, { expiresIn: '15s' });
}

app.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token);
    res.sendStatus(204);
});

app.post('/login', (req, res) => {
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({ message: 'Enter valid username and password' })
    }

    const user = users.find(u => u.username === req.body.username && u.password === req.body.password);

    if (!user) {
        return res.status(400).json({ message: 'Wrong username or password' });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign(user, config.REFRESH_SECRECT_KEY);
    refreshTokens.push(refreshToken);

    return res.json({ access_token: accessToken, refreshToken: refreshToken });
});

app.post('/token', (req, res) => {
    const refreshToken = req.body.token;
    if (refreshToken == null) return res.sendStatus(401);
    if (!refreshToken.includes(refreshToken)) return res.sendStatus(403);
    jwt.verify(refreshToken, config.REFRESH_SECRECT_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        const accessToken = generateAccessToken({ username: user.username });
        res.json({ accessToken: accessToken });
    });
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

app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`);
});