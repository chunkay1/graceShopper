const express = require('express');
const usersRouter = express.Router();
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = process.env;

const {
    isAdministrator,
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
        
        //next if user already exists
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
              const token = jwt.sign({
                id: user.id,
                username: username,
                isAdmin: user.isAdmin
            }, JWT_SECRET)

            res.send ({
                token: token,
                message: 'Success! Thanks for signing up with Hike and Seek.'
            })
        }
        }

    } catch (error) {
        next (error)
    }
})

usersRouter.post( '/login', async (req, res , next) => {

    const {
        username,
        password
    } = req.body
  
    //this should be handled on the frontend, but this is for safety
    if (!username || !password) {
        next({
            name: "MissingCredentialsError",
            message: "Please enter a password and a username"
        })
    }

    //DB passwords are hashed, I don't believe I need to hash it on this side as well? 
    try {
      const user = await getUser({ 
        username: username,
        password: password 
      })
      //next if no user is found
      if(!user) {
        next({
            error: "noUser",
            message: "Password or username is incorrect, please try again.",
            name: "IncorrectCredentialsError"
        })  
      }
      if (user) {
        const token = jwt.sign({
            id: user.id,
            username: user.username,
            isAdmin: user.isAdmin
        }, JWT_SECRET)

        res.send({
            message: "You're logged in! Enjoy the Hike and Seek experience.",
            token: token
        })
      }

    } 
    catch (error) {
      next (error)
    }
})

//a simple route for a page that might display your address, name, etc, and later allow you to edit those things
usersRouter.get('/me', isUser, async (req, res, next) => {
    try {
        let user = req.user
        res.send({
            user
        })
    } catch (error) {
        next(error)
    }
})

//error handler
usersRouter.use((error, req, res, next) => {
    res.send(error)
})

module.exports = usersRouter


//some possible additional routes:

//updateUserInfo
//adminDeleteUser
//ordersByUser?