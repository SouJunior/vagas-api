<a id="linkedin_backend"></a>

![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=2088f2&style=for-the-badge)

# <h1 align="center"> [![Typing SVG](<https://readme-typing-svg.herokuapp.com/?color=ffffff&size=35&center=true&vCenter=true&width=1000&lines=Seja+bem+vindo(a)+no+linkedin-backend!>)](https://git.io/typing-svg) </h1>

<img width=150% src="https://capsule-render.vercel.app/api?type=waving&width=150%&color=2088f2&fontColor=ffffff&height=300&section=header&text=Sou%20Junior&fontSize=90&animation=fadeIn&fontAlignY=38&desc=Projeto%20Opensource%20para%20melhorar%20o%20match%20entre%20os%20profissionais%20Juniors%20e%20Empresas!&descAlignY=61&descAlign=52" />

## <p align="center"> Visitantes: <img alingn="center"  src="https://profile-counter.glitch.me/SouJunior/count.svg" /></p>

---

## Menu

### [Como Instalar o git bash](#como_instalar_o_git_bash)

### [Abrir e rodar o projeto](#abrir_e_rodar_o_projeto)

### [Acesso ao projeto](#acesso_ao_projeto)

### [Rodando Localmente](#rodando_localmente)

### [Rodando com Docker](#rodando_com_docker)

### [Instalando o Insomnia](#instalando_o_insomnia)

### [Stack Utilizada](#stack_utilizada)

### [Equipe Responsáveis](#equipe_do_backend)

---

<a id="como_instalar_o_git_bash"></a>

## Como instalar o Git Bash <img align="center" width="20px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" />

O Git Bash faz parte do pacote Git for Windows, que é oferecido no próprio site oficial do Git, em: https://git-scm.com/download/win

---

<a id="abrir_e_rodar_o_projeto"></a>

## 🛠️ Abrir e rodar o projeto

1. Instalar o Git Bash em sua máquina. <br>
2. Criar uma pasta do projeto em seu computador. <br>
3. Clique com o botão direito do mouse na pasta e selecione o Git bash. <br>
4. Após abrir a janela, vamos dar início no clone do projeto.<br>

## ❗ Atenção, esse procedimento deve ser feito somente após o git Bash estar instalado em sua máquina!

Clone o projeto na janela que abriu com o seguinte comando:

```bash
  git clone https://github.com/SouJunior/linkedin-backend.git
```

Após isso pode fechar a janela!

---

<a id="acesso_ao_projeto"></a>

## 📁 Acesso ao projeto

Entre na pasta do projeto pelo Visual Studio, Abra o terminal do visual Studio e
vá para o diretório do projeto com o comando:

```bash
  cd linkedin-backend
```

Instale as dependências

```bash
  npm i
```

Feito a instalação dos pacotes basta renomear o arquivo `.env.example` para `.env` e preencher com as suas informações do banco de dados, no caso estamos usando o PostgreSQL

Arquivo .env

```bash
PORT=3000 #Porta que seu projeto vai rodar na sua maquina

# JWT
SECRET_KEY= qualquerStringAqui #Uma string qualquer, chave para gerar o JWT

# TYPEORM_CONNECTION
TYPEORM_CONNECTION=postgres
TYPEORM_HOST= #Host name do seu banco (geralmente quando esta na sua maquina fica localhost)
TYPEORM_PORT=5432 #A porta geralmente é 5432, se no seu caso for outra porta basta alterar
TYPEORM_USERNAME= # Seu usuario do banco postgress
TYPEORM_PASSWORD= # Sua senha do banco postgress
TYPEORM_DATABASE= # Sua database do banco de dados.
```

---

<a id="rodando_localmente"></a>

## 🌐 Rodando localmente

Inicie o servidor

```bash
  npm run start:dev
```

---

<a id="instalando_o_insomnia"></a>

## 🛠️ Instalando o insomnia

Link para baixar: https://insomnia.rest/download

1. Agora basta importar o arquivo `Documentação_Sou_Junior.json` que esta na raiz do projeto que você terá acesso a todos as rotas.

![image](https://user-images.githubusercontent.com/81826043/190295195-7b4ced82-7677-49f3-a789-c3f6a6f7e108.png)


2. Após fazer a importação, colar o link do navegador no local mostrado:

3. Agora basta navegar entre as pastas com as rotas do nossa API

![image](https://user-images.githubusercontent.com/81826043/190295785-4318101f-b890-444c-a007-526cdc55aa95.png)

4. Para editar a porta da url basta seguir os passos abaixo

![image](https://user-images.githubusercontent.com/81826043/190295982-87514dd1-3ad2-4496-a077-d35b413bf310.png)

## ❗ Atenção, É valido lembrar que a porta do link vai se basear no computador e na porta que o navegador está usando!

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

---

<a id="equipe_do_backend"></a>

## Devs 👨‍💻👨‍💻

| [<img src="https://avatars.githubusercontent.com/u/88730176?v=4" width=115><br><sub>Bruno</sub>](https://github.com/brunodev21) | [<img src="https://avatars.githubusercontent.com/u/81826043?s=96&v=4" width=115><br><sub>Wanderson Santos</sub>](https://github.com/wandersonDeve) |
| :-----------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------: |

## Mentores 🙎🏻‍♂️🙎🏻

| [<img src="https://avatars.githubusercontent.com/u/95653155?s=96&v=4" width=115><br><sub>Joana D'arc</sub>](https://github.com/Joanadarknes) | [<img src="https://avatars.githubusercontent.com/u/75804508?v=4" width=115><br><sub>Leonardo Monteiro</sub>](https://github.com/lmmagalhaes) | [<img src="https://avatars.githubusercontent.com/u/51898473?v=4" width=115><br><sub>Odilon Lima</sub>](https://github.com/OdilonLimaNeto) |
| :------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------: |

## Idealizador do projeto 🙎🏻‍♂️

| [<img src="https://avatars.githubusercontent.com/u/287287?v=4" width=115><br><sub>Wouerner</sub>](https://github.com/wouerner) |
| :----------------------------------------------------------------------------------------------------------------------------: |

---

## Feedback

Se você tiver algum feedback, por favor nos deixe saber por meio do nosso [Discord](https://discord.gg/R5RAxFVC). Ou fazendo uma [contribuição](#contribuição).

## Contribuição

Contribuições são sempre bem-vindas!

## Usado por

Esse projeto é usado pela [SouJunior](https://github.com/SouJunior).

---

### [Voltar ao 🔝](#linkedin_backend)
