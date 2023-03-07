const express = require("express");
const itemsInCartRouter = express.Router();

const jwt = require('jsonwebtoken')
const { JWT_SECRET } = process.env;

const { isUser,isAdministrator } = require("./utils");

const {
    addItemsToCart,
    getItemsInCartById,
    getItemsInCartByItemsId,
    getItemsInCartByCartId,
    updateItemsInCart,
    destroyItemsInCart
} = require("../db/itemsInCart");
const { createCart, 
        getCartById,
        getCartByUserId,
        attachItemsToCart
    } = require("../db/carts");


// Add items to cart, create new cart if one doesn't exist
// will need to be rewritten later to accommodate guests
itemsInCartRouter.post("/", isUser, async (req, res, next) => {
  
    const { itemId } = req.body
    const { userId } = req.user
    
    // const { [id] : userId } = jwt.verify( token )

    try{
      let cart = await getCartByUserId ({ userId })

      //if no cart exists, create one
      if (!cart) {
        cart = await createCart( userId )
      }
      
      //create ItemInCart in the ItemsInCart table
      const itemInCart = addItemsToCart( cart.id, itemId )
      const withItems = await attachItemsToCart(cart)

      res.send(
        "Item added to cart",
        itemInCart,
        "here is the updated cart",
        withItems
      );

    }catch (error) {
        next(error)
    }
});

// delete items to cart

itemsInCartRouter.delete("/", isUser, async (req, res, next) => {

    const { itemInCartId, cartId } = req.body;

    try{
      const itemInCart = await getItemsInCartById ({itemInCartId});
      const deletedItemInCart = await destroyItemsInCart({itemInCart});

      //will also need to grab the cart and remove the associated item on the javascript level, otherwise it will show that it is still in the cart even after it's been removed from the db

      if (deletedItemInCart) {
        res.send(`item successfully removed`, deletedItemInCart);
      }

    }catch (error) {
        next(error)
    }
});

itemsInCartRouter.use((error, req, res, next) => {
    res.send(error);
  });

module.exports = itemsInCartRouter;



