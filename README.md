# GNTech Assessment API

API para gerenciamento de CEPs com cache em Redis, banco de dados PostgreSQL e integração com APIs externas.

---

## 📦 Tecnologias Utilizadas

* **Node.js** + **TypeScript** – Linguagem do servidor
* **Express.js** – Framework web
* **TypeORM** – ORM para PostgreSQL
* **PostgreSQL** – Banco de dados relacional 
* **Redis** – Cache para otimização de consultas
* **dotenv** – Gerenciamento de variáveis de ambiente
* **Swagger** – Documentação das rotas
* **Docker & Docker Compose** – Containerização da aplicação

---

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

| Variável            | Descrição                      | Exemplo                            |
| ------------------- | ------------------------------ | ---------------------------------- |
| `PORT`              | Porta que o servidor irá rodar | `3001`                             |
| `DATABASE_HOST`     | Host do banco PostgreSQL       | `localhost`                        |
| `DATABASE_PORT`     | Porta do banco PostgreSQL      | `5432`                             |
| `DATABASE_USER`     | Usuário do banco               | `seuusuario`                         |
| `DATABASE_PASSWORD` | Senha do banco                 | `suasenha`                         |
| `DATABASE_NAME`     | Nome do banco                  | `seubanco`                        |
| `REDIS_HOST`        | Host do Redis                  | `localhost`                        |
| `REDIS_PORT`        | Porta do Redis                 | `6379`                             |
| `REDIS_PASSWORD`    | Senha do Redis (opcional)      | `suasenha`                         |
| `EXTERNAL_API_URL`  | URL da API externa de CEP      | `https://brasilapi.com.br/api/cep/v2/` |



---

## 🚀 Rodando o Projeto

### 1. Com Docker

```bash
make setup
```

Isso irá subir:

* Banco de dados PostgreSQL
* Redis
* API Node.js




## 🗂 Estrutura de Pastas

```
src/
├─ config/           # Configurações do banco e Redis
├─ controllers/      # Controllers das rotas
├─ doc/              # Documentção com Swagger
├─ entities/         # Entidades TypeORM
├─ services/         # Lógica de negócio
├─ migrations/       # Migrations do TypeORM
├─ routes/           # Definição de rotas
├─ types/            # Tipagens TypeScript
├─ external/         # Integração com APIs externas

```

---

## 📚 Rotas e Documentação

### Base URL

```
http://localhost:3001/docs
```

### Endpoints

---

### GET `/cep/:cep`

Busca um CEP específico:

* Primeiro consulta o **Redis** (cache).
* Se não encontrar, consulta o **banco de dados**.
* Se ainda não encontrar, consulta a **API externa** e salva no banco + cache.

**Path Params:**

| Parâmetro | Tipo   | Descrição         | Exemplo    |
| --------- | ------ | ----------------- | ---------- |
| cep       | string | CEP a ser buscado | `12236610` |

**Resposta de sucesso:**

```json
{
  "error": false,
  "message": "success!",
  "data": {
    "id": 1,
    "cep": "12236610",
    "state": "SP",
    "city": "São José dos Campos",
    "neighborhood": "Cidade Morumbi",
    "street": "Rua Maximino José de Almeida",
    "service": "open-cep"
  },
  "source": "Internal | external"
}
```

**Status Codes:**

* `200 OK` – CEP encontrado
* `201 OK` – CEP obtido da API externa e salvo no banco de dados com sucesso.
* `404 Not Found` – CEP não encontrado
* `500 Internal Server Error` – Erro interno

**Cache Redis:**

* Key: `cep:<cep>`


---


#### GET `/cep/all`

Retorna todos os CEPs cadastrados com paginação.

**Query Params:**

| Parâmetro | Tipo   | Descrição             | Exemplo |
| --------- | ------ | --------------------- | ------- |
| page      | number | Página atual          | 1       |
| limit     | number | Quantidade por página | 10      |

**Resposta de sucesso:**

```json
{
  "error": false,
  "message": "success!",
  "data": [ ... ],
  "source": "cache | Internal"
}
```

---

#### POST `/cep`

Cria um novo CEP.

**Body:**

```json
{
  "cep": "12236610",
  "state": "SP",
  "city": "São José dos Campos",
  "neighborhood": "Cidade Morumbi",
  "street": "Rua Maximino José de Almeida",
  "service": "open-cep"
}
```

**Status Code:** `201 Created`

**Resposta:**

```json
{
  "error": false,
  "message": "success!",
  "data": { ... },
  "source": "Internal"
}
```

---

#### PUT `/cep/:id`

Atualiza um CEP existente pelo ID.

**Body:** Mesmo do POST.

**Status Codes:**

* `200 OK` – Atualização realizada
* `404 Not Found` – CEP não encontrado
* `409 Conflict` – Conflito de chave duplicada

---

#### DELETE `/cep/:id`

Remove um CEP pelo ID.

**Status Codes:**

* `200 OK` – Deletado com sucesso
* `404 Not Found` – CEP não encontrado

---

## 📝 Cache Redis

* CEPs individuais: `cep:<cep>`
* Lista de CEPs paginada: `ceps:page:<numero>`


---
## 🧑‍💻 Autor
### Mateus Silva

