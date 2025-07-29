// middleware/authenticateToken.js

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Vérifier que le header Authorization existe
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1]; // Format : "Bearer xxx"

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // 1. 🔑 Essayer d'abord comme un JWT
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (!err) {
      // ✅ JWT valide → on attache l'utilisateur
      req.user = user; // { id: '...', role: '...' }
      return next();
    }

    // 2. 🛠 Si JWT invalide, on vérifie si c'est la clé fixe
    if (token === process.env.FIXED_API_TOKEN) {
      // ✅ Clé fixe valide → on autorise, sans user.id, mais on peut indiquer une origine
      req.user = {
        id: null,
        role: 'FixedTokenUser', // ou 'system', 'internal', etc.
        isFixedToken: true,
      };
      return next();
    }

    // ❌ Ni JWT valide, ni clé fixe
    return res.status(401).json({ message: 'Invalid or expired token' });
  });
};

module.exports = authenticateToken;