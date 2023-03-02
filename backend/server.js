const http = require("http")
const app = require("./app")

const PORT = process.env.PORT || 5500
const server = http.createServer(app)

server.listen(PORT, () => {
  console.log(
    "Server is listening on PORT:",
    PORT,
    "Ready for hike and seek"
  )
})