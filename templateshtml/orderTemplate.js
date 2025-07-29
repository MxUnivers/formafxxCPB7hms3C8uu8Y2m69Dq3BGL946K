const ApplicationInfo = require("../utils/dataApi");

const htmlContentForAcceptedOrder = (order) => {
    const { requestedTroc, itemsToExchange, user, client } = order;

    return `<!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Commande Acceptée</title>
    </head>
    <body style="width: 100%; font-family: Arial, sans-serif; background-color: #f9f9f9; color: #333; display: flex; justify-content: center; align-items: center; height: auto; margin: 0;">
        <div style="width: 90%; max-width: 600px; text-align: center; border: 1px solid #ccc; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); position: relative;">
            <!-- En-tête avec logo -->
            <header>
                <img src="${ApplicationInfo.logoWebSite}" alt="Logo de Joycetroc" style="max-width: 200px; margin-bottom: 20px;">
            </header>

            <!-- Contenu principal -->
            <main>
                <h1 style="font-size: 1.5em; margin: 10px 0; color: #3629B7;">Votre troc a été acceptée !</h1>
                <p style="font-size: 1em; margin: 10px 0;">Félicitations ! Votre demande de troc a été acceptée.</p>

                <!-- Détails de la commande -->
                <div style="margin: 20px 0; text-align: left; background-color: #f4f4f4; padding: 15px; border-radius: 8px;">
                    <p><strong>Troc demandé :</strong> ${requestedTroc.title}</p>
                    <p><strong>Trocs proposés :</strong></p>
                    <ul>
                        ${itemsToExchange.map(item => `<li>${item.troc.title} (Quantité : x${item.quantity})</li>`).join('')}
                    </ul>
                </div>

                <!-- Image du troc demandé -->
                ${requestedTroc.images && requestedTroc.images.length > 0 ? 
                    `<img src="${requestedTroc.images[0]}" alt="Troc demandé" style="max-width: 100%; height: auto; border-radius: 8px; margin-top: 20px;">` : ''}

                <!-- Message final -->
                <p style="font-size: 1em; margin: 10px 0;">Merci d'avoir utilisé notre plateforme. Nous vous tiendrons au courant des prochaines étapes.</p>
            </main>

            <!-- Pied de page -->
            <footer style="position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%); font-size: 0.8em; color: #666;">
                <p>L'équipe de ${ApplicationInfo.name} vous remercie</p>
                <p><a href="mailto:${ApplicationInfo.emailApplication}" style="color:#3629B7;">${ApplicationInfo.emailApplication}</a></p>
            </footer>
        </div>
    </body>
    </html>`;
};




const htmlContentForRejectedOrder = (order) => {
    const { requestedTroc, itemsToExchange, user, client } = order;

    return `<!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Commande Rejetée</title>
    </head>
    <body style="width: 100%; font-family: Arial, sans-serif; background-color: #f9f9f9; color: #333; display: flex; justify-content: center; align-items: center; height: auto; margin: 0;">
        <div style="width: 90%; max-width: 600px; text-align: center; border: 1px solid #ccc; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); position: relative;">
            <!-- En-tête avec logo -->
            <header>
                <img src="${ApplicationInfo.logoWebSite}" alt="Logo de Joycetroc" style="max-width: 200px; margin-bottom: 20px;">
            </header>

            <!-- Contenu principal -->
            <main>
                <h1 style="font-size: 1.5em; margin: 10px 0; color: #e74c3c;">Votre troc a été rejetée</h1>
                <p style="font-size: 1em; margin: 10px 0;">Malheureusement, votre demande de troc n'a pas été acceptée.</p>

                <!-- Détails de la commande -->
                <div style="margin: 20px 0; text-align: left; background-color: #f4f4f4; padding: 15px; border-radius: 8px;">
                    <p><strong>Troc demandé :</strong> ${requestedTroc.title}</p>
                    <p><strong>Trocs proposés :</strong></p>
                    <ul>
                        ${itemsToExchange.map(item => `<li>${item.troc.title} (Quantité : x${item.quantity})</li>`).join('')}
                    </ul>
                </div>

                <!-- Message final -->
                <p style="font-size: 1em; margin: 10px 0;">Nous vous remercions d'avoir essayé. N'hésitez pas à soumettre une nouvelle demande.</p>
            </main>

            <!-- Pied de page -->
            <footer style="position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%); font-size: 0.8em; color: #666;">
                <p>L'équipe de Joycetroc vous remercie</p>
                <p><a href="mailto:${ApplicationInfo.emailApplication}" style="color:#3629B7;">${ApplicationInfo.emailApplication}</a></p>
            </footer>
        </div>
    </body>
    </html>`;
};


module.exports = {htmlContentForAcceptedOrder, htmlContentForRejectedOrder};
