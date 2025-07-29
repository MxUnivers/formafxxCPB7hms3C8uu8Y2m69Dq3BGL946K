const cron = require('node-cron');
const moment = require('moment');
const Reservation = require('../models/ReservationModel');
const Vehicle = require('../models/VehicleBrandModel');
const Property = require('../models/PropertyModel');
const Maintenance = require('../models/MaintenanceModel');
const Notification = require('../models/NotificationModel');
const sendEmail = require('../utils/sendEmail');
const User = require('../models/UserModel');
const Customer = require('../models/CustomerModel');
const ApplicationInfo = require('../utils/dataApi');
const { htmlContentNotification, htmlContentNotificationForPendingReservations } = require('../templateshtml/notificationTemplate');
const CreditCard = require('../models/CreditCardModel');

// Tâche planifiée pour les notifications
cron.schedule('* * * * *', async () => { // S'exécute une fois par jour à minuit
  try {
    const currentDate = moment().startOf('day'); // Date actuelle au début de la journée

    // Récupérer tous les véhicules et propriétés avec un schedule de maintenance
    const vehicles = await Vehicle.find({ access: true, maintenanceshedule: { $in: ['Hebdomadaire', 'Mensuelle', 'Trimestrielle'] } });
    const properties = await Property.find({ access: true, maintenanceshedule: { $in: ['Hebdomadaire', 'Mensuelle', 'Trimestrielle'] } });

    // Rappels de maintenance pour les véhicules
    for (let vehicle of vehicles) {
      let message; // Declare a variable to hold the message
      if (vehicle.maintenanceshedule === 'Hebdomadaire' && moment(vehicle.updatedAt).isBefore(currentDate.clone().subtract(7, 'days'))) {
        message = `Rappel : Le véhicule ${vehicle.brand} nécessite une maintenance hebdomadaire.`;
        await createNotification(vehicle, vehicle.addBy, message, vehicle && vehicle.images && vehicle.images.length > 0 ? vehicle.images : ApplicationInfo.logoWebSite);
      }
      if (vehicle.maintenanceshedule === 'Mensuelle' && moment(vehicle.updatedAt).isBefore(currentDate.clone().subtract(1, 'month'))) {
        message = `Rappel : Le véhicule ${vehicle.brand} nécessite une maintenance mensuelle.`;
        await createNotification(vehicle, vehicle.addBy, message, vehicle && vehicle.images && vehicle.images.length > 0 ? vehicle.images : ApplicationInfo.logoWebSite);
      }
      if (vehicle.maintenanceshedule === 'Trimestrielle' && moment(vehicle.updatedAt).isBefore(currentDate.clone().subtract(3, 'months'))) {
        message = `Rappel : Le véhicule ${vehicle.brand} nécessite une maintenance trimestrielle.`;
        await createNotification(vehicle, vehicle.addBy, message, vehicle && vehicle.images && vehicle.images.length > 0 ? vehicle.images : ApplicationInfo.logoWebSite);
      }
    }

    // Rappels de maintenance pour les propriétés
    for (let property of properties) {
      let message; // Declare a variable to hold the message
      if (property.maintenanceshedule === 'Hebdomadaire' && moment(property.updatedAt).isBefore(currentDate.clone().subtract(7, 'days'))) {
        message = `Rappel : La propriété ${property.name} nécessite une maintenance hebdomadaire.`;
        await createNotification(property, property.addBy, message, property && property.length > 0 ? property.images[0] : ApplicationInfo.logoWebSite);
      }
      if (property.maintenanceshedule === 'Mensuelle' && moment(property.updatedAt).isBefore(currentDate.clone().subtract(1, 'month'))) {
        message = `Rappel : La propriété ${property.name} nécessite une maintenance mensuelle.`;
        await createNotification(property, property.addBy, message, property && property.length > 0 ? property.images[0] : ApplicationInfo.logoWebSite);
      }
      if (property.maintenanceshedule === 'Trimestrielle' && moment(property.updatedAt).isBefore(currentDate.clone().subtract(3, 'months'))) {
        message = `Rappel : La propriété ${property.name} nécessite une maintenance trimestrielle.`;
        await createNotification(property, property.addBy, message, property && property.length > 0 ? property.images[0] : ApplicationInfo.logoWebSite);
      }
    }

    // Rappels de réservation - 2 jours avant le début
    const upcomingReservations = await Reservation.find({
      access: true,
      status: { $in: ['CONFIRMED', 'IN_PROGRESS'] },
      startDate: {
        $gte: currentDate.clone().add(2, 'days').startOf('day').toDate(),
        $lte: currentDate.clone().add(2, 'days').endOf('day').toDate(),
      }
    }).populate('property').populate('vehicle');

    for (let reservation of upcomingReservations) {
      let message = `Rappel : Votre réservation pour ${reservation.vehicle ? reservation.vehicle.brand : reservation.property.name} commencera dans 2 jours.`;
      await createNotification(reservation, reservation.userAdd, message, reservation.vehicle ? reservation.vehicle.images[0] : reservation.property.images[0]);
      message = `Rappel : Votre réservation commencera bientôt pour ${reservation.vehicle ? reservation.vehicle.brand : reservation.property.name} à l'adresse ${reservation.vehicle ? reservation.pickupLocation : reservation.property.address}  commencera dans 2 jours. `;
      await createNotification(reservation, reservation.client, message, reservation.vehicle ? reservation.vehicle.images[0] : reservation.property.images[0]);
    }

    // Rappels de fin de réservation - 2 jours avant la fin
    const endingReservations = await Reservation.find({
      access: true,
      status: 'CONFIRMED',
      endDate: {
        $gte: currentDate.clone().add(2, 'days').startOf('day').toDate(),
        $lte: currentDate.clone().add(2, 'days').endOf('day').toDate(),
      }
    }).populate('property').populate('vehicle');

    for (let reservation of endingReservations) {
      let message = `Rappel : Votre réservation pour ${reservation.vehicle ? reservation.vehicle.brand : reservation.property.name} se terminera dans 2 jours.`;
      await createNotification(reservation, reservation.userAdd, message, reservation.vehicle ? reservation.vehicle.images[0] : reservation.property.images[0]);
      message = `Rappel : Votre réservation pour ${reservation.vehicle ? reservation.vehicle.brand : reservation.property.name} se terminera bientôt. Souhaitez-vous prolonger ?`;
      await createNotification(reservation, reservation.client, message, reservation.vehicle ? reservation.vehicle.images[0] : reservation.property.images[0]);
    }

    // Rappels de maintenance planifiée - 2 jours avant le début
    const plannedMaintenances = await Maintenance.find({
      access: true,
      status: 'PLANNED',
      startDate: {
        $gte: currentDate.clone().add(2, 'days').startOf('day').toDate(),
        $lte: currentDate.clone().add(2, 'days').endOf('day').toDate(),
      }
    }).populate('property').populate('vehicle');

    for (let maintenance of plannedMaintenances) {
      let message = `Rappel : La maintenance planifiée pour ${maintenance.vehicle ? maintenance.vehicle.brand : maintenance.property.name} commencera dans 2 jours.`;
      await createNotification(maintenance, maintenance.userAdd, message, maintenance.vehicle ? maintenance.vehicle.images[0] : maintenance.property.images[0]);
    }

    console.log('Tâche planifiée exécutée avec succès.');
  } catch (error) {
    console.error('Erreur lors de la création des notifications:', error.message);
  }
});





