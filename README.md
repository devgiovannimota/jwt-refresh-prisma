# Autenticação com NodeJs

## 🧧 Sobre

Autenticação desenvolvida em **NodeJS** com o framework **Express**.

## 🚀 Tecnologias utilizadas

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Typescript]
- [JWT]

## 📦 Como rodar o projeto

<br>

## 1 - Clonar o repo

```bash
# Clonar o repositório
$ git clone https://github.com/devgiovannimota/jwt-refresh-prisma.git

# Entrar no repositório
```

## 2 - Instalar as dependências

```bash
# Instalar as dependências
$ npm install
```

## 3 - Rodando o projeto

```bash
# Rodar o projeto
$ npm run dev
```

# Usando a API

Voce pode acessar a API usando os seguintes endpoints:

### `GET`

- `/login` : Faz o login com base no token

- `/signOut` : Expirar a sessão

- `/getdata` : Ver o seu token

### `POST`

- `/refresh` : Gera um refresh token e um token novo
