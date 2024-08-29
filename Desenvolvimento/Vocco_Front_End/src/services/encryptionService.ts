import CryptoJS from 'crypto-js';

const secretKey = import.meta.env.REACT_APP_SECRET_KEY || 'default_secret_key';

export const encryptData = (data: string): string => {
    try {
        const encrypted = CryptoJS.AES.encrypt(data, secretKey).toString();
        return encrypted;
    } catch (error) {
        console.error('Erro ao criptografar dados:', error);
        throw error;
    }
};

export const decryptData = (ciphertext: string) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
};