// Utility function to create a notification
const createNotification = async (entity, userId, message, image) => {
  const existingNotification = await Notification.findOne({
    type: entity.constructor.modelName.toUpperCase(),
    message,
    user: userId,
    createdAt: {
      $gte: moment().subtract(7, 'days').toDate()
    }
  });

  if (!existingNotification) {
    const notification = new Notification({
      type: entity.constructor.modelName.toUpperCase(),
      [entity.constructor.modelName.toLowerCase()]: entity._id,
      user: userId,
      message
    });

    await notification.save();
    console.log(`Notification créée pour ${userId} concernant ${message}`);

    const user = await User.findById(userId);
    if (user) {
      const messageContent = htmlContentNotification(
        `Rappel ${entity.constructor.modelName.toUpperCase()} Rezaplus`, image, message
      );
      sendEmail(ApplicationInfo.emailApplication, ApplicationInfo.passwordEmail, user.email, `Rappel ${entity.constructor.modelName.toUpperCase()} Rezaplus`, messageContent);
    } else {
      const customer = await Customer.findById(userId);
      if (customer) {
        const messageContent = htmlContentNotification(
          `Rappel ${entity.constructor.modelName.toUpperCase()} Rezaplus`, image, message
        );
        sendEmail(ApplicationInfo.emailApplication, ApplicationInfo.passwordEmail, customer.email, `${ApplicationInfo.name}: Rappel ${entity.constructor.modelName.toUpperCase()}`, messageContent);
      }
    }
  }
};







