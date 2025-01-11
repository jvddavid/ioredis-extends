# Redis Extends

`Redis Extends` é um pacote que estende as funcionalidades do ioredis. Ele está disponível no npm como `@jvddavid/ioredis-extends`.

## Instalação

Para instalar o pacote, utilize o npm:

```bash
npm install @jvddavid/ioredis-extends
```

## Uso

Aqui está um exemplo básico de como usar o `Redis Extends`:

```javascript
const RedisExtends = require('@jvddavid/ioredis-extends')

const redisExtends = new RedisExtends(redis)

// Exemplo de uso das funcionalidades estendidas
redisExtends.hexpire('foo', 'field1', 10)
```

## Funcionalidades

- [hexpire](https://redis.io/docs/latest/commands/hexpire/)(key, field, seconds[, callback])

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests no [repositório do GitHub](https://github.com/jvddavid/ioredis-extends).

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
