const cron = require('node-cron');
const Reservation = require('../models/ReservationModel');
const Vehicle = require('../models/VehicleModel');
const Property = require('../models/PropertyModel');
const Maintenance = require('../models/MaintenanceModel');
const moment = require('moment');

// Fonction utilitaire pour mettre à jour les statuts
const updateStatus = async (item, status, type) => {
  if (!item) return;
  item.status = status;
  await item.save();
  console.log(`${type} ID: ${item._id} mis à jour en ${status}`);
};

// Tâche planifiée pour vérifier la disponibilité toutes les heures
// Tâche planifiée pour vérifier la disponibilité toutes les heures
cron.schedule('* * * * *', async () => {
  try {
    const currentDate = moment().startOf('day');
    const endOfDay = moment().endOf('day');

    console.log(`Exécution de la vérification de disponibilité à : ${moment().format()}`);

    // 1. Vérification des réservations confirmées pour aujourd'hui
    const reservations = await Reservation.find({
      status: 'CONFIRMED',
      access: true,
      startDate: { $lte: endOfDay.toDate() },
      endDate: { $gte: currentDate.toDate() },
    });

    console.log(`Réservations confirmées trouvées aujourd'hui : ${reservations.length}`);

    for (let reservation of reservations) {
      const vehicle = reservation.vehicle ? await Vehicle.findById(reservation.vehicle) : null;
      const property = reservation.property ? await Property.findById(reservation.property) : null;

      if (vehicle) {
        await updateStatus(vehicle, 'UNAVAILABLE', 'Véhicule');
      }
      if (property) {
        await updateStatus(property, 'UNAVAILABLE', 'Propriété');
      }
    }

    // 2. Vérification des maintenances planifiées pour aujourd'hui
    const maintenances = await Maintenance.find({
      status: 'PLANNED',
      access: true,
      startDate: { $lte: endOfDay.toDate() },
      endDate: { $gte: currentDate.toDate() },
    });

    console.log(`Maintenances planifiées trouvées aujourd'hui : ${maintenances.length}`);

    for (let maintenance of maintenances) {
      const vehicle = maintenance.vehicle ? await Vehicle.findById(maintenance.vehicle) : null;
      const property = maintenance.property ? await Property.findById(maintenance.property) : null;

      console.log(`Traitement de la maintenance pour véhicule/propriété en cours.`);

      // Vérification de conflits avec des réservations confirmées
      const conflictingReservation = await Reservation.findOne({
        access: true,
        status: 'CONFIRMED',
        $or: [
          { vehicle: vehicle ? vehicle._id : null },
          { property: property ? property._id : null },
        ],
        startDate: { $lte: endOfDay.toDate() },
        endDate: { $gte: currentDate.toDate() },
      });

      if (!conflictingReservation) {
        if (vehicle) {
          await updateStatus(vehicle, 'IN_REPAIR', 'Véhicule');
        }
        if (property) {
          await updateStatus(property, 'IN_REPAIR', 'Propriété');
        }
      }
    }

    // 3. Marquer les véhicules et propriétés sans réservation ni maintenance comme disponibles
    const unavailableVehicles = await Vehicle.find({ status: 'UNAVAILABLE' });
    const unavailableProperties = await Property.find({ status: 'UNAVAILABLE' });

    for (let vehicle of unavailableVehicles) {
      const hasReservationOrMaintenance = await Reservation.exists({
        status: 'CONFIRMED',
        access: true,
        vehicle: vehicle._id,
        startDate: { $lte: endOfDay.toDate() },
        endDate: { $gte: currentDate.toDate() },
      }) || await Maintenance.exists({
        status: 'PLANNED',
        access: true,
        vehicle: vehicle._id,
        startDate: { $lte: endOfDay.toDate() },
        endDate: { $gte: currentDate.toDate() },
      });

      if (!hasReservationOrMaintenance) {
        await updateStatus(vehicle, 'AVAILABLE', 'Véhicule');
      }
    }

    for (let property of unavailableProperties) {
      const hasReservationOrMaintenance = await Reservation.exists({
        status: 'CONFIRMED',
        access: true,
        property: property._id,
        startDate: { $lte: endOfDay.toDate() },
        endDate: { $gte: currentDate.toDate() },
      }) || await Maintenance.exists({
        status: 'PLANNED',
        access: true,
        property: property._id,
        startDate: { $lte: endOfDay.toDate() },
        endDate: { $gte: currentDate.toDate() },
      });

      if (!hasReservationOrMaintenance) {
        await updateStatus(property, 'AVAILABLE', 'Propriété');
      }
    }

    // 4. Vérifier les véhicules et propriétés en état IN_REPAIR
    const vehiclesInRepair = await Vehicle.find({ status: 'IN_REPAIR' });
    const propertiesInRepair = await Property.find({ status: 'IN_REPAIR' });

    for (let vehicle of vehiclesInRepair) {
      const hasActiveMaintenance = await Maintenance.exists({
        vehicle: vehicle._id,
        status: { $in: ['PLANNED', 'IN_PROGRESS'] }, // Maintenance active
        startDate: { $lte: endOfDay.toDate() },
        endDate: { $gte: currentDate.toDate() },
      });

      if (!hasActiveMaintenance) {
        await updateStatus(vehicle, 'AVAILABLE', 'Véhicule');
      }
    }

    for (let property of propertiesInRepair) {
      const hasActiveMaintenance = await Maintenance.exists({
        property: property._id,
        status: { $in: ['PLANNED', 'IN_PROGRESS'] }, // Maintenance active
        startDate: { $lte: endOfDay.toDate() },
        endDate: { $gte: currentDate.toDate() },
      });

      if (!hasActiveMaintenance) {
        await updateStatus(property, 'AVAILABLE', 'Propriété');
      }
    }

    // 5. Mettre à jour les réservations terminées
    await Reservation.updateMany(
      {
        access: true,
        status: 'CONFIRMED',
        endDate: { $lt: moment().toDate() },
      },
      { $set: { status: 'COMPLETED' } }
    );
    console.log("Les réservations terminées sont passées à COMPLETED.");

    console.log('Vérification et mise à jour des statuts effectuée.');
  } catch (error) {
    console.error('Erreur lors de la vérification de disponibilité :', error.message);
  }
});