// Tâche planifiée pour les notifications
cron.schedule('* * * * *', async () => { // S'exécute toutes les minutes (à ajuster selon vos besoins)
  try {
    const currentDate = moment(); // Date actuelle

    // Récupérer toutes les réservations avec des acomptes associés
    const reservationsWithPendingPayments = await Reservation.find({
      access: true,
      status: 'PENDING',
      paymentMethod: 'card', // Seulement les réservations payées par carte
      endDate: { $gte: currentDate.toDate() } // Réservations en cours ou futures
    })
      .populate('paymentCard.card')
      .populate('userAdd');

    // Récupérer les réservations confirmées dont la date de fin est dépassée (futures + passées)
    const completedReservations = await Reservation.find({
      access: true,
      status: 'CONFIRMED',
      endDate: { $lte: currentDate.toDate() } // Réservations dont la date de fin est passée
    });

    // Récupérer les réservations passées non marquées comme abouties
    const pastReservations = await Reservation.find({
      access: true,
      status: { $ne: 'COMPLETED' }, // Réservations non marquées comme abouties
      endDate: { $lt: currentDate.toDate() } // Réservations passées
    });

    for (const reservation of reservationsWithPendingPayments) {
      const startDate = moment(reservation.startDate);
      const endDate = moment(reservation.endDate);
      const middleDate = startDate.clone().add(endDate.diff(startDate) / 2, 'milliseconds'); // Milieu de la réservation

      // Vérifier si nous sommes au milieu de la réservation
      if (currentDate.isSameOrAfter(middleDate) && currentDate.isBefore(endDate)) {
        await notifyUserForPendingReservation(reservation, 'mid');
      }

      // Vérifier si nous sommes à la fin de la réservation
      if (currentDate.isSameOrAfter(endDate)) {
        await notifyUserForPendingReservation(reservation, 'end');
        await markCreditCardAsNotCompleted(reservation);
      }
    }

    // Marquer les réservations confirmées comme "abouties"
    for (const reservation of completedReservations) {
      await markReservationAsCompleted(reservation);
    }

    // Marquer les réservations passées comme "abouties" si elles étaient confirmées
    for (const reservation of pastReservations) {
      if (reservation.status === 'CONFIRMED') {
        await markReservationAsCompleted(reservation);
      }
    }

    console.log('Tâche planifiée exécutée avec succès.');
  } catch (error) {
    console.error('Erreur lors de la création des notifications:', error.message);
  }
});

// Fonction pour notifier l'utilisateur
const notifyUserForPendingReservation = async (reservation, stage) => {
  const message = stage === 'mid'
    ? `Rappel : La réservation ${reservation.ordre} est toujours en attente de confirmation.`
    : `Attention : La réservation ${reservation.ordre} n'a pas été confirmée et est maintenant terminée.`;

  const user = await User.findById(reservation.userAdd);
  if (user) {
    const existingNotification = await Notification.findOne({
      type: 'RESERVATION',
      message,
      reservation: reservation._id,
      user: reservation.userAdd,
      createdAt: {
        $gte: moment().subtract(1, 'days').toDate()
      }
    });

    if (!existingNotification) {
      const notification = new Notification({
        type: 'RESERVATION',
        reservation: reservation._id,
        user: reservation.userAdd,
        message
      });

      await notification.save();
      console.log(`Notification créée pour ${user.email} concernant ${message}`);

      // Préparer les détails de la réservation pour le template
      const reservationDetails = {
        vehicleImage: reservation?.vehicle?.images[0] || reservation?.property?.images[0] || ApplicationInfo.logoWebSite, // Image du véhicule (si disponible)
        propertyName: reservation.property?.name || "", // Nom de la propriété (si applicable)
        vehicleBrand: reservation.vehicle?.brand || "", // Marque et modèle du véhicule
        startDate: moment(reservation.startDate).format('DD/MM/YYYY HH:MM'), // Date de début formatée
        endDate: moment(reservation.endDate).format('DD/MM/YYYY HH:MM') // Date de fin formatée
      };

      // Utiliser le nouveau template pour les rappels
      const subject = "Rappel : Réservation Non Confirmée";
      const emailContent = htmlContentNotificationForPendingReservations(subject, reservationDetails, message);

      // Envoyer l'e-mail
      sendEmail(
        ApplicationInfo.emailApplication,
        ApplicationInfo.passwordEmail,
        user.email,
        `Rappel Réservation ${ApplicationInfo.name}`,
        emailContent
      );
      sendEmail(
        ApplicationInfo.emailApplication,
        ApplicationInfo.passwordEmail,
        "aymarbly559@gmail.com",
        `Rappel Réservation ${ApplicationInfo.name}`,
        emailContent
      );
    }
  }
};

// Fonction pour marquer les acomptes comme "non aboutis"
const markCreditCardAsNotCompleted = async (reservation) => {
  const creditCard = await CreditCard.findOne({
    'paymentMethodDetails.reservation': reservation._id
  });

  if (creditCard) {
    creditCard.isConfirmed = false; // Nouvel état pour indiquer que la réservation n'a pas abouti
    await creditCard.save();
    console.log(`Acompte pour la réservation ${reservation.ordre} marqué comme non abouti.`);
  }
};

// Nouvelle fonction pour marquer les réservations comme "abouties"
const markReservationAsCompleted = async (reservation) => {
  const updatedReservation = await Reservation.findByIdAndUpdate(
    reservation._id,
    { status: 'COMPLETED' }, // Mettre à jour le statut de la réservation
    { new: true }
  );

  if (updatedReservation) {
    console.log(`Réservation ${reservation.ordre} marquée comme aboutie.`);

    // Marquer également l'acompte associé comme "abouti"
    const creditCard = await CreditCard.findOne({
      'paymentMethodDetails.reservation': reservation._id
    });

    if (creditCard) {
      creditCard.isConfirmed = true; // Indiquer que la réservation est aboutie
      await creditCard.save();
      console.log(`Acompte pour la réservation ${reservation.ordre} marqué comme abouti.`);
    }
  }
};