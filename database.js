
const User = require('./models/UserModel'); // Ajuste le chemin si nécessaire
const bcrypt = require('bcrypt');
const mongooseClient = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const url = process.env.MONGO_URI;

mongooseClient.set('strictQuery', false);

const connectDB = async () => {
  try {
    await mongooseClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connexion à la base de données réussie");
  } catch (error) {
    console.error("Connexion à la base de données refusée", error);
    // process.exit(1); // Arrête le processus en cas d'échec
  }
};


const DEFAULT_USERS = [
  {
    firstName: 'Super',
    lastName: 'Admin',
    email: 'admin@plateforme.com',
    password: 'admin123', // À changer en production
    role: 'SuperAdmin',
    phone: '+228 90 00 00 00',
  },
  {
    firstName: 'Support',
    lastName: 'Technique',
    email: 'support@plateforme.com',
    password: 'support123',
    role: 'Support',
    phone: '+228 90 00 00 01',
  },
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'instructor@plateforme.com',
    password: 'instructor123',
    role: 'Instructor',
    phone: '+228 90 00 00 02',
    instructor: {
      expertise: 'Développement Web Fullstack',
    },
  },
];

async function initializeDefaultUsers() {
  for (const userData of DEFAULT_USERS) {
    try {
      const existingUser = await User.findOne({ email: userData.email });
      if (existingUser) {
        console.log(`✅ Utilisateur ${userData.email} existe déjà.`);
        continue;
      }

      // Hacher le mot de passe
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);

      // Créer le nouvel utilisateur
      const user = new User({
        ...userData,
        password: hashedPassword,
        isVerified: true, // Optionnel : compte vérifié par défaut
      });

      await user.save();
      console.log(`🟢 Utilisateur par défaut créé : ${userData.email} (${userData.role})`);
    } catch (error) {
      console.error(`❌ Erreur lors de la création de ${userData.email} :`, error.message);
    }
  }
}



// Fonction principale pour initialiser toutes les données
async function initializeData() {
  try {
    await connectDB();
    // await initializeBalances();
    // Initialiser les utilisateurs par défaut
    await initializeDefaultUsers();
    //console.log('Données initialisées avec succès.');
  } catch (error) {
    console.error('Erreur lors de l’initialisation des données :', error);
  }
}

initializeData();

module.exports = connectDB;
