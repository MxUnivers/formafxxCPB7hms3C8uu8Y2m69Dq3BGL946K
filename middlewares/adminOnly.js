// middleware/adminOnly.js

const adminOnly = (req, res, next) => {
  // On suppose que `req.user` a été défini par le middleware d'authentification (ex: JWT)
  const { role } = req.user;

  // Liste des rôles autorisés
  const allowedRoles = ['Admin', 'SuperAdmin'];

  if (!allowedRoles.includes(role)) {
    return res.status(403).json({
      message: 'Accès refusé : cette action est réservée aux administrateurs.',
    });
  }

  // ✅ L'utilisateur est admin, on continue
  next();
};

module.exports = adminOnly;