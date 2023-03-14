const express = require("express");
const itemsInCartRouter = express.Router();

const jwt = require('jsonwebtoken')
const { JWT_SECRET } = process.env;

const { 
    isUser, 
    isAdministrator 
  } = require("./utils");

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
        attachItemsToCart,
    } = require("../db/carts");

    itemsInCartRouter.get('/health', async (req, res, next) => {

      res.status(200).send({
         message: "items in cart is working!"
      })
      next()
    });

itemsInCartRouter.post("/addItem", isUser, async (req, res, next) => {
  
    const { itemId } = req.body
    const userId = req.user.id

    try{
      let cart = await getCartByUserId (userId)

      if (!cart) {
        cart = await createCart( userId )
      }
      

      const itemInCart = await addItemsToCart( cart.id, itemId )
      const withItems = await attachItemsToCart(cart)

      res.send(
        withItems
      );

    }catch (error) {
        next(error)
    }
});

itemsInCartRouter.patch("/change-quantity", isUser, async (req, res, next) => {
  const {itemInCartId, newQuantity, cartID} = req.body;

  try{
    const cart = await getItemsInCartByCartId (cartID);
    
    const updatedItemInCart = cart.map(
      ({cartId, itemsId}) => {
        
        
        if (itemInCartId === itemsId) {
          
          updateItemsInCart(itemsId, newQuantity, cartID )
        }
      }
    )
    

    if(updatedItemInCart) {
      res.send(updatedItemInCart)
    }

  }catch (error) {
      next(error)
  }
});





// delete items to cart
itemsInCartRouter.delete("/", isUser, async (req, res, next) => {

    const { itemInCartId, cartId } = req.body;

    try{

      const itemsInCart = await getItemsInCartByCartId (cartId);

      const deletedItemInCart = itemsInCart.map(
        ({cartId, itemsId}) => {

          if(itemInCartId === itemsId) {
            destroyItemsInCart(itemsId, cartId)
          }
        })

      console.log('deletedItemInCart is', deletedItemInCart)

      if (deletedItemInCart) {
        res.send(deletedItemInCart);
      }

    }catch (error) {
        next(error)
    }
});

itemsInCartRouter.use((error, req, res, next) => {
    console.log("error caught in itemsInCart Router")
    res.send(error);
  });

module.exports = itemsInCartRouter;



