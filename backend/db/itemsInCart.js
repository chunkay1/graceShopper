const client = require("./client");

async function addItemsToCart({ cartId, itemsId }) {
  try {
    const { rows } = await client.query(
      `
        INSERT INTO itemsInCart("cartId","itemsId")
        VALUES($1,$2)
        RETURNING *;
        `,
      [cartId, itemsId]
    );

    const [itemsInCart] = rows;
    return itemsInCart;
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

async function getItemsInCartByItemsId({ itemsId }) {
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

async function getItemsInCartByCartId({ cartId }) {
  try {
    const { rows } = await client.query(
      `SELECT * FROM itemsInCart
            WHERE "cartId" = ${cartId};
            `
    );

    const [itemsInCart] = rows;
    return itemsInCart;
  } catch (error) {
    throw error;
  }
}
async function updateItemsInCart({ id, ...fields }) {
    
    const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  if (setString.length === 0) {
    return;
  }

  try {
    const {
      rows: [itemsInCart],
    } = await client.query(
      `
              UPDATE itemsInCart
              SET ${setString}
              WHERE id=${id}
              RETURNING *;
              `,
      Object.values(fields)
    );

    // Another way:
    // const { cartId, itemsId } = fields
    // let returned
    //   const {rows:[updated]} = await client.query(`
    //   UPDATE itemsInCart
    //   SET "itemsId" = $2
    //   WHERE id=$1
    //   RETURNING *
    //   `,[itemsId,id])
    //   returned = updated

    return routine;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addItemsToCart,
  getItemsInCartById,
  getItemsInCartByItemsId,
  getItemsInCartByCartId,
  updateItemsInCart
};
