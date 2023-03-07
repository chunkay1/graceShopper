
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
    price VARCHAR(125) NOT NULL,
    image VARCHAR(125)
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
      //shoes
    {
        name: "TrailBurner",
        category: "shoes",
        brand:"Nike",
        size:"8",
        price: "95.99",
        image: "shoes1.png"
      },
      {
        name: "Adventurer",
        category: "shoes",
        brand:"Addidas",
        size:"11",
        price: "128.99",
        image: "shoes2.png"
      },
      {
        name: "Dunhams",
        category: "shoes",
        brand:"Brooks",
        size:"7",
        price: "78.99",
        image: "shoes3.png"
      },
      {
        name: "ReLeather",
        category: "shoes",
        brand:"Adidas",
        size:"13",
        price: "135.99",
        image: "shoes4.png"
      },
      {
        name: "Trail Blazer",
        category: "shoes",
        brand:"Nike",
        size:"9.5",
        price: "89.99",
        image: "shoes5.png"
      },
      {
        name: "Windsors",
        category: "shoes",
        brand:"KURU",
        size:"11",
        price: "165.99",
        image: "shoes6.png"
      },
      {
        name: "Trekkors",
        category: "shoes",
        brand:"Brooks",
        size:"8",
        price: "115.99",
        image: "shoes7.png"
      },

      //tents
      {
        name: "Syndrome Fullfly",
        category: "tents",
        brand:"Coleman",
        size:"2-person",
        price: "159.99",
        image: "tent1.png"
      },
      {
        name: "Trail 8",
        category: "tents",
        brand:"Kodiak",
        size:"6-person",
        price: "89.99",
        image: "tent2.png"
      },
      {
        name: "Vivo-sun",
        category: "tents",
        brand:"Coleman",
        size:"3-person",
        price: "169.99",
        image: "tent3.png"
      },
      {
        name: "Klondike",
        category: "tents",
        brand:"Kodiak",
        size:"4-person",
        price: "119.99",
        image: "tent4.png"
      },
      {
        name: "Switchback-cross",
        category: "tents",
        brand:"Quest",
        size:"4-person",
        price: "179.99",
        image: "tent5.png"
      },
      {
        name: "Switchback Original",
        category: "tents",
        brand:"Quest",
        size:"8-person",
        price: "149.99",
        image: "tent6.png"
      },

      //Grills and firepits
      {
        name: "Copper Fire",
        category: "Firepits and Grills",
        brand:"MegaStove",
        size:"standard",
        price: "149.99",
        image: "firepit1.png"
      },
      {
        name: "Westwood",
        category: "Firepits and Grills",
        brand:"MegaStove",
        size:"standard",
        price: "289.99",
        image: "firepit2.png"
      },
      {
        name: "Brushed Nickle",
        category: "Firepits and Grills",
        brand:"MegaStove",
        size:"standard",
        price: "229.99",
        image: "firepit3.png"
      },
      {
        name: "Portable BBQ",
        category: "Firepits and Grills",
        brand:"MegaStove",
        size:"standard",
        price: "129.99",
        image: "grill1.png"
      },
      {
        name: "Propane Grill Set",
        category: "Firepits and Grills",
        brand:"MegaStove",
        size:"standard",
        price: "259.99",
        image: "grill2.png"
      },
      {
        name: "Glamping Grill",
        category: "Firepits and Grills",
        brand:"MegaStove",
        size:"standard",
        price: "5429.99",
        image: "grill3.png"
      },

      //clothing
      {
        name: "Plaid v1",
        category: "Clothing",
        brand:"Northface",
        size:"large",
        price: "59.99",
        image: "shirt1.png"
      },
      {
        name: "Plaid v2",
        category: "Clothing",
        brand:"Patagonia",
        size:"medium",
        price: "49.99",
        image: "shirt2.png"
      },
      {
        name: "Plaid v3",
        category: "Clothing",
        brand:"Patagonia",
        size:"large",
        price: "69.99",
        image: "shirt3.png"
      },
      {
        name: "Insulated Jacket",
        category: "Clothing",
        brand:"Patagonia",
        size:"large",
        price: "119.99",
        image: "jacket1.png"
      },
      {
        name: "Camping Jackets",
        category: "Clothing",
        brand:"Patagonia",
        size:"large",
        price: "129.99",
        image: "jacket2.png"
      },
      {
        name: "Outdoor Light Jacket",
        category: "Clothing",
        brand:"Northface",
        size:"small",
        price: "89.99",
        image: "jacket3.png"
      }


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

// async function createInitialcarts(){

// }

// async function createInitialitemsInCart(){
    
// }




async function rebuildDB() {
  try {
    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialItems();
    // await createInitialitemsInCart();
    // await createInitialcarts();
    
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
