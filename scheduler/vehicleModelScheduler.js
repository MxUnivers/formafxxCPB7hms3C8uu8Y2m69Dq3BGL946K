const cron = require('node-cron');
const Vehicle = require('../models/VehicleModel'); // Modèle Vehicle
const VehicleModelSelect = require('../models/VehicleSelectModel');

// Tâche planifiée pour synchroniser les modèles de véhicules
cron.schedule('* * * * *', async () => {
  try {
    console.log("Démarrage de la synchronisation des modèles de véhicules...");

    // Étape 1 : Récupérer tous les modèles uniques depuis le modèle Vehicle
    const vehicles = await Vehicle.find({}, { model: 1 }).distinct('model'); // Liste des modèles uniques

    if (!vehicles || vehicles.length === 0) {
      console.log("Aucun modèle de véhicule trouvé dans la base de données.");
      return;
    }

    console.log(`Modèles trouvés dans Vehicle : ${vehicles.join(', ')}`);

    // Étape 2 : Parcourir chaque modèle et vérifier s'il existe dans VehicleModelSelect
    for (let modelName of vehicles) {
      if (!modelName) continue; // Ignorer les valeurs nulles ou vides

      // Vérifier si le modèle existe déjà dans VehicleModelSelect
      const existingModel = await VehicleModelSelect.findOne({ name: modelName });

      if (!existingModel) {
        // Créer une nouvelle entrée dans VehicleModelSelect
        const newModel = new VehicleModelSelect({
          name: modelName,
          description: `Modèle ajouté automatiquement : ${modelName}`,
        });

        await newModel.save();
        console.log(`Nouveau modèle ajouté : ${modelName}`);
      } else {
        console.log(`Le modèle "${modelName}" existe déjà dans VehicleModelSelect.`);
      }
    }

    console.log("Synchronisation des modèles terminée avec succès.");
  } catch (error) {
    console.error("Erreur lors de la synchronisation des modèles :", error.message);
  }
});