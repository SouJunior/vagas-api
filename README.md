<a id="linkedin_backend"></a>

![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=2088f2&style=for-the-badge)

<h1 align="center"> <a href="https://git.io/typing-svg"> 

<img src="https://readme-typing-svg.herokuapp.com/?color=ffffff&size=35&center=true&vCenter=true&width=1000&lines=Seja+bem+vindo(a)+ao+vagas-backend!" alt="Typing SVG" /> </a> </h1> 

<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&width=100%&color=2088f2&fontColor=ffffff&height=300&section=header&text=Sou%20Junior&fontSize=90&animation=fadeIn&fontAlignY=38&desc=Projeto%20Opensource%20para%20melhorar%20o%20match%20entre%20profissionais%20Juniors%20e%20Empresas!&descAlignY=61&descAlign=52" /> 

<p align="center">Visitantes: <img src="https://profile-counter.glitch.me/SouJunior/count.svg" /></p>

---

## Menu

<a href="#rodando-localmente">Rodando localmente</a>

<a href="#documentação">Documentação</a>

<a href="#stack_utilizada">Stack Utilizada</a>

<a href="#equipe_do_backend">Equipe Back-end</a>


### Pré-requisitos:
* git
* docker
* insomnia

---

<a id="rodando-localmente"></a>

## 🛠️ Rodando localmente


Clone o projeto ou o fork do projeto com o seguinte comando:

```bash
git clone https://github.com/SouJunior/linkedin-backend.git
```

Em seguida, instale as dependências:

```bash
npm install
```

Suba os containers docker na sua máquina via `docker compose`:
```bash
docker compose up -d
```

Crie o arquivo `.env` seguindo o exemplo contido em `.env.example`.

Aplique as **migrations** do TypeORM no seu banco de dados local:
```bash
npm run migration:run
```

Por fim, inicie o servidor:
```bash
npm run dev # ou npm run start:dev
```

---

## Configure o arquivo .env
🔐 Crie um arquivo .env na raiz do projeto com as seguintes variáveis de ambiente:

```bash
PORT=3000
DATABASE_URL=postgres://usuario:senha@localhost:5432/seu_banco
JWT_SECRET=sua_chave_secreta
```

💡 Dica: nunca suba o arquivo .env no GitHub! Use sempre o .gitignore para evitar vazamentos de credenciais.


---

## 🖥️ Instruções por sistema operacional
Tanto 🐧 Linux quanto 🪟 Windows são o mesmo processo

```bash
# Instale as dependências
npm install

# Rode o projeto
npm run start:dev
```

---

❗ Erro de autenticação no banco?

Se ao rodar o projeto aparecer um erro relacionado ao banco de dados, siga os passos abaixo:

🔐 Alterar a senha do usuário postgres:

```bash
psql -h localhost -p 5432 -U postgres -d postgres
```

E então, dentro do terminal do psql:

```bash
ALTER USER postgres WITH PASSWORD 'admin';
```

❗ Erro: banco de dados "vagas-api" não existe?
Ainda no psql, crie o banco:

```bash
CREATE DATABASE "vagas-api";
```

✅ Agora sim, tudo certo? Siga com as migrations!

```bash
npm run migration:run
```

---

<a id="documentação"></a>

## 📜 Documentação

Quando você iniciar o seu servidor local, a documentação Swagger vai estar rodando em

```bash
http://localhost:{PORT}/api
```

Se você quiser testar as rotas no Insomnia ou Postman, importe o arquivo `Documentação_Sou_Junior.json` e as rotas serão configuradas automaticamente.

---

<a id="stack_utilizada"></a>

## Stack utilizada ⚙

**Linguagens:**
<img align="center" alt="TypeScript" src="https://img.shields.io/badge/-Typescript-blue?style=for-the-badge&logo=typescript&message=TypeScript&color=blue&logoColor=white">

**Frameworks:**
<img align="center" alt="node js" src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white"> <img align="center" alt="Nestjs" src="https://img.shields.io/badge/-NestJS-pink?style=for-the-badge&logo=nestjs&message=NestJs&color=rgb(238,%2058,%2084)"> <img align="center" src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white">

**Ferramentas:**
<img align="center" src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia">
<img align="center" src="https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white" alt="Visual Studio">
<img align="center" src="https://img.shields.io/badge/-Docker-blue?style=for-the-badge&logo=docker&logoColor=white" alt="docker">

## DevOps

> [!WARNING]
> Vagas Web App utiliza API disponível em https://motor-vagas.onrender.com/docs/
> O que, pela URL, indica possibilidade do repo "vagas-api" não estar sendo utilizado

> [!TIP]
> Caso não esteja sendo utilizado, atualizar README apontando para o novo repositório e arquivar repositório vagas-api

> [!CAUTION]
> Pull Requests para main atualizam a imagem docker de produção

> [!TIP]
> Atualizar "Deploy to Production", removendo "on: pull_request: branches: [main]"

