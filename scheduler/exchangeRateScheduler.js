const cron = require('node-cron');
const exchangeRateController = require('../controllers/exchangeRateController');
const scrapeExchangeRates = require('../utils/scrappingweb');


// Tâche automatique pour mettre à jour les taux toutes les heures
cron.schedule('0 0 * * *', async () => {
    console.log('Mise à jour automatique des taux de change...');
    // scrapeExchangeRates()
    await exchangeRateController.updateExchangeRateCron();
});