const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./db/db");
const Role = require("./routes/role");
const User = require("./routes/user");
const Board = require("./routes/board");
require("dotenv").config();

const call = express();

call.use(express.json());
call.use(cors());
call.use("/api/role", Role);
call.use("/api/user", User);
call.use("/api/board", Board);
call.use("/uploads", express.static("uploads")); //con esto volvemos la imagenes publicas para que se puedan ver desde los navegadores

call.listen(process.env.PORT, () =>
  console.log("Backend server running on port: " + process.env.PORT)
);

dbConnection();
