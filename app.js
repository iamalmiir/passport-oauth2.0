require("dotenv").config({ path: "./config/.env" });
const fs = require("fs");
const https = require("https");
const cert = fs.readFileSync(process.env.SSL_CRT_FILE);
var key = fs.readFileSync(process.env.SSL_KEY_FILE);
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const ejs = require("ejs");
const passport = require("passport");
const MongoStore = require("connect-mongo")(session);
const connectDB = require("./config/db");
require("./config/passport-fb")(passport);
require("./config/passport-github")(passport);
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
var options = { key: key, cert: cert };
const server = https.createServer(options, app);
server.listen(PORT, console.log(`Servers is runing on: ${PORT}`));
