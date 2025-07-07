const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const userModel = require('../models/user.models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.get('/test', (req, res) => {
    res.send('Test route');
});

router.get('/register', (req, res) => {
    res.render('register', { errors: [], username: '', email: '' });
});

router.post(
    '/register',
    [
        body('email').trim().isEmail().withMessage('Invalid email').isLength({ min: 5 }),
        body('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
        body('password').trim().isLength({ min: 5 }).withMessage('Password must be at least 5 characters'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        const { email, username, password } = req.body;

        if (!errors.isEmpty()) {
            return res.status(400).render('register', {
                errors: errors.array(),
                email,
                username,
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        await userModel.create({
            email,
            username,
            password: hashPassword,
        });

        res.redirect('/user/login');
    }
);

router.get('/login', (req, res) => {
    res.render('login', { errors: [], username: '' });
});

router.post(
    '/login',
    [
        body('username').trim().isLength({ min: 3 }).withMessage('Username is required'),
        body('password').trim().isLength({ min: 5 }).withMessage('Password must be at least 5 characters'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        const { username, password } = req.body;

        if (!errors.isEmpty()) {
            return res.status(400).render('login', {
                errors: errors.array(),
                username,
            });
        }

        const user = await userModel.findOne({ username });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).render('login', {
                errors: [{ msg: 'Username or password is incorrect' }],
                username,
            });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email,
                username: user.username,
            },
            process.env.JWT_SECRET
        );

        res.cookie('token', token);
        res.redirect('/');
    }
);

module.exports = router;
