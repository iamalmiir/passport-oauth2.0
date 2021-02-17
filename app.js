require("dotenv").config({ path: "./config/.env" });
const express = require("express");
const session = require("express-session");
const ejs = require("ejs");
const mongoose = require("mongoose");
const passport = require("passport");
const MongoStore = require("connect-mongo")(session);
const connectDB = require("./config/db");
require("./config/passport")(passport);
const app = express();

connectDB();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/", require("./routes/index"));
app.use("/", require("./routes/local-auth"));

const PORT = process.env.PORT;
app.listen(PORT, console.log(`Servers is runing on: ${PORT}`));
