const express = require('express');
const cors = require('cors')
const router = express.Router();
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = process.env;
router.use(cors())

// this function still needs to be written
const {
    getUserById
} = require ('../db')

//verifies tokens for users and attaches a .user to any request with a valid token
router.use(async (req, res, next) => {
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');
  
    if (!auth) { 
      next();
    } else if (auth.startsWith(prefix)) {
      const token = auth.slice(prefix.length);
  
      try {
        const { id, isAdmin } = jwt.verify(token, JWT_SECRET);

        if (id) {
          req.user = await getUserById(id);
          next();
        }
        if (isAdmin) {
            req.Admin = true
        }

      } catch ({ name, message }) {
        next({ name, message });
      }
    } else {
      next({
        name: 'AuthorizationHeaderError',
        message: `Authorization token must start with ${ prefix }`
      });
    }
  });

//api/users
const usersRouter = require('./users');
router.use('/users.js', usersRouter);

//api/items
const itemsRouter = require('./items');
router.use('/items', itemsRouter);

//api/carts
const cartsRouter = require('./carts');
router.use('/carts', cartsRouter);

//api/itemsInCart
const itemsInCartRouter = require('./itemsInCart');
router.use('/itemsInCart', itemsInCartRouter);

//404 handler
router.use((req, res, next) => {
    res.status(404).send({message: "page not found!"})
    next()
})

module.exports = router;