const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const { db } = require("./db_connection");
const app = express();
app.use(express.urlencoded(true));
const diaryRouter = require("./Routes/Diary");
const signUpRouter = require("./Routes/SignUpRoutes");
const loginRouter = require("./Routes/LoginRoute");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(bodyParser.json());
app.use(express.json());
app.use("/api/diary", diaryRouter);
app.use("/api/signup", signUpRouter);
app.use("/api/login", loginRouter);
app.listen(9000, () => {
  console.log("Server is running on port 3000");
});
