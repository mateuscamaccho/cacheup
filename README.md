# node-cacheup (English)

node-cacheup is a lightweight, in-memory caching library for Node.js applications, providing flexible key-value storage with customizable expiration settings.

## Features
- **In-memory storage**: Stores key-value pairs in memory for fast access.
- **Custom expiration**: Set expiration times for cache entries, with automatic cleanup.
- **Utility methods**: Generate random keys, clear cache, and manage expiration seamlessly.

## Installation

```bash
npm install node-cacheup
# or
yarn add node-cacheup
```

## Usage

```javascript
const MemoryCache = require('node-cacheup');

// Initialize the cache
const cache = new MemoryCache();

// Set a cache entry with a TTL (in milliseconds)
cache.set('myKey', 'myValue', 5000); // Expires in 5 seconds

// Get a cache entry
const value = cache.get('myKey');
console.log(value); // Outputs: 'myValue' (if not expired)

// Check if a key exists
const exists = cache.has('myKey');
console.log(exists); // Outputs: true or false

// Delete a specific key
cache.delete('myKey');

// Clear all cache entries
cache.clear();
```

### Express Usage

```javascript
import express from 'express';
const MemoryCache = require('node-cacheup');

const app = express();
const cache = new MemoryCache();

app.get('/token/:key', (req, res) => {
    const key = cache.set(req.params.key, null, 10000, { length: 12, letters: true, numbers: true });
    const keyInfo = cache.getInfo(key);
    res.json({ key, ...keyInfo });
});

app.get('/verifyToken/:key', (req, res) => {
    const isValid = !!cache.get(req.params.key);
    res.json({ isValid });
});

app.listen(3000, () => console.log('Server is running on port 3000'));
```

## API Reference

### `set(key, value, ttl)`
- Stores a value with the specified key and TTL (time-to-live).

### `get(key)`
- Retrieves the value for a specific key.

### `delete(key)`
- Removes the entry for a specific key.

### `clear()`
- Clears all entries in the cache.

### `getAll()`
- Returns all key-value pairs with their expiration information.

## License

This project is licensed under the MIT License - see the LICENSE file for details. [LICENSE](./LICENSE).



# node-CacheUp (Português)

![npm](https://img.shields.io/npm/v/node-cacheup) ![license](https://img.shields.io/npm/l/node-cacheup) ![issues](https://img.shields.io/github/issues/username/node-cacheup)

`Node-CacheUp` é uma biblioteca simples e eficiente para gerenciamento de cache em memória em aplicações Node.js. Com suporte para configuração de TTL (time-to-live) e várias opções de geração de chaves, essa biblioteca ajuda a otimizar o desempenho de suas APIs e serviços, reduzindo a necessidade de chamadas repetidas ao banco de dados ou a APIs externas.

## Índice

- [Recursos](#recursos)
- [Instalação](#instalação)
- [Uso](#uso)
- [API](#api)
  - [set](#set)
  - [get](#get)
  - [getInfo](#getInfo)
  - [delete](#delete)
  - [clear](#clear)
  - [getAll](#getAll)
- [Testes](#testes)
- [Licença](#licença)

## Recursos

- **Armazenamento em memória**: Armazena dados temporariamente para rápido acesso.
- **TTL configurável**: Define o tempo de expiração de cada item no cache.
- **Geração de chave personalizada**: Criação de chaves personalizadas com letras, números e caracteres especiais.
- **Métodos utilitários**: Obtenha informações sobre o cache e formate datas de expiração.

## Instalação

Para instalar o CacheUp, utilize o npm ou yarn:

```bash
npm install node-cacheup
# ou
yarn add node-cacheup
```

## Uso

### Exemplo básico

```javascript
import MemoryCache from 'node-cacheup';

const cache = new MemoryCache({ ttl: 60000 }); // TTL padrão de 60 segundos

// Definindo um valor no cache
const key = cache.set('testKey', 'testValue');
console.log(cache.get(key)); // Saída: testValue
```

### Usando com Express

```javascript
import express from 'express';
import MemoryCache from 'node-cacheup';

const app = express();
const cache = new MemoryCache();

app.get('/token/:key', (req, res) => {
    const key = cache.set(req.params.key, null, 10000, { length: 12, letters: true, numbers: true });
    const keyInfo = cache.getInfo(key);
    res.json({ key, ...keyInfo });
});

app.get('/verifyToken/:key', (req, res) => {
    const isValid = !!cache.get(req.params.key);
    res.json({ isValid });
});

app.listen(3000, () => console.log('Server is running on port 3000'));
```

## API

### `set(key, value, ttl, options)`

Define um valor no cache.

- `key` *(string)*: A chave para armazenar o valor. Se não for passada, será gerada automaticamente.
- `value` *(any)*: O valor a ser armazenado.
- `ttl` *(number)*: Tempo em milissegundos antes do item expirar (padrão: valor de `defaultTTL`).
- `options` *(object)*: Configurações adicionais para geração da chave:
  - `length` *(number)*: Tamanho da chave (padrão: 8).
  - `numbers`, `letters`, `specialChars` *(boolean)*: Incluir números, letras e caracteres especiais na chave.

**Retorno**: A chave gerada para o item.

### `get(key)`

Recupera o valor armazenado para a chave especificada.

- `key` *(string)*: A chave do item no cache.

**Retorno**: O valor do item ou `null` se o item expirou ou não existe.

### `getInfo(key)`

Recupera informações do item no cache, incluindo data de expiração.

- `key` *(string)*: A chave do item no cache.

**Retorno**: Um objeto com `value` e `expiresAt` formatado.

### `delete(key)`

Remove um item do cache.

- `key` *(string)*: A chave do item a ser removido.

**Retorno**: `true` se o item foi removido, `false` caso contrário.

### `clear()`

Limpa todos os itens do cache.

**Retorno**: `void`.

### `getAll()`

Recupera todos os itens não expirados no cache.

**Retorno**: Um objeto contendo todas as chaves e valores válidos, com informações de expiração.

## Testes

Para executar os testes, utilize o comando:

```bash
npm test
```

Os testes garantem a correta funcionalidade dos métodos `set`, `get`, `delete`, `clear`, `getInfo` e `getAll` do `CacheUp`.

## Licença

Este projeto está licenciado sob a licença MIT. Para mais detalhes, consulte o arquivo [LICENSE](./LICENSE).
