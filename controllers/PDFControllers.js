const puppeteer = require('puppeteer');

async function crearFactura(url) {

    try {

        // Abrir el navegador
        let browser = await puppeteer.launch({
            //executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
            ignoreDefaultArgs: ['--disable-extensions'],
            headless: true,
            devtools: true,
            args: [
                "--disable-gpu",
                "--disable-dev-shm-usage",
                "--disable-setuid-sandbox",
                "--no-sandbox",
            ]  
        });

        let page = await browser.newPage();

        await page.setExtraHTTPHeaders({
            'cookie':'token=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZGlhekBzZWFyY2hyZWJlbC5jb20iLCJleHAiOjE2MzA2ODYxNjIsImlhdCI6MTYzMDY0Mjk2Mn0.-b8ThEpk2wEUMbwZs37qtzb4Rn1WCqkA0vdW38HzonF0Olgg-PAJFFHL0ZaLfdG9hKL_zZgBAnA42fCcfUXfhw',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36',
            'upgrade-insecure-requests': '1',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-US,en;q=0.9,en;q=0.8',
        
        })

        await page.setRequestInterception(true);

        page.on('request', req => {
            console.log(req.headers());
            // Do nothing in case of non-navigation requests.
            if (!req.isNavigationRequest()) {
                req.continue();
                return;
            }
            // Add a new header for navigation request.
            const headers = req.headers();
            headers['X-Just-Must-Be-Request-In-Main-Request'] = 1;
            req.continue({ headers });
        });

        await page.goto(url, {
            waitUntil: 'load',
            timeout: 0
        })
        
        await page.type('input[name=input-email]', "adiaz@searchrebel.com");
        await page.type('input[name=input-password]', "limite123")
        await Promise.all([
            page.click('button[name=button-login]'),
            page.waitForNavigation({ waitUntil: 'networkidle0' }),
        ]);

        await page.goto(url, {
            waitUntil: 'load',
            timeout: 0
        })

        // Vamos a crear nuestro PDF
        let pdf = await page.pdf({
            format: 'A4',
            margin: {
                top: '20px',
                right: '40px',
                bottom: '20px',
                left: '0px'
            }
        })


        // Cerrar el navegador
        browser.close();

        return pdf;
    } catch (e) {
        console.log(e, ' F')
    }
}

module.exports = {

    factura(req, res) {
        res.render('pdfs/factura', { layout: "pdf" });
    },

    async descargar(req, res) {

        let pdf = await crearFactura('https://app.marketreadyindex.io/company-report-pdf?company=456da684-94e8-4d78-8265-fe4244fd1c90');

        // Devolver el response como PDF
        res.contentType('application/pdf');
        res.send(pdf);
    }

}