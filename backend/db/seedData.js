
const client = require('./client');

const {
  
} = require('./');


async function dropTables() {
  try {
    console.log("Starting to drop tables...");

    await client.query(`
    DROP TABLE IF EXISTS carts;
    DROP TABLE IF EXISTS itemsInCart;
    DROP TABLE IF EXISTS items;
    DROP TABLE IF EXISTS users;
  `);

    console.log("Finished dropping tables!");
  } catch (error) {
    console.error("Error dropping tables!");
    throw error;
  }
}
  
async function createTables() {
  console.log("Starting to build tables...")

  // create all tables, in the correct order
  try{

  await client.query(`
  CREATE TABLE users (
    id SERIAL ,
    uuid varchar(125) UNIQUE PRIMARY KEY,
    username varchar(125) UNIQUE NOT NULL,
    password varchar(125) NOT NULL,
    email varchar(125) UNIQUE NOT NULL,
    address varchar(125) NOT NULL,
    isAdmin boolean DEFAULT false

  );

  CREATE TABLE items (
    id SERIAL ,
    uuid varchar(125) UNIQUE PRIMARY KEY,
    name VARCHAR(125) UNIQUE NOT NULL,
    category TEXT NOT NULL,
    brand TEXT NOT NULL,
    size VARCHAR(125) NOT NULL,
    price INTEGER NOT NULL
  );

  CREATE TABLE itemsInCart (
    id SERIAL ,
    uuid varchar(125) UNIQUE PRIMARY KEY,
    "cartId" INTEGER REFERENCES carts(id),
    "itemsId" INTEGER REFERENCES items(id)
   
  );

  CREATE TABLE carts (
    id SERIAL ,
    uuid varchar(125) UNIQUE PRIMARY KEY,
    "userId" 
  );

  `)
  console.log("Finished building tables!");

  }catch(error){
    console.log(error, "error creating tables")
  }
  }

/* 

DO NOT CHANGE ANYTHING BELOW. This is default seed data, and will help you start testing, before getting to the tests. 

*/

async function createInitialUsers() {
  console.log("Starting to create users...")
  try {
    const usersToCreate = [
     
    ]
    const users = await Promise.all(usersToCreate.map(createUser));

    console.log("Users created:");
    console.log(users);
    console.log("Finished creating users!");
  } catch (error) {
    console.error("Error creating users!");
    throw error
  }
}

async function createInitialItems() {
  try {
    console.log("Starting to create items...")

    const itemsToCreate = [
    // create items to populate
     
    ]
    const items = await Promise.all(itemsToCreate.map(createItems))

    console.log("items created:")
    console.log(items)

    console.log("Finished creating activities!")
  } catch (error) {
    console.error("Error creating activities!")
    throw error
  }
}



async function rebuildDB() {
  try {
    
  } catch (error) {
    console.log("Error during rebuildDB")
    throw error
  }
}

module.exports = {
  rebuildDB,
  dropTables,
  createTables,
}
