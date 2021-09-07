const puppeteer = require("puppeteer");


const generatePdf = async (url) => {

    try {

        let browser = await puppeteer.launch({
            ignoreDefaultArgs: ['--disable-extensions'],
            headless: true,
            args: [
                "--disable-gpu",
                "--disable-dev-shm-usage",
                "--disable-setuid-sandbox",
                "--no-sandbox"
            ]
        });

        let page = await browser.newPage();


        const headers = {
            "cookie": "token=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZGlhekBzZWFyY2hyZWJlbC5jb20iLCJleHAiOjE2MzEwODYyNjEsImlhdCI6MTYzMTA0MzA2MX0._Pnk6NWsXMVj1FKQKY9N10ejMDDT9rhXO7foZhbp4xttr2hdXs9jW6MbfeYZ-DCLtAqV85mHoqntk9j6ghWXnQ"
        };

        await page.setRequestInterception(true);

        page.on('request', req => {
            //console.log(req.headers());
            // Do nothing in case of non-navigation requests.
            if (!req.isNavigationRequest()) {
                req.continue();
                return;
            }
            // Add a new header for navigation request.
            const headers = req.headers();
            headers['X-Just-Must-Be-Request-In-Main-Request'] = 1;
            req.continue({headers});
        });
        await page.setExtraHTTPHeaders(headers);

        await page.goto(url, {
            waitUntil: 'load',
            timeout: 0
        })

        /*await page.type('input[name=input-email]', "adiaz@searchrebel.com");
        await page.type('input[name=input-password]', "limite123")
        await Promise.all([
            page.click('button[name=button-login]'),
            page.waitForNavigation({ waitUntil: 'networkidle0' }),
        ]);*/

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
};

module.exports = generatePdf;

//url = "https://app.marketreadyindex.io/company-report-pdf?company=456da684-94e8-4d78-8265-fe4244fd1c90"

