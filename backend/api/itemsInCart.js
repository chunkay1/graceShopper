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


// Add items to cart
itemsInCartRouter.post("/", isUser, async (req, res, next) => {
  
    const { cartId,itemsId } = req.body;
    try{
    const itemInCart = await addItemsToCart ({ cartId, itemsId})

    res.send(itemInCart);

    }catch (error) {
        next(error)
    }
});

// delete items to cart

itemsInCartRouter.delete("/", isUser, async (req, res, next) => {

    const { id,cartId } = req.body;

    try{
    const itemInCart = await getItemsInCartById ({id});
    const deleteItemsInCart = await destroyItemsInCart({itemInCart});
    res.send(deleteItemsInCart);

    }catch (error) {
        next(error)
    }
});

itemsInCartRouter.use((error, req, res, next) => {
    res.send(error);
  });

module.exports = itemsInCartRouter;



