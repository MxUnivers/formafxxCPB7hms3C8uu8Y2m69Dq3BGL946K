const cron = require('node-cron');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const connectDB = require('./database');
// const authenticateToken = require('./middlewares/auth');
// const exchangeRate=require("./scheduler/exchangeRateScheduler")

dotenv.config();

const app = express();
const port = process.env.PORT || 1000;


// Configuration de CORS pour autoriser toutes les origines
app.use(cors({
  origin: "*", // Autorise toutes les origines
  methods: ['GET', 'POST', 'PUT', 'DELETE', "PATCH"], // Méthodes HTTP autorisées
  allowedHeaders: ['Content-Type', 'Authorization'], // En-têtes autorisés
}));

// Middlewares
app.use(morgan('common'));
app.use(helmet());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Limiter les requêtes pour éviter les attaques DoS
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 3000, // Limite à 100 requêtes
});

app.use(limiter);

// app.use(authenticateToken);
// Routes
app.use('/api/v1/auth', require('./routes/authValidatorRoutes'));
app.use('/api/v1/formations', require('./routes/forrmationRoutes'));
app.use('/api/v1/modules', require('./routes/modulesRoutes'));
app.use('/api/v1/lessons', require('./routes/lessonsRoutes'));
app.use('/api/v1/exercises', require('./routes/exercicesRoutes'));
app.use('/api/v1/users', require('./routes/userRoutes'));

// Route de test
app.get("/", (req, res) => {
  res.json({ message: "API formations fonctionnelle." });
});

// Gestionnaire d'erreurs global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: true, message: "Une erreur interne est survenue." });
});


// Démarrage du serveur
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
  });
}).catch(error => {
  console.error('Erreur de connexion à la base de données :', error);
});