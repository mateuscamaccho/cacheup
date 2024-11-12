const MemoryCache = require('../src/cache');  // Importa a classe MemoryCache
const Utils = require('../src/Utils/utils'); // Importa o módulo de utilidades

describe('MemoryCache', () => {
  let cache;

  // Cria uma nova instância do cache antes de cada teste
  beforeEach(() => {
    cache = new MemoryCache();
  });

  it('should set and get a value', () => {
    const key = 'testKey';
    const value = 'testValue';
    cache.set(key, value);  // Insere um valor no cache
    expect(cache.get(key)).toBe(value);  // Verifica se o valor foi armazenado corretamente
  });

  it('should return null for expired keys', (done) => {
    const key = 'testKey2';
    const value = 'testValue2';
    cache.set(key, value, 500); // Configura um TTL de 500ms
    setTimeout(() => {
      expect(cache.get(key)).toBeNull();  // Espera que o valor tenha expirado
      done();  // Sinaliza que o teste assíncrono terminou
    }, 600);  // Aguarda 600ms para garantir que o valor expirou
  });

  it('should delete a key', () => {
    const key = 'testKey3';
    const value = 'testValue3';
    cache.set(key, value);
    cache.delete(key);  // Remove a chave
    expect(cache.get(key)).toBeNull();  // Verifica se o valor foi removido corretamente
  });

  it('should clear all keys', () => {
    const key1 = 'testKey4';
    const key2 = 'testKey5';
    const value1 = 'testValue4';
    const value2 = 'testValue5';
    cache.set(key1, value1);
    cache.set(key2, value2);
    cache.clear();  // Limpa o cache
    expect(cache.get(key1)).toBeNull();  // Verifica se as chaves foram removidas
    expect(cache.get(key2)).toBeNull();
  });

  it('should return the correct expiration date format', () => {
    const key = 'testKey6';
    const value = 'testValue6';
    cache.set(key, value, 1000);

    const allValues = cache.getAll();
    const expirationDate = allValues[key].expiresAt;

    // Verifica se a data está no formato correto "dd/mm/yyyy hh:mm:ss"
    expect(expirationDate).toMatch(/^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}$/);
  });

  it('should generate a random key with custom length and options', () => {
    const options = { length: 12, numbers: true, specialChars: true };
    const randomKey = Utils.generateValue(options);  // Gera uma chave aleatória
    expect(randomKey.length).toBe(12);  // Verifica o comprimento da chave
    expect(randomKey).toMatch(/[A-Za-z0-9!@#$%^&*()\-_=+[\]{}|;:,.<>\/?]/);  // Verifica se inclui números e caracteres especiais
  });

  it('should get all values with expiration date and format them correctly', (done) => {
    const key1 = 'testKey7';
    const value1 = 'testValue7';
    const key2 = 'testKey8';
    const value2 = 'testValue8';

    cache.set(key1, value1, 3000);  // Define o TTL de 3000ms (3 segundos)
    cache.set(key2, value2, 1000);  // Define o TTL de 1000ms (1 segundo)

    // Espera o tempo necessário para que a chave2 expire
    setTimeout(() => {
      const allValues = cache.getAll();  // Chama getAll após o tempo de expiração

      // Verifica se a chave1 ainda está presente
      expect(allValues).toHaveProperty(key1);

      // Verifica se a chave1 tem a data de expiração no formato correto
      expect(allValues[key1].expiresAt).toMatch(/^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}$/);

      // Verifica se a chave2 foi expirada e removida
      expect(allValues).not.toHaveProperty(key2);

      done();  // Marca o término do teste assíncrono
    }, 2000);  // Aguarda 2 segundos para garantir que a chave2 tenha expirado
  });

});
