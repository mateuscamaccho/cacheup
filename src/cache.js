const Utils = require("./Utils/utils");

class MemoryCache {
  constructor(options = {}) {
    this.defaultTTL = options.ttl || 60000;
    this.cache = new Map();
  }

  set(key, value, ttl = this.defaultTTL, options = {}) {
    // Gera uma chave aleatória se 'key' não for fornecida
    if (!value) {
      value = Utils.generateValue(options);
    }

    const expiresAt = Date.now() + ttl;
    this.cache.set(key, { value, expiresAt });

    // Remove automaticamente após o TTL expirar
    setTimeout(() => this.cache.delete(key), ttl);

    return key; // Retorna a chave, útil se foi gerada aleatoriamente
  }

  get(key) {
    const entry = this.cache.get(key);
    if (!entry || entry.expiresAt < Date.now()) {
      this.cache.delete(key);
      return null;
    }
    return entry.value;
  }

  getInfo(key) {
    const entry = this.cache.get(key);
    if (!entry || entry.expiresAt < Date.now()) {
      this.cache.delete(key);
      return null;
    }

    return Object.keys[key] = {
      value: entry.value,
      expiresAt: Utils.formatDate(entry.expiresAt), // Converte para ISO para legibilidade
    }
  }

  delete(key) {
    return this.cache.delete(key);
  }

  clear() {
    this.cache.clear();
  }

  /**
* Retorna todas as chaves e valores ativos no cache.
* @returns {Object} - Um objeto com todas as chaves e valores válidos (não expirados).
*/
  getAll() {
    const result = {};
    const now = Date.now();

    for (const [key, entry] of this.cache.entries()) {
      if (entry.expiresAt > now) {
        result[key] = {
          value: entry.value,
          expiresAt: Utils.formatDate(entry.expiresAt), // Converte para ISO para legibilidade
        };
      } else {
        this.cache.delete(key); // Remove as expiradas
      }
    }

    return result;
  }
}

module.exports = MemoryCache;
