const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000

// Handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Rutas
app.use('/', require('./routes'));

async function main() {
  await app.listen(port);
  console.log(`app listening at http://localhost:${port}`)
}

main();

//app.listen(3000, () => {
  //console.log(`Example app listening at http://localhost:${port}`)
//})