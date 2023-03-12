
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
    image VARCHAR(125),
    description VARCHAR(500)
  );


  CREATE TABLE carts (
    id SERIAL UNIQUE PRIMARY KEY, 
    "userId" INTEGER REFERENCES users(id),
    purchased BOOLEAN DEFAULT false
);

  CREATE TABLE itemsInCart (
    id SERIAL UNIQUE PRIMARY KEY ,
    "cartId" INTEGER REFERENCES carts(id),
    "itemsId" INTEGER REFERENCES items(id),
    quantity INTEGER
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
            { username: "albert", password: "bertie99", email:"test1@gmail.com", address:"8008 Herb Kelleher Way, Dallas, TX 75235"},
            { username: "sandra", password: "sandra123", email:"test2@gmail.com", address:"2400 Aviation Dr, DFW Airport, TX 75261"},
            { username: "Sam", password: "Samson123", email:"test5@gmail.com", address:"123 big boy lane, Mountainton, CO 80555", isAdmin: true},
            { username: "Fabian", password: "Fabian123", email:"test6@gmail.com", address:"123 Texas st, Texas-town, TX", isAdmin: true},
            { username: "Vivienne", password: "Vivienne123", email:"test7@gmail.com", address:"123 Texas st, Texas-town, TX", isAdmin: true},
            { username: "Kendall", password: "Kendall123", email:"test8@gmail.com", address:"123 Texas st, Texas-town, TX", isAdmin: true},
     
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
        category: "Shoes",
        brand:"Nike",
        size:"8",
        price: "95.99",
        image: "shoes1.png",
        description: "Introducing the latest pair of hiking shoes, the TrailBurner, designed to conquer any terrain. With a durable waterproof outer shell made of breathable materials, your feet will stay dry and comfortable even in wet conditions. The rugged outsole provides excellent traction on both rocky and slippery surfaces, while the cushioned midsole offers superior support and shock absorption for all-day comfort."
      },
      {
        name: "Adventurer",
        category: "Shoes",
        brand:"Adidas",
        size:"11",
        price: "128.99",
        image: "shoes2.png",
        description: "Introducing our latest hiking shoe, the Adventurer, designed for the adventurous soul. These shoes feature a durable waterproof exterior that will keep your feet dry in any weather conditions, while the breathable lining ensures maximum comfort during long hikes. The rugged sole provides excellent traction on any terrain, making these shoes the perfect companion for any outdoor adventure."
      },
      {
        name: "Dunhams",
        category: "Shoes",
        brand:"Brooks",
        size:"7",
        price: "78.99",
        image: "shoes3.png",
        description: "These Dunham hiking shoes are a must-have for any outdoor enthusiast. With a sturdy construction and breathable material, they're built to handle any terrain and keep your feet comfortable all day. The durable sole provides excellent traction, making them the perfect choice for your next adventure."
      },
      {
        name: "ReLeather",
        category: "Shoes",
        brand:"Adidas",
        size:"13",
        price: "135.99",
        image: "shoes4.png",
        description: "Our ReLeather hiking shoes are perfect for any adventure on the trails. With a lightweight and breathable design, your feet will stay cool and comfortable all day long. The sturdy rubber outsole provides superior traction, while the padded collar and cushioned insole ensure a comfortable fit for miles on end."
      },
      {
        name: "Trail Blazer",
        category: "Shoes",
        brand:"Nike",
        size:"9.5",
        price: "89.99",
        image: "shoes5.png",
        description: "Our Trail Blazer hiking shoes are built to take you to new heights. These shoes feature a rugged outsole for maximum traction, allowing you to tackle any terrain with confidence. With a comfortable and supportive fit, you'll be able to explore the great outdoors for hours on end."
      },
      {
        name: "Windsors",
        category: "Shoes",
        brand:"KURU",
        size:"11",
        price: "165.99",
        image: "shoes6.png",
        description: "Our Windsors hiking shoes are perfect for both on and off the trail. These shoes feature a stylish and versatile design, making them a great choice for any adventure. With a comfortable fit and durable construction, you'll be able to explore the great outdoors in style and comfort."
      },
      {
        name: "Trekkors",
        category: "Shoes",
        brand:"Brooks",
        size:"8",
        price: "115.99",
        image: "shoes7.png",
        description: "Our Trekkors hiking shoes are made for the toughest trails. These shoes feature a waterproof and breathable membrane, ensuring your feet stay dry and comfortable no matter the weather. With a durable outsole and supportive midsole, you'll be able to tackle any terrain with ease and comfort."
      },

      //tents
      {
        name: "Syndrome Fullfly",
        category: "Tents",
        brand:"Coleman",
        size:"2-person",
        price: "159.99",
        image: "tent1.png",
        description: "The Syndrome Fullfly tent is the perfect choice for your next camping adventure. With a spacious interior and easy set-up, you'll have a comfortable and hassle-free experience. The waterproof and breathable fabric ensures you stay dry and comfortable, while the sturdy poles and guy lines keep the tent stable in windy conditions."
      },
      {
        name: "Trail 8",
        category: "Tents",
        brand:"Kodiak",
        size:"6-person",
        price: "89.99",
        image: "tent2.png",
        description: "The Trail 8 tent is designed to keep you comfortable and protected during your camping trip. With space to comfortably sleep up to eight people, this tent is perfect for families or groups. The durable and weather-resistant construction ensures your shelter from the elements, while the easy-to-pitch design makes setup a breeze."
      },
      {
        name: "Vivo-sun",
        category: "Tents",
        brand:"Coleman",
        size:"3-person",
        price: "169.99",
        image: "tent3.png",
        description: "Our Vivo-sun tent is perfect for both indoor and outdoor use. With a durable and weather-resistant construction, this tent provides shelter from the elements for any occasion. The easy-to-assemble design makes setup quick and hassle-free, so you can start enjoying your space in no time."
      },
      {
        name: "Klondike",
        category: "Tents",
        brand:"Kodiak",
        size:"4-person",
        price: "119.99",
        image: "tent4.png",
        description: "The Klondike tent is a spacious and comfortable option for your next camping trip. With room for up to eight people, this tent features a screen room for added living space and protection from bugs. The durable construction and waterproof coating ensure that you stay dry and comfortable, no matter the weather."
      },
      {
        name: "Switchback-cross",
        category: "Tents",
        brand:"Quest",
        size:"4-person",
        price: "179.99",
        image: "tent5.png",
        description: "Our Switchback-cross tent is designed to be both lightweight and spacious, making it the perfect choice for backpacking trips. With a unique cross-shaped design, this tent provides ample headroom and living space. The durable and waterproof fabric ensures you stay dry and comfortable, while the easy-to-pitch design makes setup a breeze."
      },
      {
        name: "Switchback Original",
        category: "Tents",
        brand:"Quest",
        size:"8-person",
        price: "149.99",
        image: "tent6.png",
        description: "Our Switchback Original tent is the perfect combination of durability and portability, making it an ideal choice for backpackers and hikers. This tent features a lightweight design and compact storage size, making it easy to transport on long treks. The waterproof and breathable fabric provides protection from the elements, while the easy-to-pitch design allows for quick setup at any campsite."
      },

      //Grills and firepits
      {
        name: "Copper Fire",
        category: "Firepits and Grills",
        brand:"MegaStove",
        size:"standard",
        price: "149.99",
        image: "firepit1.png",
        description: "Our Copper Fire firepit is the perfect addition to your backyard or camping setup. This firepit features a durable and weather-resistant copper construction, ensuring long-lasting use. The compact and portable design makes it easy to transport, while the built-in fire grate and spark screen provide added safety and convenience."
      },
      {
        name: "Westwood",
        category: "Firepits and Grills",
        brand:"MegaStove",
        size:"standard",
        price: "289.99",
        image: "firepit2.png",
        description: "The Westwood firepit is the perfect way to enjoy a warm and cozy fire in your backyard or outdoor space. With a stylish and durable design, this firepit is built to last and withstand the elements. The deep bowl and built-in log grate provide ample space for a fire, while the mesh spark screen ensures added safety and protection."
      },
      {
        name: "Brushed Nickle",
        category: "Firepits and Grills",
        brand:"MegaStove",
        size:"standard",
        price: "229.99",
        image: "firepit3.png",
        description: "Our Brushed Nickle firepit is a sleek and modern addition to any outdoor space. This firepit features a durable and weather-resistant brushed nickel construction, ensuring long-lasting use. The deep bowl and built-in log grate provide ample space for a fire, while the mesh spark screen ensures added safety and protection."
      },
      {
        name: "Portable BBQ",
        category: "Firepits and Grills",
        brand:"MegaStove",
        size:"standard",
        price: "129.99",
        image: "grill1.png",
        description: "Our Portable BBQ grill is perfect for cooking up a delicious meal on the go. With a compact and lightweight design, this grill is easy to transport to any outdoor location. The durable construction and adjustable cooking grate make it easy to cook up your favorite foods to perfection, while the removable ash pan makes cleanup a breeze."
      },
      {
        name: "Propane Grill Set",
        category: "Firepits and Grills",
        brand:"MegaStove",
        size:"standard",
        price: "259.99",
        image: "grill2.png",
        description: "Our Propane Grill Set includes everything you need to cook up a delicious meal in your backyard or outdoor space. With a durable and weather-resistant design, this set features a propane grill with adjustable burners and a built-in temperature gauge. The set also includes a grilling spatula, tongs, and fork, ensuring you have all the tools you need for a successful cookout."
      },
      {
        name: "Glamping Grill",
        category: "Firepits and Grills",
        brand:"MegaStove",
        size:"standard",
        price: "5429.99",
        image: "grill3.png",
        description: "Our Glamping Grill camping food truck is the perfect solution for a mobile outdoor dining experience. This food truck features a fully-equipped kitchen with a grill, stove, oven, sink, and refrigerator. With a stylish and modern design, the Glamping Grill provides a unique and unforgettable experience for any outdoor event or camping trip."
      },

      //clothing
      {
        name: "Plaid v1",
        category: "Clothing",
        brand:"Northface",
        size:"large",
        price: "59.99",
        image: "shirt1.png",
        description: "This plaid shirt for sale is a classic and timeless addition to any wardrobe. Made with soft and comfortable materials, this shirt is perfect for any casual occasion. The stylish plaid pattern and versatile color options make it easy to pair with jeans or shorts for a complete look."
      },
      {
        name: "Plaid v2",
        category: "Clothing",
        brand:"Patagonia",
        size:"medium",
        price: "49.99",
        image: "shirt2.png",
        description: "Our plaid shirt is a versatile and classic addition to any wardrobe. With a comfortable and breathable fabric, this shirt is perfect for casual wear or outdoor activities. The timeless plaid pattern and button-up design make it a stylish choice for any occasion."
      },
      {
        name: "Plaid v3",
        category: "Clothing",
        brand:"Patagonia",
        size:"large",
        price: "69.99",
        image: "shirt3.png",
        description: "This plaid shirt for sale is a classic and versatile addition to your wardrobe. Made from soft and comfortable fabric, this shirt features a timeless plaid pattern that is perfect for any casual occasion. With a button-front design and chest pockets, this shirt is both stylish and functional."
      },
      {
        name: "Insulated Jacket",
        category: "Clothing",
        brand:"Patagonia",
        size:"large",
        price: "119.99",
        image: "jacket1.png",
        description: "This Insulated Jacket for sale is designed to keep you warm and comfortable in cold weather. With a durable and water-resistant outer shell, this jacket features a cozy and breathable insulation layer that traps body heat for added warmth. The adjustable hood and cuffs provide added protection from the elements, while the multiple pockets offer convenient storage for your essentials."
      },
      {
        name: "Camping Jackets",
        category: "Clothing",
        brand:"Patagonia",
        size:"large",
        price: "129.99",
        image: "jacket2.png",
        description: "Our selection of camping jackets for sale includes a variety of options to suit any outdoor adventure. From lightweight and packable jackets for backpacking to heavy-duty insulated jackets for extreme weather, we have something for every type of camper. Our jackets feature durable and weather-resistant fabrics, adjustable hoods and cuffs, and multiple pockets for storage, ensuring you stay warm, dry, and comfortable on your next camping trip."
      },
      {
        name: "Outdoor Light Jacket",
        category: "Clothing",
        brand:"Northface",
        size:"small",
        price: "89.99",
        image: "jacket3.png",
        description: "Our outdoor light jacket for sale is the perfect choice for mild weather and outdoor activities. With a lightweight and breathable design, this jacket is made from durable and weather-resistant fabric, ensuring long-lasting use. The adjustable hood and cuffs provide added protection from the elements, while the multiple pockets offer convenient storage for your essentials."
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
