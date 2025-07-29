const Customer = require("../models/CustomerModel");
const Notification = require("../models/NotificationModel");
const User = require("../models/UserModel");
const { htmlContentNotification } = require("../templateshtml/notificationTemplate");
const ApplicationInfo = require("./dataApi");
const moment = require('moment');
const sendEmail = require("./sendEmail");


// Utility function to create a notification
const createNotificationNewReservation = async (entity, userId,subject, message, image) => {

    const existingNotification = await Notification.findOne({
      type: entity.constructor.modelName.toUpperCase(),
      message,
      user: userId,
    //   createdAt: {
    //     $gte: moment().subtract(7, 'days').toDate()
    //   }
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
          `${entity.constructor.modelName.toUpperCase()}`, image, message
        );
        await sendEmail(ApplicationInfo.emailApplication, ApplicationInfo.passwordEmail, user.email, subject, messageContent);
      } else {
        const customer = await Customer.findById(userId);
        if (customer) {
          const messageContent = htmlContentNotification(
            subject, image, message
          );
          await sendEmail(ApplicationInfo.emailApplication, ApplicationInfo.passwordEmail, customer.email, subject, messageContent);
        }
      }
    }
  };
  
  



module.exports = {createNotificationNewReservation}