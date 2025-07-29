const puppeteer = require('puppeteer');

async function scrapeExchangeRates() {
  try {
    // Lancer Puppeteer en mode non headless pour le débogage
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    console.log("Navigating to the website...");
    await page.goto('https://www.xe.com/fr/currencycharts/?from=XOF&to=XAF ', { waitUntil: 'networkidle2', timeout: 60000 });

    console.log("Waiting for currency elements to load...");
    await page.waitForSelector('.sc-aec2dc4f-3', { timeout: 30000 }); // Attendre que les éléments soient chargés

    // Simuler un scroll pour charger tout le contenu (si nécessaire)
    await page.evaluate(() => {
      window.scrollBy(0, document.body.scrollHeight);
    });

    // Ajouter un délai d'attente pour s'assurer que tout est chargé
    console.log("Adding a short delay to ensure all data is loaded...");
    await new Promise(resolve => setTimeout(resolve, 5000)); // Attente de 5 secondes

    console.log("Extracting raw text data...");
    const rawData = await page.evaluate(() => {
      const currencyElements = Array.from(document.querySelectorAll('.sc-aec2dc4f-3'));

      if (currencyElements.length === 0) {
        console.error("No currency elements found!");
        return [];
      }

      return currencyElements.map((element) => {
        const textContent = element.textContent.trim(); // Récupérer tout le texte brut
        return { textContent };
      });
    });

    console.log("Closing browser...");
    await browser.close();

    // Parser les données brutes
    console.log("Parsing raw data...");
    const parsedData = rawData.map(({ textContent }) => {
      // Extraire le nom de la devise
      const nameMatch = textContent.match(/^(.*?)\s+1 XOF vaut/);
      const name = nameMatch ? nameMatch[1].trim() : null;

      // Extraire le taux de change
      const rateMatch = textContent.match(/(\d+,\d+)\s+([A-Z]{3})/);
      const rate = rateMatch ? parseFloat(rateMatch[1].replace(',', '.')) : null;
      const currencyCode = rateMatch ? rateMatch[2] : null;

      return { name, currencyCode, rate };
    }).filter(({ name, rate }) => name && rate); // Filtrer les entrées invalides

    // Afficher les données parsées dans un tableau
    console.table(parsedData);
    // console.log(parsedData);
    return parsedData;
  } catch (error) {
    console.error('Erreur lors du scraping :', error.message);
    return null;
  }
}

// Appeler la fonction
scrapeExchangeRates();

module.exports = scrapeExchangeRates;