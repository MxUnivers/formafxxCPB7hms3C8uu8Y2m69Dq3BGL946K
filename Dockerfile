# Utilisation d'une image Node.js officielle
FROM node:18

# Définition du répertoire de travail
WORKDIR /app

# Copie des fichiers
COPY package*.json ./

# Installation des dépendances
RUN npm install --omit=dev

# Copie du code source
COPY . .

# Exposition du port utilisé par l'application

# Commande pour démarrer l'application
CMD ["npm", "start"]
