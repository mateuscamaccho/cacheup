const Utils = require("./Utils/utils");

class MemoryCache {
  constructor(options = {}) {
    this.defaultTTL = options.ttl || 60000;
    this.cache = new Map();

    // Executa uma limpeza periódica
    setInterval(() => {
      const now = Date.now();
      for (const [key, entry] of this.cache.entries()) {
        if (entry.expiresAt < now) {
          this.cache.delete(key);
        }
      }
    }, options.cleanupInterval || 60000); // Intervalo de 1 minuto por padrão
  }

  set(key, value, ttl = this.defaultTTL, options = {}) {
    if (!key) throw new Error("Key is required");

    if (!value) {
      value = Utils.generateValue(options);
    }

    ttl = ttl ?? this.defaultTTL;

    const expiresAt = Date.now() + ttl;
    this.cache.set(key, { value, expiresAt });

    return key;
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

    return {
      value: entry.value,
      expiresAt: Utils.formatDate(entry.expiresAt),
    };
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
          expiresAt: Utils.formatDate(entry.expiresAt),
        };
      } else {
        this.cache.delete(key);
      }
    }

    return result;
  }
}

module.exports = MemoryCache;
