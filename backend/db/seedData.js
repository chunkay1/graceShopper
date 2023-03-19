
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
    "isAdmin" boolean DEFAULT FALSE
  );

  CREATE TABLE items (
    id SERIAL UNIQUE PRIMARY KEY,
    name VARCHAR(125) UNIQUE NOT NULL,
    category TEXT NOT NULL,
    brand TEXT NOT NULL,
    size VARCHAR(125) NOT NULL,
    price VARCHAR(125) NOT NULL,
    image VARCHAR(125),
    description VARCHAR(600),
    inventory INTEGER
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
            { username: "Sam", password: "Samson123", email:"test5@gmail.com", address:"123 big boy lane, Mountainton, CO 80555", isAdmin: false},
            { username: "SamAdmin", password: "Samson123", email:"test15@gmail.com", address:"123 big boy lane, Mountainton, CO 80555", isAdmin: true},
            { username: "Fabian", password: "Fabian123", email:"test6@gmail.com", address:"123 Texas st, Texas-town, TX", isAdmin: false},
            { username: "FabianAdmin", password: "Fabian123", email:"test16@gmail.com", address:"123 Texas st, Texas-town, TX", isAdmin: true},
            { username: "Vivienne", password: "Vivienne123", email:"test7@gmail.com", address:"123 Texas st, Texas-town, TX", isAdmin: false},
            { username: "VivienneAdmin", password: "Vivienne123", email:"test17@gmail.com", address:"123 Texas st, Texas-town, TX", isAdmin: true},
            { username: "Kendall", password: "Kendall123", email:"test8@gmail.com", address:"123 Texas st, Texas-town, TX", isAdmin: false},
            { username: "KendallAdmin", password: "Kendall123", email:"test18@gmail.com", address:"123 Texas st, Texas-town, TX", isAdmin: true},
     
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
        description: "Introducing the latest pair of hiking shoes, the TrailBurner, designed to conquer any terrain. With a durable waterproof outer shell made of breathable materials, your feet will stay dry and comfortable even in wet conditions. The rugged outsole provides excellent traction on both rocky and slippery surfaces, while the cushioned midsole offers superior support and shock absorption for all-day comfort.",
        inventory: 1
      },
      {
        name: "Adventurer",
        category: "Shoes",
        brand:"Adidas",
        size:"11",
        price: "128.99",
        image: "shoes2.png",
        description: "Introducing our latest hiking shoe, the Adventurer, designed for the adventurous soul. These shoes feature a durable waterproof exterior that will keep your feet dry in any weather conditions, while the breathable lining ensures maximum comfort during long hikes. The rugged sole provides excellent traction on any terrain, making these shoes the perfect companion for any outdoor adventure.",
        inventory: 0
      },
      {
        name: "Dunhams",
        category: "Shoes",
        brand:"Brooks",
        size:"7",
        price: "78.99",
        image: "shoes3.png",
        description: "These Dunham hiking shoes are a must-have for any outdoor enthusiast. With a sturdy construction and breathable material, they're built to handle any terrain and keep your feet comfortable all day. The durable sole provides excellent traction, making them the perfect choice for your next adventure.",
        inventory: 3
      },
      {
        name: "ReLeather",
        category: "Shoes",
        brand:"Adidas",
        size:"13",
        price: "135.99",
        image: "shoes4.png",
        description: "Our ReLeather hiking shoes are perfect for any adventure on the trails. With a lightweight and breathable design, your feet will stay cool and comfortable all day long. The sturdy rubber outsole provides superior traction, while the padded collar and cushioned insole ensure a comfortable fit for miles on end.",
        inventory: 50
      },
      {
        name: "Trail Blazer",
        category: "Shoes",
        brand:"Nike",
        size:"9.5",
        price: "89.99",
        image: "shoes5.png",
        description: "Our Trail Blazer hiking shoes are built to take you to new heights. These shoes feature a rugged outsole for maximum traction, allowing you to tackle any terrain with confidence. With a comfortable and supportive fit, you'll be able to explore the great outdoors for hours on end.",
        inventory: 100
      },
      {
        name: "Windsors",
        category: "Shoes",
        brand:"KURU",
        size:"11",
        price: "165.99",
        image: "shoes6.png",
        description: "Our Windsors hiking shoes are perfect for both on and off the trail. These shoes feature a stylish and versatile design, making them a great choice for any adventure. With a comfortable fit and durable construction, you'll be able to explore the great outdoors in style and comfort.",
        inventory: 100
      },
      {
        name: "Trekkors",
        category: "Shoes",
        brand:"Brooks",
        size:"8",
        price: "115.99",
        image: "shoes7.png",
        description: "Our Trekkors hiking shoes are made for the toughest trails. These shoes feature a waterproof and breathable membrane, ensuring your feet stay dry and comfortable no matter the weather. With a durable outsole and supportive midsole, you'll be able to tackle any terrain with ease and comfort.",
        inventory: 100
      },

      //tents
      {
        name: "Syndrome Fullfly",
        category: "Tents",
        brand:"Coleman",
        size:"2-person",
        price: "159.99",
        image: "tent1.png",
        description: "The Syndrome Fullfly tent is the perfect choice for your next camping adventure. With a spacious interior and easy set-up, you'll have a comfortable and hassle-free experience. The waterproof and breathable fabric ensures you stay dry and comfortable, while the sturdy poles and guy lines keep the tent stable in windy conditions.",
        inventory: 200
      },
      {
        name: "Trail 8",
        category: "Tents",
        brand:"Kodiak",
        size:"6-person",
        price: "89.99",
        image: "tent2.png",
        description: "The Trail 8 tent is designed to keep you comfortable and protected during your camping trip. With space to comfortably sleep up to eight people, this tent is perfect for families or groups. The durable and weather-resistant construction ensures your shelter from the elements, while the easy-to-pitch design makes setup a breeze.",
        inventory: 200
      },
      {
        name: "Vivo-sun",
        category: "Tents",
        brand:"Coleman",
        size:"3-person",
        price: "169.99",
        image: "tent3.png",
        description: "Our Vivo-sun tent is perfect for both indoor and outdoor use. With a durable and weather-resistant construction, this tent provides shelter from the elements for any occasion. The easy-to-assemble design makes setup quick and hassle-free, so you can start enjoying your space in no time.",
        inventory: 200
      },
      {
        name: "Klondike",
        category: "Tents",
        brand:"Kodiak",
        size:"4-person",
        price: "119.99",
        image: "tent4.png",
        description: "The Klondike tent is a spacious and comfortable option for your next camping trip. With room for up to eight people, this tent features a screen room for added living space and protection from bugs. The durable construction and waterproof coating ensure that you stay dry and comfortable, no matter the weather.",
        inventory: 200
      },
      {
        name: "Switchback-cross",
        category: "Tents",
        brand:"Quest",
        size:"4-person",
        price: "179.99",
        image: "tent5.png",
        description: "Our Switchback-cross tent is designed to be both lightweight and spacious, making it the perfect choice for backpacking trips. With a unique cross-shaped design, this tent provides ample headroom and living space. The durable and waterproof fabric ensures you stay dry and comfortable, while the easy-to-pitch design makes setup a breeze.",
        inventory: 200
      },
      {
        name: "Switchback Original",
        category: "Tents",
        brand:"Quest",
        size:"8-person",
        price: "149.99",
        image: "tent6.png",
        description: "Our Switchback Original tent is the perfect combination of durability and portability, making it an ideal choice for backpackers and hikers. This tent features a lightweight design and compact storage size, making it easy to transport on long treks. The waterproof and breathable fabric provides protection from the elements, while the easy-to-pitch design allows for quick setup at any campsite.",
        inventory: 200
      },

      //Grills and firepits
      {
        name: "Copper Fire",
        category: "Firepits and Grills",
        brand:"MegaStove",
        size:"Standard",
        price: "149.99",
        image: "firepit1.png",
        description: "Our Copper Fire firepit is the perfect addition to your backyard or camping setup. This firepit features a durable and weather-resistant copper construction, ensuring long-lasting use. The compact and portable design makes it easy to transport, while the built-in fire grate and spark screen provide added safety and convenience.",
        inventory: 200
      },
      {
        name: "Westwood",
        category: "Firepits and Grills",
        brand:"MegaStove",
        size:"Standard",
        price: "289.99",
        image: "firepit2.png",
        description: "The Westwood firepit is the perfect way to enjoy a warm and cozy fire in your backyard or outdoor space. With a stylish and durable design, this firepit is built to last and withstand the elements. The deep bowl and built-in log grate provide ample space for a fire, while the mesh spark screen ensures added safety and protection.",
        inventory: 200
      },
      {
        name: "Brushed Nickle",
        category: "Firepits and Grills",
        brand:"MegaStove",
        size:"Standard",
        price: "229.99",
        image: "firepit3.png",
        description: "Our Brushed Nickle firepit is a sleek and modern addition to any outdoor space. This firepit features a durable and weather-resistant brushed nickel construction, ensuring long-lasting use. The deep bowl and built-in log grate provide ample space for a fire, while the mesh spark screen ensures added safety and protection.",
        inventory: 200
      },
      {
        name: "Portable BBQ",
        category: "Firepits and Grills",
        brand:"MegaStove",
        size:"Standard",
        price: "129.99",
        image: "grill1.png",
        description: "Our Portable BBQ grill is perfect for cooking up a delicious meal on the go. With a compact and lightweight design, this grill is easy to transport to any outdoor location. The durable construction and adjustable cooking grate make it easy to cook up your favorite foods to perfection, while the removable ash pan makes cleanup a breeze.",
        inventory: 200
      },
      {
        name: "Propane Grill Set",
        category: "Firepits and Grills",
        brand:"MegaStove",
        size:"Standard",
        price: "259.99",
        image: "grill2.png",
        description: "Our Propane Grill Set includes everything you need to cook up a delicious meal in your backyard or outdoor space. With a durable and weather-resistant design, this set features a propane grill with adjustable burners and a built-in temperature gauge. The set also includes a grilling spatula, tongs, and fork, ensuring you have all the tools you need for a successful cookout.",
        inventory: 200
      },
      {
        name: "Glamping Grill",
        category: "Firepits and Grills",
        brand:"MegaStove",
        size:"Standard",
        price: "5429.99",
        image: "grill3.png",
        description: "Our Glamping Grill camping food truck is the perfect solution for a mobile outdoor dining experience. This food truck features a fully-equipped kitchen with a grill, stove, oven, sink, and refrigerator. With a stylish and modern design, the Glamping Grill provides a unique and unforgettable experience for any outdoor event or camping trip.",
        inventory: 200
      },

      //clothing
      {
        name: "Plaid v1",
        category: "Clothing",
        brand:"Northface",
        size:"Large",
        price: "59.99",
        image: "shirt1.png",
        description: "This plaid shirt for sale is a classic and timeless addition to any wardrobe. Made with soft and comfortable materials, this shirt is perfect for any casual occasion. The stylish plaid pattern and versatile color options make it easy to pair with jeans or shorts for a complete look.",
        inventory: 200
      },
      {
        name: "Plaid v2",
        category: "Clothing",
        brand:"Patagonia",
        size:"medium",
        price: "49.99",
        image: "shirt2.png",
        description: "Our plaid shirt is a versatile and classic addition to any wardrobe. With a comfortable and breathable fabric, this shirt is perfect for casual wear or outdoor activities. The timeless plaid pattern and button-up design make it a stylish choice for any occasion.",
        inventory: 200
      },
      {
        name: "Plaid v3",
        category: "Clothing",
        brand:"Patagonia",
        size:"Large",
        price: "69.99",
        image: "shirt3.png",
        description: "This plaid shirt for sale is a classic and versatile addition to your wardrobe. Made from soft and comfortable fabric, this shirt features a timeless plaid pattern that is perfect for any casual occasion. With a button-front design and chest pockets, this shirt is both stylish and functional.",
        inventory: 200
      },
      {
        name: "Insulated Jacket",
        category: "Clothing",
        brand:"Patagonia",
        size:"Large",
        price: "119.99",
        image: "jacket1.png",
        description: "This Insulated Jacket for sale is designed to keep you warm and comfortable in cold weather. With a durable and water-resistant outer shell, this jacket features a cozy and breathable insulation layer that traps body heat for added warmth. The adjustable hood and cuffs provide added protection from the elements, while the multiple pockets offer convenient storage for your essentials.",
        inventory: 200
      },
      {
        name: "Camping Jackets",
        category: "Clothing",
        brand:"Patagonia",
        size:"Large",
        price: "129.99",
        image: "jacket2.png",
        description: "Our selection of camping jackets for sale includes a variety of options to suit any outdoor adventure. From lightweight and packable jackets for backpacking to heavy-duty insulated jackets for extreme weather, we have something for every type of camper. Our jackets feature durable and weather-resistant fabrics, adjustable hoods and cuffs, and multiple pockets for storage, ensuring you stay warm, dry, and comfortable on your next camping trip.",
        inventory: 200
      },
      {
        name: "Outdoor Light Jacket",
        category: "Clothing",
        brand:"Northface",
        size:"Small",
        price: "89.99",
        image: "jacket3.png",
        description: "Our outdoor light jacket for sale is the perfect choice for mild weather and outdoor activities. With a lightweight and breathable design, this jacket is made from durable and weather-resistant fabric, ensuring long-lasting use. The adjustable hood and cuffs provide added protection from the elements, while the multiple pockets offer convenient storage for your essentials.",
        inventory: 200
      },
      //skis

      {
        name: "Nordica Ski Boots",
        category: "Skis",
        brand:"The Ascent",
        size:"Medium",
        price: "329.99",
        image: "skiBoots1.png",
        description: "Introducing a pair of high-quality ski boots designed for both intermediate and advanced skiers. These boots feature a stiff flex and a narrow last, providing excellent precision and control on the slopes. The customizable liner ensures a comfortable fit for all-day skiing adventures.",
        inventory: 200
      },
      {
        name: "Cruise Ski Boots",
        category: "Skis",
        brand:"Nordica",
        size:"Medium",
        price: "429.99",
        image: "skiboots2.png",
        description: "These ski boots are designed for advanced skiers looking for precise control and maximum performance on the slopes. They feature a stiff flex rating and a narrow last width for optimal power transfer, as well as a heat-moldable liner for a custom fit. The buckles are micro-adjustable to ensure a secure and comfortable fit, and the boots are compatible with both alpine and touring bindings.",
        inventory: 200
      },
      {
        name: "Kore 93",
        category: "Skis",
        brand:"The Ascent",
        size:"Any",
        price: "629.99",
        image: "skis1.png",
        description: "These skis are built for intermediate to advanced skiers who want versatility and ease of use on the mountain. They have a medium width underfoot for a balanced blend of stability and agility, and a rocker-camber-rocker profile that enhances turn initiation and provides smooth edge-to-edge transitions. The skis are constructed with a lightweight wood core and reinforced with fiberglass for durability and responsiveness, making them suitable for all-mountain skiing.",
        inventory: 200
      },
      {
        name: "Slender Atomic Skis",
        category: "Skis",
        brand:"Nordica",
        size:"Any",
        price: "529.99",
        image: "skis2.png",
        description: "These skis are built for intermediate to advanced skiers looking for a versatile all-mountain experience. They have a medium width waist and moderate rocker for easy turn initiation and stability at high speeds, while the camber underfoot provides edge hold and pop. The wood core is reinforced with carbon fiber and fiberglass for a lively and responsive feel, and the top sheet features a stylish design that looks great on the mountain.",
        inventory: 200
      },

      //snowboards
      {
        name: "Downslider",
        category: "Snowboards",
        brand:"BURTON",
        size:"Any",
        price: "335.99",
        image: "snowboard1.png",
        description: "This snowboard is perfect for intermediate to advanced riders looking for a versatile all-mountain board. It features a medium flex rating and a directional twin shape with a setback stance, providing a balance between freestyle and freeride performance. The camber underfoot and rocker in the tip and tail provide a stable and playful ride, while the sintered base ensures optimal speed and durability. The board's graphics are eye-catching and unique, making it stand out on the mountain.",
        inventory: 200
      },
      {
        name: "Ripcord",
        category: "Snowboards",
        brand:"BURTON",
        size:"Any",
        price: "479.99",
        image: "snowboard2.png",
        description: "These snowboards are perfect for intermediate to advanced riders who want a versatile and responsive board for all-mountain riding. They have a medium flex rating and a directional shape with a setback stance for improved float in powder and stability at high speeds. The base is made of durable sintered material for maximum speed and long-lasting performance, while the top sheet features eye-catching graphics that look great on the slopes. The boards come in a variety of sizes to accommodate different rider heights and weights.",
        inventory: 200
      },
      {
        name: "Pulse X",
        category: "Snowboards",
        brand:"BURTON",
        size:"Any",
        price: "355.99",
        image: "snowboard3.png",
        description: "These snowboards are designed for intermediate to advanced riders who want a high-performance experience on the mountain. They have a medium flex and a hybrid camber profile, which combines camber underfoot with rocker in the tip and tail for a responsive and forgiving ride. The wood core is reinforced with carbon fiber and Kevlar for strength and pop, and the base is made of high-quality sintered material for speed and durability. The graphics are eye-catching and stylish, making these boards stand out on the slopes.",
        inventory: 200
      },
      {
        name: "Judge 54",
        category: "Snowboards",
        brand:"BURTON",
        size:"Any",
        price: "175.99",
        image: "snowboardboots1.png",
        description: "These snowboard boots are designed for intermediate to advanced riders who want a comfortable and responsive boot for all-mountain riding. They have a medium flex rating and a heat-moldable liner for a custom fit, as well as a dual-zone BOA lacing system for easy and precise adjustments on the go. The outsole is made of durable rubber for good grip on snow and ice, while the inner sole features shock-absorbing materials for a smoother ride. The boots are compatible with most snowboard bindings and come in a variety of sizes to fit different foot shapes.",
        inventory: 200
      }




    ]
    const items = await Promise.all(itemsToCreate.map(adminCreateItem))

    console.log("items created:")
    // console.log(items)

    console.log("Finished creating items!")
  } catch (error) {
    console.error("Error creating items!")
    throw error
  }
}

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
