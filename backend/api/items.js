const express = require('express');
const itemsRouter = express.Router();

const {
    isAdministrator
} = require ('./utils')

const {
    adminCreateItem,
    getAllItems,
    getItemById,
    getItemsByCategory
} = require('../db/items')

//get all items
itemsRouter.get( '/', async (req, res, next) => {
    try {
        const allItems = await getAllItems()

        res.send(
            allItems
        )
    } catch (error) {
        next (error)
    }
})

//get items by category
itemsRouter.get( '/:categoryId', async (req, res , next) => {
    
    try {    
            
        const categoryId = req.params
        const byCategory = await getItemsByCategory(categoryId)

        if (!byCategory || !byCategory.length) {
            next ({
                error: 'CategoryEmpty',
                message: 'no items found in this category',
                name: 'EmptyCategoryError'
            })
        } else {
            res.send (
                byCategory
            )
        }

    } catch (error) {
        next (error)
    }
})

//get a single item by id
itemsRouter.get( '/:itemId', async (req, res , next) => {
    try {        
        const itemId = req.params
        const byItemId = await getItemById(itemId)

        if (!byItemId) {
            next ({
                error: 'ItemNotFound',
                message: 'Item not Found',
                name: 'ItemMissingError'
            })
        } else {
            res.send (
                byItemId
            )
        }

    } catch (error) {
        next (error)
    }
})

//create a new item (admin)
itemsRouter.post( '/', isAdministrator, async (req, res, next) => {
    const { 
        name,
        category,
        brand,
        size,
        price
    } = req.body

    try {
        const items = await getAllItems()

        // check for items with the same name
        if (items) {
            const _item = items.find(elem => elem.name === name)
            
            if (_item) {
                next ({
                    error: 'duplicateItem',
                    message: `An item with the name ${name} already exists in the database`,
                    name: 'noDuplicateItemError'
                })
            } else {
                const newItem = adminCreateItem({
                    name: name,
                    category: category,
                    brand: brand,
                    size: size,
                    price: price
                })

                res.send(
                    newItem
                )
            }
        }
    } catch (error) {
        next(error)
    }
})

//error handler
itemsRouter.use((error, req, res, next) => {
    res.send(error)
})

module.exports = itemsRouter