const client = require("./client");

async function addItemsToCart(cartId, itemsId) {
  try {
    const { rows: [itemInCart] } = await client.query(
      `
        INSERT INTO itemsInCart ("cartId", "itemsId", quantity)
        VALUES ($1, $2, $3)
        RETURNING *;
      `,
      [cartId, itemsId, 1]
    );

    return itemInCart;
  } catch (error) {
    throw Error(error);
  }
}

async function getItemsInCartById(id) {
  try {
    const { rows } = await client.query(
      `
      SELECT * FROM itemsInCart
      WHERE id = $1;
      `,
      [id]
    );

    const [itemsInCart] = rows;
    return itemsInCart;
  } catch (error) {
    throw error;
  }
}

async function getItemsInCartByItemsId( itemsId ) {
  try {
    const { rows } = await client.query(
      `SELECT * FROM itemsInCart
        WHERE "itemsId" = ${itemsId};
        `
    );

    const [itemsInCart] = rows;
    return itemsInCart;
  } catch (error) {
    throw error;
  }
}

async function getItemsInCartByCartId( cartId ) {
  try {
    const { rows } = await client.query(
      `SELECT * FROM itemsInCart
      WHERE "cartId" = ${cartId};
      `
    );

    const itemsInCart = rows;
    return itemsInCart;
  } catch (error) {
    throw error;
  }
}
async function updateItemsInCart( itemInCartId, quantity, cartID ) {

  try {
    const { rows } = await client.query(
      `
        UPDATE itemsInCart
        SET quantity = $1
        WHERE "itemsId" = $2
        AND "cartId" = $3
        RETURNING *;
      `,
      [quantity, itemInCartId, cartID]
    );

    const itemInCart = rows;

    return itemInCart;
  } catch (error) {
    throw error;
  }
}

async function destroyItemsInCart(id, cartId) {
  try {
    const { rows: [itemInCart] } = await client.query(`
          DELETE FROM itemsInCart
          WHERE "itemsId"=$1
          AND "cartId"=$2
          RETURNING *
          `, [id, cartId]);
    
    return itemInCart
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addItemsToCart,
  getItemsInCartById,
  getItemsInCartByItemsId,
  getItemsInCartByCartId,
  updateItemsInCart,
  destroyItemsInCart
};
