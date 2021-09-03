const express = require("express");

const exphbs = require('express-handlebars')

const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
// Rutas
//app.use('/b', require('./routes/fatcrout'));

module.exports = app;
