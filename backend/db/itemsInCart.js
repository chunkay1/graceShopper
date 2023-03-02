const client = require('./client');

async function addItemsToCart({
    cartId,
    itemsId
  }) {
      try{
        const {rows} = await client.query(`
        INSERT INTO itemsInCart("cartId","itemsId")
        VALUES($1,$2,$3,$4)
        RETURNING *;
        `,[cartId,itemsId])
  
        const [itemsInCart] = rows;
        return itemsInCart;
  
      }catch(error){
        throw Error(error)
      }
  }

  async function getItemsInCartById(id) {

    try {
      const { rows } = await client.query(`
      SELECT * FROM itemsInCart
      WHERE id = $1;
      `,[id]);
  
      const [itemsInCart] = rows;
      return itemsInCart;
  
    } catch (error) {
      throw error;
    }
  }

  async function getItemsInCartByItems({itemsId}) {

    try {
      const { rows} = await client.query(
      `SELECT * FROM itemsInCart
        WHERE "itemsId" = ${itemsId};
        `)
    
        const [itemsInCart] = rows;
        return itemsInCart;
    
    } catch (error) {
      throw error;
    }
    
    }

  module.exports = {
    addItemsToCart,
    getItemsInCartById,
    getItemsInCartByItems,
    
  };