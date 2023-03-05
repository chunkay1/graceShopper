const client = require("./client");
// const { attachItemsToCart, getItemById } = require("./items");

async function createCart({ userId }) {
  try {
    const {
      rows: [cart],
    } = await client.query(
      `
        INSERT INTO carts ("userId")
        VALUES ($1)
        RETURNING *
        `,
      [userId]
    );

    console.log(cart);
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

async function getCartByUserId({ userId }) {
  try {
    const { rows } = await client.query(`
      SELECT * FROM carts
      WHERE "userId" =${userId};
      `);

    if (!cart) return null;

    const [cart] = rows;
    return cart;
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
        `);

    await client.query(`
        DELETE FROM 
        carts
        WHERE id =${cartId}
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
  destroyCart
};
