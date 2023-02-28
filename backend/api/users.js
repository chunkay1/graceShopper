const express = require('express');
const usersRouter = express.Router();
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = process.env;

const {
    isAdmin,
    isUser
} = require ('./utils')

const {
    createUser,
    getUserByUsername,
    getUser,
    getUserById
} = require('../db/users')

//Register
usersRouter.post( '/register', async (req, res , next) => {

    const {
        username,
        password,
        email,
        address
    } = req.body

    try {        
        const _user = await getUserByUsername()

        if (_user) {
            next ({
                error: 'usernameAlreadyExists',
                message: `user ${username} already exists`,
                name: 'NoDuplicateUsersError'
            })
        } 
        if (password.length < 7) {
            next({
                error: "password too short",
                message: "Password should be at least 7 characters",
                name: "PasswordTooShortError"
            })
        } else {
            const user = await createUser({ 
                username, 
                password,
                email,
                address 
            })
            if (user) {
              res.send ({
                  user: user,
                  message: 'Success! Thanks for signing up with Hike and Seek.'
              })
            }
        }

    } catch (error) {
        next (error)
    }
})



//error handler
usersRouter.use((error, req, res, next) => {
    res.send(error)
})

module.exports = usersRouter