// export const LocaleState = (name, item) => {
//     localStorage.setItem(String(name), item)
// }

import { localStorageKeys } from "./localvalue";


export const handleClearLocalStorage = () => {
    // localStorage.clear(); // Effacer toutes les données du localStorage
    localStorage.removeItem(localStorageKeys.userId);
    localStorage.removeItem(localStorageKeys.userRole);
    localStorage.removeItem(localStorageKeys.userName);
    // console.log('Deconnexion de la pplication ');
};

// recupération des varibale de localStorage dans l'application  

export function getAndCheckLocalStorage(key) {
    const storedData = JSON.parse(localStorage.getItem(key));

    if (storedData && storedData.expiration > new Date().getTime()) {
        // Les données sont toujours valides
        return storedData.data;
    } else {
        // Les données ont expiré ou n'existent pas, vous pouvez les supprimer si nécessaire
        localStorage.removeItem(key);
        return null; // Ou une valeur par défaut appropriée si nécessaire
    }
}





// Assigne les valeurs locale de mon application .

export function setWithExpiration(key, data, expirationInMilliseconds) {
    const expirationDate = new Date().getTime() + expirationInMilliseconds;

    const dataToStore = {
        data: data,
        expiration: expirationDate
    };

    localStorage.setItem(key, JSON.stringify(dataToStore));
}

export const dureeDeVie = 60 * 24 * 60 * 60 * 1000; // 30 jours * 24 heures * 60 minutes * 60 secondes * 1000 millisecondes