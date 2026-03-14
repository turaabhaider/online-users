const express = require("express")
const http = require("http")
const { Server } = require("socket.io")
const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.use(express.static("public"))

let onlineUsers = 0

io.on("connection", (socket) => {

  onlineUsers++

  io.emit("usersOnline", onlineUsers)

  console.log("User connected")
  console.log("Online:", onlineUsers)

  socket.on("disconnect", () => {

    onlineUsers--

    io.emit("usersOnline", onlineUsers)

    console.log("User disconnected")
    console.log("Online:", onlineUsers)

  })

})

const PORT = 3000

server.listen(PORT, () => {
  console.log("Server running on port", PORT)
})