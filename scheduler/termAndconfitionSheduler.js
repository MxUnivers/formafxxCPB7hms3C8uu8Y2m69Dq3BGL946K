const cron = require('node-cron');
const User = require('../models/UserModel'); // Modèle utilisateur
const TermsAndConditions = require('../models/TermsAndConditionModel'); // Modèle des termes et conditions
const termsAndConditionsData = require('../templateshtml/termsAndConditionsData');


cron.schedule('* * * * *', async () => {

    // Fonction principale pour vérifier et créer les termes et conditions
    const createDefaultTermsAndConditions = async () => {
        try {
            // Étape 1 : Récupérer tous les utilisateurs
            const users = await User.find({}).populate("codePostal");
            console.log(`Nombre total d'utilisateurs trouvés : ${users.length}`);

            // Étape 2 : Traiter chaque utilisateur
            for (const user of users) {
                // Vérifier si l'utilisateur a déjà des termes et conditions
                const existingTerms = await TermsAndConditions.findOne({ userAdd: user._id });

                if (!existingTerms) {
                    console.log(`Aucun terme et condition trouvé pour l'utilisateur : ${user._id}`);

                    // Étape 3 : Préparer les données par défaut
                    const termsData = {
                        ...termsAndConditionsData,
                        userAdd: user?._id, // Associer les termes à l'utilisateur
                        agencyName: user?.companyName || user?.firstname || termsAndConditionsData.agencyName,
                        agencyContact: user?.phone || termsAndConditionsData.agencyContact,
                    };

                    // Étape 4 : Créer et sauvegarder les termes et conditions
                    const newTerms = new TermsAndConditions(termsData);
                    await newTerms.save();

                    console.log(`Termes et conditions créés pour l'utilisateur : ${user.firstname + " " + user.lastname}`);
                } else {
                    console.log(`L'utilisateur ${user._id} a déjà des termes et conditions.`);
                }
            }

            console.log('Vérification et création des termes et conditions terminées.');
        } catch (error) {
            console.error('Erreur lors du traitement des termes et conditions :', error);
        }
    };

    // Lancer la fonction
    await createDefaultTermsAndConditions();
})