const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth')
const router = new express.Router();

// Create user
router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (e) {
        res.status(400).send(e);
    }
});

// Login
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        // jwt token for authentication
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (e) {
        res.status(400).send();
    }
})

// Logout of all sessions
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send();
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        // filter out token that was used to login
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        })
        await req.user.save();

        res.send();
    }  catch (e) {
        res.status(500).send();
    }
})

// auth (function) is first run
router.get("/users/me", auth, async (req, res) => {
    // ../middleware/auth.js function writes to req.user
    res.send(req.user);
});

// update existing resource
router.patch('/users/me', auth, async(req, res) => {

    // additional error handling to check if user updates available attributes
    const updates = Object.keys(req.body);
    // which attributes you are allowed to update
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save();
        res.send(req.user);
    } catch (e) {
        res.status(400).send();
    }
});

router.delete("/users/me", auth, async(req, res) => {
    try {
        await req.user.remove();
        res.send(req.user);
    } catch (e) {
        res.status(500).send();
    }
})

module.exports = router