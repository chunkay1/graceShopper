
//we could use the fancier "pool" pg module later on, but this simple setup should work for now

const { Client } = require('pg') // imports the pg module
const client = new Client('postgres://localhost:5500/hikeandseek');

module.exports = client