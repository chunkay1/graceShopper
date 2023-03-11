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
async function updateItemsInCart( itemInCartId, quantity ) {

  try {
    const {
      rows: [itemInCart],
    } = await client.query(
      `
        UPDATE itemsInCart
        SET quantity=${quantity}
        WHERE id=${itemInCartId}
        RETURNING *;
      `,
      [quantity]
    );

    return itemInCart;
  } catch (error) {
    throw error;
  }
}

// updateItemsInCart({ id, ...fields })
  //   const setString = Object.keys(fields)
  //   .map((key, index) => `"${key}"=$${index + 1}`)
  //   .join(", ");

  // if (setString.length === 0) {
  //   return;
  // }

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

//added the cartID as an argument to ensure we're only targeting and deleting items within a specific cart
//this should prevent us from deleting every instance of a particular item across all carts. 
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

// async function destroyItemsInCart(id) {
//   try {
//     const { rows: [itemInCart] } = await client.query(`
//           DELETE FROM 
//           itemsInCart
//           WHERE "itemsId"=${id}
//           RETURNING *
//           `);

//     return itemInCart
//   } catch (error) {
//     throw error;
//   }
// }

module.exports = {
  addItemsToCart,
  getItemsInCartById,
  getItemsInCartByItemsId,
  getItemsInCartByCartId,
  updateItemsInCart,
  destroyItemsInCart
};
