const client = require('./client')

//unsure how to handle uuid, should this happen in javascript or sql- in this file, in this function, or elsewhere?

async function adminCreateItem ({ name, category, brand, size, price, image }) {
    try {
        const { rows: [item] } = await client.query(`
            INSERT INTO items (name, category, brand, size, price, image)
            VALUES($1, $2, $3, $4, $5, $6)
            ON CONFLICT (name) DO NOTHING
            RETURNING *;
        `, [name, category, brand, size, price, image])

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

async function getItemById (itemId) {
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
    getItemsByCategory
}