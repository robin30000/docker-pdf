const express = require("express")
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended: false}));

const router = express.Router();
const generatePdf = require('../controller/pdfController')

router.get('/', (req, res) => {
    res.render('index')
});

// Download PDF Route
router.post("/descargar", async (req, res) => {
    let url = req.body.url;
    let result = await generatePdf(url);
    res.contentType("application/pdf");
    res.send(result);
});


module.exports = router;
