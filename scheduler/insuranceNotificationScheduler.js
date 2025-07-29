const cron = require('node-cron');
const moment = require('moment');
const Insurance = require('../models/InsuranceModel');
const Notification = require('../models/NotificationModel');
const User = require('../models/UserModel');
const ApplicationInfo = require('../utils/dataApi');
const InsuranceType = require('../models/InsuranceModel').InsuranceType;

// Tâche planifiée pour les notifications d'assurance
cron.schedule('0 0 * * *', async () => { // S'exécute une fois par jour à minuit
  try {
    const currentDate = moment().startOf('day'); // Date actuelle au début de la journée

    // Récupérer toutes les assurances actives dont la date de fin est dans 7 jours ou dans 2 jours
    const expiringInsurances = await Insurance.find({
      status: 'Active',
      endDate: {
        $gte: currentDate.toDate(), // Assurance encore active
        $lte: moment(currentDate).add(7, 'days').endOf('day').toDate() // Dans les 7 prochains jours
      }
    }).populate('vehicle').populate('property').populate('type'); // Peupler le type d'assurance

    // Pour chaque assurance, vérifier si l'expiration est proche (dans 7 jours ou dans 2 jours)
    for (let insurance of expiringInsurances) {
      const daysUntilExpiration = moment(insurance.endDate).diff(currentDate, 'days');
      const insuranceTypeName = insurance.type ? insurance.type.name : 'Assurance'; // Nom du type d'assurance
      const insuredObjectName = insurance.vehicle ? insurance.vehicle.brand : insurance.property ? insurance.property.name : 'Patrimoine';
      const insuredObjectAddress = insurance.vehicle ? insurance.vehicle.address : insurance.property ? insurance.property.address : '';

      // Créer un message de notification avec le type d'assurance et les informations sur l'objet assuré
      const message = `Rappel : Votre ${insuranceTypeName} pour ${insuredObjectName} ${insuredObjectAddress ? `(${insuredObjectAddress})` : ''} expire dans ${daysUntilExpiration} jours. Veuillez renouveler votre assurance.`;

      // Créer une notification pour l'utilisateur propriétaire de l'assurance
      await createInsuranceNotification(insurance, insurance.userId, message);
    }

    console.log('Tâche planifiée des notifications d\'assurance exécutée avec succès.');
  } catch (error) {
    console.error('Erreur lors de la génération des notifications d\'assurance:', error.message);
  }
});

// Fonction utilitaire pour créer une notification d'assurance
const createInsuranceNotification = async (insurance, userId, message) => {
  const existingNotification = await Notification.findOne({
    type: 'INSURANCE',
    message,
    user: userId,
    createdAt: {
      $gte: moment().subtract(7, 'days').toDate() // Vérifie si une notification similaire existe déjà
    }
  });

  if (!existingNotification) {
    const notification = new Notification({
      type: 'INSURANCE',
      insurance: insurance._id,
      user: userId,
      message
    });
    await notification.save();
    console.log(`Notification créée pour l'utilisateur ${userId} concernant l'expiration de l'assurance.`);

    const user = await User.findById(userId);
    if (user) {
      const messageContent = htmlContentNotification(
        `Rappel ${entity.constructor.modelName.toUpperCase()} Rezaplus`, image, message
      );
      sendEmail(ApplicationInfo.emailApplication, ApplicationInfo.passwordEmail, user.email, `${ApplicationInfo.name}: Rappel ${entity.constructor.modelName.toUpperCase()} `, message);
    }
  }
};
