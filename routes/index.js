const express = require("express");
const router = express.Router();
const PDFController = require('../controller/facController')
const generatePdf = require("../controller/generatePdf");

router.get('/b', (req, res) => {
  res.render('home')
});

// Home Page
router.get("/", (_, res) => {
  res.sendFile("index.html");
});

// Download PDF Route
router.get("/generate-pdf", async (req, res) => {
  let result = await generatePdf(req.query.url);
  res.attachment(`node-express-puppeteer-pdf-example.pdf`);
  res.contentType("application/pdf");
  res.send(result);
});

// Catch All
//router.get("*", (req, res) => {
  //res.redirect("/");
//});



// Rutas para las facturas
router.get('/factura', PDFController.factura);
router.get('/descargar', PDFController.descargar);

module.exports = router;
