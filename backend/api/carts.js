const express = require("express");
const cartsRouter = express.Router();

const jwt = require('jsonwebtoken')
const { JWT_SECRET } = process.env;

const { isUser,isAdministrator } = require("./utils");

const {
    createCart,
    getAllCarts,
    getCartById,
    getCartByUserId,
    destroyCart,
    attachItemsToCart
} = require("../db/carts");

// GET /api/carts get all carts as administrator
cartsRouter.get("/", isAdministrator, async (req, res) => {
  try {
    const carts = await getAllCarts();
    if (carts) {
      res.send(carts);
    }
  } catch (error) {
    throw Error("Failed to get all carts", error);
  }
});

cartsRouter.get('/health', async (req, res, next) => {
  res.status(200).send({
     message: "all is well!"
  })
});

// GET /api/carts/:cartId get a cart by id
// cartsRouter.get("/:cartId", isUser, async (req, res) => {

//     const { id } = req.body;

//     try {
//       const cart = await getCartById({id});
//       const withItems = await attachItemsToCart(cart)
//       if (withItems) {
//         res.send(withItems);
//       } 
//       else if (cart) {
//         res.send(cart)
//       }
//     } catch (error) {
//       throw Error("Failed to get cart by cartId", error);
//     }
//   });

// GET /api/carts/:userId gets a cart by userId
//this is nearly identical to api/carts/:userId, except we're grabbing the cart by userId instead.
//I couldn't figure out how to capture the cartId and set it into our get request
cartsRouter.get("/:userId", isUser, async (req, res) => {

    const { userId } = req.params;

    try {
      console.log('hit');
      const cart = await getCartByUserId(userId);
      console.log('cart is:', cart)
      const withItems = await attachItemsToCart(cart)
      if (withItems) {
        res.send(withItems);
      } 
      else if (cart) {
        res.send(cart)
      }
    } catch (error) {
      throw Error("Failed to get cart by cartId", error);
    }
  });


// POST /api/carts create a new cart if you are a user
cartsRouter.post("/", isUser, async (req, res, next) => {
  
    const { userId } = req.body;

  try {

    // check for valid user - logged in for userId

    // if (req.headers.authorization) {
    //     const usertoken = req.headers.authorization;
    //     const token = usertoken.split(' ');
    //     const data = jwt.verify(token[1], JWT_SECRET);
    //     const userId = data.id;
    

    // check for carts with the same userId
    const cart = await getCartByUserId({ userId });

    if (cart) {
      next({
        error: "duplicateCart",
        message: `An cart with the userId ${userId} already exists in the database`,
        name: "noDuplicateCartError",
      });
    } else {
      const newCart = createCart( userId );
      res.send(newCart);
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// DELETE /api/carts/:cartId
cartsRouter.delete('/:cartId', isUser, async (req, res, next) => {

    try {
        const cartId = parseInt(req.params.cartId);
        
        const cart = await getCartById({cartId});

        const deleteCart = await destroyCart({cart});
        res.send(deleteCart)

    }catch (error) {
        throw Error("Failed to delete cart by cartId", error)
    }

});

cartsRouter.use((error, req, res, next) => {
  res.send(error);
});

module.exports = cartsRouter;
