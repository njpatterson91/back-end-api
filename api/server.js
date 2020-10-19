const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express();
const usersRouter = require("../users/usersRouter.js");
const authRouter = require("../auth/authRouter.js");

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/users", usersRouter);
server.use("/api/auth", authRouter);

server.get("/", (req, res) => {
    res.json({endpoints: "are up and running"});
})

module.exports = server;
