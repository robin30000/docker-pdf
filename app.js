const express = require("express");
const app = express();
const path = require("path");

const exphbs = require('express-handlebars')
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "views")));

app.use("/", indexRouter);
// Rutas
//app.use('/b', require('./routes/fatcrout'));

module.exports = app;