> [!IMPORTANT]
> Repositório possui github workflow para deploy de homologação, mas commit mais recente foi um PR direto para main

> [!WARNING]
> AWS ECR e Railway configurados para o mesmo repo

```mermaid
sequenceDiagram
    actor Dev as Desenvolvedores
    participant Git as GitHub
    participant Rail as Railway
    participant Actions as GitHub Actions
    participant ECR as AWS ECR

    Note over Dev,ECR: Fluxo de Deploy com Preview

    Dev->>Git: Abre Pull Request (PR) para main
    Git->>Actions: Novo Evento: PR criada
    Actions->>Actions: Cria imagem Docker
    Actions->>ECR: Atualiza imagem Docker "$REGISTRY/vagas:latest"
    ECR->>Actions: Imagem "$REGISTRY/vagas:latest" atualizada
    Actions-->>Git: Deploy de Produção atualizado

    Note over Dev,ECR: Loop de desenvolvimento
    
    Dev->>Git: Aprova e mergeia PR para main
    par
        Git->>Rail: Novo Evento: Branch main atualizada
        Rail-->>Git: Deploy de Produção "*.up.railway.app" atualizado
    and
        Git->>Actions: Novo Evento: Branch main atualizada
        Actions->>Actions: Cria imagem Docker
        Actions->>ECR: Atualiza imagem Docker "$REGISTRY/vagas:latest"
        ECR-->>Actions: Imagem "$REGISTRY/vagas:latest" atualizada
        Actions-->>Git: Deploy de Produção atualizado
    end
```

---
## 👨‍💻 Equipe Back-end

### 👑 Headers
| ![Lucas Rigon](https://avatars.githubusercontent.com/u/12602062?v=4) <br> [Lucas Rigon](https://github.com/rigonlucas) | ![Ricardo Machado](https://avatars.githubusercontent.com/u/86207761?v=4) <br> [Ricardo Machado](https://github.com/wolwerr) |
|:--:|:--:|

### 🚀 Devs
| ![Larissa Sarapio](https://avatars.githubusercontent.com/u/129699975?v=4) <br> [Larissa Sarapio](https://github.com/larisarapio) | ![José Lázaro](https://avatars.githubusercontent.com/u/18354026?v=4) <br> [José Lázaro](https://github.com/joselazarojunior) | ![Lázaro Bodevan](https://avatars.githubusercontent.com/u/23053276?v=4) <br> [Lázaro Bodevan](https://github.com/lazarobodevan) | ![Leidejane da Rosa](https://avatars.githubusercontent.com/u/113060357?v=4) <br> [Leidejane da Rosa](https://github.com/LeidejanedaRosa) | ![Tiago Souza Dias](https://avatars.githubusercontent.com/u/126430816?v=4) <br> [Tiago Souza Dias](https://github.com/tiago0214) | ![João Matos](https://avatars.githubusercontent.com/u/117475547?v=4) <br> [João Matos](https://github.com/joaovicttorbm) |
|:--:|:--:|:--:|:--:|:--:|:--:|

### 🧠 Mentores
| ![Mikael Melo](https://avatars.githubusercontent.com/u/85139137?v=4) <br> [Mikael Melo](https://github.com/MikaelMelo1) |
|:--:|

### 💼 Ex-contribuidores
| ![Leonardo Monteiro](https://avatars.githubusercontent.com/u/75804508?v=4) <br> [Leonardo Monteiro](https://github.com/lmmagalhaes) | ![Daniel Vinhas](https://avatars.githubusercontent.com/u/95504029?v=4) <br> [Daniel Vinhas](https://github.com/vinhas93) | ![Joana D'arc](https://avatars.githubusercontent.com/u/95653155?s=96&v=4) <br> [Joana D'arc](https://github.com/Joanadarknes) | ![Audinéia Carmo](https://avatars.githubusercontent.com/u/56273265?v=4) <br> [Audinéia Carmo](https://github.com/audicarmo) | ![Bruno](https://avatars.githubusercontent.com/u/88730176?v=4) <br> [Bruno](https://github.com/brunodev21) | ![Leonardo Reis](https://avatars.githubusercontent.com/u/96137175?v=4) <br> [Leonardo Reis](https://github.com/LeonardoReis86) |
|:--:|:--:|:--:|:--:|:--:|:--:|

### 💡 Idealizador do projeto
| ![Wouerner Brandão](https://avatars.githubusercontent.com/u/287287?v=4) <br> [Wouerner Brandão](https://github.com/) |
|:--:|

---

## Feedback

Se você tiver algum feedback, por favor nos deixe saber por meio do nosso fazendo uma [contribuição](#contribuição).

## Contribuição

Contribuições são sempre bem-vindas!

## Usado por

Esse projeto é usado pela [SouJunior](https://github.com/SouJunior).

---

### [Voltar ao 🔝](#linkedin_backend)
