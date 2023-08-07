const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../model/user');

async function login(req, res) {
    try {
        const {email, password} = req.body;

        const buscarUsuario = await User.findOne({email: email, password: password});
        if (buscarUsuario) {
            const token = jwt.sign({email: email, password: password}, process.env.TOKEN_SECRET);
            res.header('auth-token', token).send(token);
        } else {
            res.status(400).send('Email or password is wrong');
        }

    } catch {
        res.status(400).send('Email or password is wrong');
    }
}

async function signup(req, res) {
    try {
    const { name, email, password } = req.body;

    const user = new User({
        name,
        email,
        password
    });

        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err) {
        console.log(err);
        res.send({ message: err });
    }
}

module.exports = {
    login,
    signup
}