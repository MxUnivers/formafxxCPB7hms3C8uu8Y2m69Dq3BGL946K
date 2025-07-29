const cron = require('node-cron');
const mongoose = require('mongoose');
const CreditCard = require('../models/CreditCardModel');
const Reservation = require('../models/ReservationModel');

// Fonction pour mettre à jour les détails de paiement
const updatePaymentDetails = async () => {
    try {
        // Récupérer toutes les réservations avec une carte de crédit associée
        const reservationsWithCards = await Reservation.find(
            {
            'paymentCard.card': { $exists: true, $ne: null } // Réservations avec une carte de crédit
        }
        ).populate('paymentCard.card'); // Peupler les détails de la carte de crédit

        for (const reservation of reservationsWithCards) {
            const creditCardId = reservation.paymentCard.card; // ID de la carte de crédit associée
            if (!creditCardId) continue; // Ignorer si aucune carte n'est associée

            // Rechercher la carte de crédit correspondante
            const creditCard = await CreditCard.findById(creditCardId);

            if (creditCard && !creditCard.paymentMethodDetails?.reservation) {
                // Mettre à jour le champ paymentMethodDetails.reservation
                creditCard.paymentMethodDetails = {
                    ...creditCard.paymentMethodDetails,
                    reservation: reservation._id // Associer la réservation
                };
                creditCard.client = reservation.client
                creditCard.userAdd = reservation.userAdd
                creditCard.property = reservation.property
                creditCard.vehicle = reservation.vehicle
                await creditCard.save();
                console.log(`Carte de crédit ${creditCard._id} mise à jour avec la réservation ${reservation._id}`);
            }
        }
    } catch (error) {
        console.error("Erreur lors de la mise à jour des détails de paiement :", error.message);
    }
};

// Planifier la tâche avec node-cron
cron.schedule('* * * * *', () => {
    console.log("Tâche automatisée : Mise à jour des détails de paiement...");
    updatePaymentDetails();
});

console.log("Tâche automatisée démarrée pour créditCard. Elle s'exécutera toutes les minutes.");