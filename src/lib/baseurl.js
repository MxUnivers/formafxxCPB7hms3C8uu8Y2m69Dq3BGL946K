

export const baseurl = {
    url: process.env.REACT_APP_BASE_URL,
    token: process.env.REACT_APP_TOKEN,
    TypeToken: process.env.REACT_APP_TYPE_TOKEN,
    cloudinaryUploadPreset: process.env.REACT_APP_CLOUNDIANRY_UPLOAD_PRESET,
    cloudinaryCloudName: process.env.REACT_APP_CLOUNDIANRY_NAME,
    ApiKeyGoogle: process.env.REACT_APP_API_KEY_GOOGLE,
    ApikeyCheckout: process.env.REACT_APP_API_KEY_STRIPE,
    ApiKeyRecaptcha: process.env.REACT_APP_RECAPTCHA,

    //  banck info
    W68bAVn7ps26XtNsxrZKgr955HJ3DNrK843krdnp2pP563BmppBJ: process.env.REACT_APP_BANK_NUMBER,
    A6mbd3nNrsrpkN67r5HW4g56JpPX2K8VZrD28JB3snx65t3pKB9pp: process.env.REACT_APP_BANK_IBAN,
    Zd3bJrnkpsBH8pXB38nJK6V59spNp6WNPA6tp5Km25rx6274grrD: process.env.REACT_APP_BANK_NAME,
    p3kb86nJrsDmWZ8KBxJdrX2A2g69prprt5H6p7B5PK5NpNs364Vn: process.env.REACT_APP_BANK_SWIFT,
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