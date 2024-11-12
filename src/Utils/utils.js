module.exports = class Utils {
    static formatDate(timestamp) {
        const date = new Date(timestamp);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    }

    
    /**
     * Gera uma chave aleatória.
     * @param {Object} options - Opções para geração da chave.
     * @param {number} options.length - Quantidade de caracteres (padrão: 8).
     * @param {boolean} options.numbers - Incluir números (padrão: true).
     * @param {boolean} options.letters - Incluir letras (padrão: true).
     * @param {boolean} options.specialChars - Incluir caracteres especiais (padrão: true).
     * @returns {string} - A chave gerada.
     */
    static generateValue(options = {}) {
        const length = options.length || 8;
        const includeNumbers = options.numbers !== false; // Default true
        const includeLetters = options.letters !== false; // Default true
        const includeSpecialChars = options.specialChars !== false; // Default true

        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        const specialChars = '!@#$%^&*()-_=+[]{}|;:,.<>/?';
        let characters = '';

        if (includeLetters) characters += letters;
        if (includeNumbers) characters += numbers;
        if (includeSpecialChars) characters += specialChars;
        if (!characters) characters = letters; // Caso nenhuma opção seja escolhida, usa letras por padrão

        let key = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            key += characters[randomIndex];
        }
        return key;
    }
}