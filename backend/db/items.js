const client = require('./client')

//unsure how to handle uuid, should this happen in javascript or sql- in this file, in this function, or elsewhere?

async function adminCreateItem ({ name, category, brand, size, price }) {
    try {
        const { rows: [item] } = await client.query(`
            INSERT INTO items (name, category, brand, size, price)
            VALUES($1, $2, $3, $4, $5)
            ON CONFLICT (name) DO NOTHING
            RETURNING *;
        `, [name, category, brand, size, price])

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

async function getItemsByCategory (category) {
    try {
        const { rows: items } = await client.query(`
            SELECT *
            FROM items
            WHERE category=${category}
        `)

        if(!items) {
            return null
        }

        return items
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