const client = require("./client");
// const { attachItemsToCart, getItemById } = require("./items");

async function attachItemsToCart(cart) {
  
  const { rows: itemInCart } = await client.query(`
    SELECT *
    FROM itemsInCart
    WHERE "cartId" = ${cart.id}
  `)

  cart.itemsInCart = itemInCart
  console.log("these are the items attached to your cart", cart.itemsInCart)

  return cart
}

//alternate way to try this
// async function attachItemsToCart(cart) {

//   const { rows: itemInCart } = await client.query(`
//     SELECT items.*,
//     itemsInCart."itemsId",
//     itemsInCart.."cartId",
//     FROM items
//     JOIN intemsInCart
//     ON itemsInCart."itemsId" = items.id
//     WHERE itemsInCart."cartId"=$1;
//    `, [cart.id])

//   cart.itemsInCart = itemsInCart

//   return cart
// }

//the below returns a complete object with cart and item details for ease of use on the frontend. 
async function getCartAndItemDetails(cart) {
  // console.log('gibberish')
  const { rows: itemInCart } = await client.query(`
     SELECT *
     FROM items
     JOIN itemsInCart
     ON items.id = itemsInCart."itemsId" 
     WHERE itemsInCart."cartId"=$1;
    `, [cart.id])

  cart.itemsInCart = itemInCart
  
  // console.log('cart and item details are', cart)

  return cart
}

async function createCart( userId ) {
  try {
    const { rows: [cart] } = await client.query(
      `
        INSERT INTO carts ("userId")
        VALUES ($1)
        RETURNING *;
        `,
        [userId]
    );

    console.log("This is cart in createCart", cart);
    return cart;
  } catch (error) {
    console.log(error, "error creating cart");
    throw error;
  }
}

async function getAllCarts() {
    try {
      const { rows } = await client.query(`
        SELECT * FROM carts
        `);
  
      const [carts] = rows;
      return carts;
    } catch (error) {
      throw error;
    }
}

async function getCartById(cartId) {
  try {
    const { rows } = await client.query(`
      SELECT * FROM carts
      WHERE id=${cartId};
      `);

    const [cart] = rows;
    return cart;
  } catch (error) {
    throw error;
  }
}

async function getCartByUserId(userId) {
  try {
    const { rows: [cart] } = await client.query(`
      SELECT * FROM carts
      WHERE "userId" = ${userId}
      AND purchased = false;
      `);

    if (!cart) {
      return null;
    }
    else {
      return cart;
    }
  } catch (error) {
    throw error;
  }
}

async function getPreviousCartsByUserId(userId) {
  try {
    const { rows: cart } = await client.query(`
      SELECT * FROM carts
      WHERE "userId" = ${userId}
      AND purchased = true;
      `);

    if (!cart) {
      return null;
    }
    else {
      return cart;
    }
  } catch (error) {
    throw error;
  }
}

async function checkoutCart(cartId) {
    try{ 
      const { rows: [cart] } = await client.query(`
      UPDATE carts
      SET purchased=true
      WHERE "id" = ${cartId}
      RETURNING *
      `);

    if (!cart) {
      return null;
    }
    else {
      return cart;
    }
  } catch (error) {
    throw error;
  }
}

async function destroyCart(cartId) {
  try {
    await client.query(`
        DELETE FROM 
        itemsInCart
        WHERE cartId =${cartId}
        RETURNING *
        `);

    await client.query(`
        DELETE FROM 
        carts
        WHERE id =${cartId}
        RETURNING *
        `);
    } catch (error) {
    throw error;
    }
}

module.exports = {
  createCart,
  getAllCarts,
  getCartById,
  getCartByUserId,
  getPreviousCartsByUserId,
  checkoutCart,
  destroyCart,
  attachItemsToCart,
  getCartAndItemDetails
};
