
const client = require('./client');

const {
    createUser,
} = require('./users');

const {
    adminCreateItem
} = require('./items');


async function dropTables() {
  try {
    console.log("Starting to drop tables...");

    await client.query(`
    DROP TABLE IF EXISTS itemsInCart;
    DROP TABLE IF EXISTS carts;
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
  // address can be a json data type
  try{

  await client.query(`
  CREATE TABLE users (
    id SERIAL UNIQUE PRIMARY KEY,
    username varchar(125) UNIQUE NOT NULL,
    password varchar(125) NOT NULL,
    email varchar(125) UNIQUE NOT NULL,
    address varchar(125) NOT NULL,   
    isAdmin boolean DEFAULT false

  );

  CREATE TABLE items (
    id SERIAL UNIQUE PRIMARY KEY,
    name VARCHAR(125) UNIQUE NOT NULL,
    category TEXT NOT NULL,
    brand TEXT NOT NULL,
    size VARCHAR(125) NOT NULL,
    price INTEGER NOT NULL
  );


  CREATE TABLE carts (
    id SERIAL UNIQUE PRIMARY KEY, 
    "userId" INTEGER REFERENCES users(id)
);

  CREATE TABLE itemsInCart (
    id SERIAL UNIQUE PRIMARY KEY ,
    "cartId" INTEGER REFERENCES carts(id),
    "itemsId" INTEGER REFERENCES items(id)

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
            { username: "albert", password: "bertie99", email:"test1@gmail.com",address:"8008 Herb Kelleher Way, Dallas, TX 75235"},
            { username: "sandra", password: "sandra123", email:"test2@gmail.com", address:"2400 Aviation Dr, DFW Airport, TX 75261"},
     
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
    {
        name: "hiking shoes",
        category: "shoes",
        brand:"Nike",
        size:"38",
        price: "800"
      },
      {
        name: "track shoes",
        category: "shoes",
        brand:"Addidas",
        size:"40",
        price: "500"
      },
     
    ]
    const items = await Promise.all(itemsToCreate.map(adminCreateItem))

    console.log("items created:")
    console.log(items)

    console.log("Finished creating items!")
  } catch (error) {
    console.error("Error creating items!")
    throw error
  }
}

async function createInitialcarts(){

}

async function createInitialitemsInCart(){
    
}




async function rebuildDB() {
  try {
    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialItems();
    await createInitialitemsInCart();
    await createInitialcarts();
    
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
