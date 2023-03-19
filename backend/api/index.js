const express = require('express');
const router = express.Router();
const cors = require('cors')

const jwt = require('jsonwebtoken')
const { JWT_SECRET } = process.env;

// this function still needs to be written
const {
    getUserById
} = require ('../db/users')

// verifies tokens for users and attaches a .user to any request with a valid token
router.use(async (req, res, next) => {
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');
    console.log("in api/index")
  
    if (!auth) { 
      next();
    } else if (auth.startsWith(prefix)) {
      const token = auth.slice(prefix.length);
  
      try {
        const { id, isAdmin } = jwt.verify(token, JWT_SECRET);
        
        
        //attach a user property to the request object if the token is valid
        if (id) {
          req.user = await getUserById(id);
        }
        
        //attach an admin property if the isAdmin boolean is true
        console.log("isAdmin", isAdmin)
        if (isAdmin) {
          req.Admin = true
        }

        //move on to the next route
        next()

      } catch ({ name, message }) {
        next ({name, message});
      }
    } else {
      next({
        name: 'AuthorizationHeaderError',
        message: `Authorization token must start with ${ prefix }`
      });
    }
  });

  
router.get('/health', async (req, res, next) => {

  res.status(200).send({
     message: "all is well!"
  })
  next()
});


//api/users
const usersRouter = require('./users');
router.use('/users', usersRouter);

//api/items
const itemsRouter = require('./items');
router.use('/items', itemsRouter);

//keep below commented out until they are built

// api/carts
const cartsRouter = require('./carts');
router.use('/carts', cartsRouter);

// api/itemsInCart
const itemsInCartRouter = require('./itemsInCart');
router.use('/itemsInCart', itemsInCartRouter);

//404 handler
router.use((req, res, next) => {
    res.status(404).send({message: "page not found!"})
    next()
})

module.exports = router