const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authenticate = require('../auth/protected-mw.js');
const server = express();
const usersRouter = require("../users/usersRouter.js");
const authRouter = require("../auth/authRouter.js");
const potluckRouter = require("../potlucks/potluckRouter.js");

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/users", authenticate, usersRouter);
server.use("/api/auth", authRouter);
server.use("/api/potlucks", potluckRouter);

server.get("/", (req, res) => {
    res.json({endpoints: "are up and running"});
})

module.exports = server;
