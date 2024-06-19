const express = require("express");
const http = require("http");
const cors = require("cors");
const ConnectDB = require("./Database/Utils");
const userController = require("./Controllers/userController");
const messageController = require("./Controllers/messageController");

const app = express();
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const jwt = require("jsonwebtoken");
ConnectDB();
const allowedOrigins = ["http://localhost:5173", "http://192.168.1.7:5173"];
app.use(express.json());
app.use(cors({ origin: allowedOrigins }));

let onlineUsers = [];

io.on("connection", (socket) => {
  console.log("a user connected:", socket.id);

  socket.on("user joined", (name) => {
    onlineUsers.push({ id: socket.id, name });
    io.emit("online users", onlineUsers); // Notify all clients of the updated user list
    io.emit("notification", `${name} has joined the global channel.`);
  });

  socket.on("chat message", async (msg) => {
    // Here you might want to save the message to your database
    console.log("doso do ovdje");
    // await messageController.createGlobalMessage(msg);
    io.emit("chat message", msg);
    console.log("Emitting"); // Broadcast the message to all clients
  });

  socket.on("disconnect", () => {
    console.log("user disconnected:", socket.id);
    onlineUsers = onlineUsers.filter((user) => user.id !== socket.id);
    io.emit("online users", onlineUsers); // Notify all clients of the updated user list
  });
});

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  const token = authHeader;

  if (!token) {
    return res.status(401).send("Unauthorized: No token provided");
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send("Forbidden: Invalid token");
    }
    req.body.userId = decoded.userID;
    // Attach userID to request object
    next();
  });
};

app.post("/api/login", async (req, res) => {
  await userController.userLogin(req, res);
});

app.get("/api/generateUser", async (req, res) => {
  await userController.generateAndLoginUser(req, res);
});

app.post("/api/messages/global", verifyToken, async (req, res) => {
  // Get userID from request object
  await messageController.createGlobalMessage(req, res);
});

app.get("/api/messages/global", verifyToken, async (req, res) => {
  await messageController.getGlobalMessages(req, res);
});

// io.on("connection", (socket) => {
//   console.log("a user connected");
//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//   });
// });

server.listen("7000", () => {
  console.log(`Server is up and running on port 7000`);
});
