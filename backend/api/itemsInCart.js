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
    updateItemsInCart
} = require("../db/itemsInCart");

// Add items to cart
itemsInCartRouter.post("/", isUser, async (req, res, next) => {
  
    const { cartId,itemsId } = req.body;

});

module.exports = itemsInCartRouter;



