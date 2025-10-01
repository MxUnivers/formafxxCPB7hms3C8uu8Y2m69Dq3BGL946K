

export const baseurl = {
    url: import.meta.env.VITE_BASE_URL,
    token: import.meta.env.VITE_TOKEN,
    TypeToken: import.meta.env.VITE_TYPE_TOKEN,
    cloudinaryUploadPreset: import.meta.env.VITE_CLOUNDIANRY_UPLOAD_PRESET,
    cloudinaryCloudName: import.meta.env.VITE_CLOUNDIANRY_NAME,
    ApiKeyGoogle: import.meta.env.VITE_API_KEY_GOOGLE,
    ApikeyCheckout: import.meta.env.VITE_API_KEY_STRIPE,
    ApiKeyRecaptcha: import.meta.env.VITE_RECAPTCHA,
}


export const checkWordInURL = (word) => {
    const url = window.location.href;  // Récupère l'URL complète
    const pathname = window.location.pathname; // Récupère uniquement le pathname

    console.log('URL complète :', url);
    console.log('Pathname :', pathname);
    console.log('Mot recherché :', word);

    const includesWord = pathname.includes(word);
    console.log(`L'URL inclut "${word}" ?`, includesWord);

    return includesWord;  // Retourne true si le mot est trouvé, sinon false
};