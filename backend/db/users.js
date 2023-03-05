const client = require('./client');
const SALT_COUNT = 10;
const bcrypt = require('bcrypt');

async function createUser({ username, password,email,address }) {
  
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

  try{

   const { rows: [user] } = await client.query(`
    INSERT INTO users(username,password,email,address)
    VALUES($1,$2,$3,$4)
    ON CONFLICT (username) DO NOTHING
    RETURNING *;
    `,[username,hashedPassword,email,address]);
    return user;

  }catch(error){
    console.error(error,"error creating user");
    throw error;
  }
}

async function getUserByUsername(userName) {

    try {
    const {rows} = await client.query(`
      SELECT *
      FROM users
      WHERE username = $1;
    `, [userName]);

    if (!rows || !rows.length) return null;
   
    const [user] = rows;

    return user;
  } catch (error) {
    console.error(error,"error getting user by username");
    throw error;
  }
}


async function getUser({ username, password }) {
  if (!username || !password){
    return;
  }

  try{

    const user = await getUserByUsername(username);

    if(!user) return;

    const hashedPassword = user.password;
    const passwordMatch = await bcrypt.compare(password, hashedPassword);

    if(!passwordMatch) return;

    delete user.password;

    return user;

  }catch (error){
    console.error(error,"error getting user");
    throw error;
  }

}

async function getUserById(userId) {

  try {
    const { rows: [user] } = await client.query(`
      SELECT * FROM users
      WHERE id = $1;
      `,[userId]);

    if (!user) return null;
    delete user.password;
    
    return user;

  } catch (error) {
    console.error(error,"error getting user by id");
    throw error;
  }

}

async function getAllUsers () {

  try{
    const {rows: users} = await client.query(`
      SELECT * FROM users;
    `)

    return users

  } catch (error) {
    console.error(error,"error getting users");
    throw error;
  }
}

module.exports = {
  createUser,
  getUserByUsername,
  getUser,
  getUserById,
  getAllUsers
}
