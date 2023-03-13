const client = require('./client')

//unsure how to handle uuid, should this happen in javascript or sql- in this file, in this function, or elsewhere?

async function adminCreateItem ({ name, category, brand, size, price, image, description, inventory }) {
    try {
        const { rows: [item] } = await client.query(`
            INSERT INTO items (name, category, brand, size, price, image, description, inventory)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8)
            ON CONFLICT (name) DO NOTHING
            RETURNING *;
        `, [name, category, brand, size, price, image, description, inventory])

        return item

    } catch (error) {
        console.error(error)
        throw error
    }
}

async function getAllItems () {
    try {
        const { rows } = await client.query(`
            SELECT *
            FROM items
        `)

        return rows
    } catch (error) {
        console.error(error)
        throw error
    }
}

async function getItemById ({itemId}) {
    try {
        const { rows: [item] } = await client.query(`
            SELECT *
            FROM items
            WHERE id=${itemId}
        `)

        if(!item) {
            return null
        }

        return item
    } catch (error) {
        console.error(error)
        throw error
    }
}

async function updateInventory (newInventory, itemId) {

    try {
        console.log('hit updateInventory DB method')
        console.log(typeof(newInventory), typeof(itemId))
        console.log(`newInventory is:`, newInventory, ' itemId is ', itemId)
        const { rows } = await client.query(
            `
              UPDATE items
              SET inventory = $1
              WHERE id = $2
              RETURNING *;
            `,
            [newInventory, itemId]
        );
        console.log('maybe?')
        
        const updatedInventory = rows;

        console.log('updated inventory item is:', updatedInventory);

    } catch (error) {
        throw error   
    }
}

async function getItemsByCategory ({ categoryId }) {
    try {
        const _items = await getAllItems ()

        const byCategory = _items.filter((item) => {
            return item.category === categoryId
        })

        if(!byCategory) {
            return null
        }

        return byCategory
    } catch (error) {
        console.error(error)
        throw error
    }
}

module.exports = {
    adminCreateItem,
    getAllItems,
    getItemById,
    updateInventory,
    getItemsByCategory
}