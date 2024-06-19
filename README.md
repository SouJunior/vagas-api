<a id="linkedin_backend"></a>

![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=2088f2&style=for-the-badge)

# <h1 align="center"> [![Typing SVG](<https://readme-typing-svg.herokuapp.com/?color=ffffff&size=35&center=true&vCenter=true&width=1000&lines=Seja+bem+vindo(a)+ao+vagas-backend!>)](https://git.io/typing-svg) </h1>

<img width=150% src="https://capsule-render.vercel.app/api?type=waving&width=150%&color=2088f2&fontColor=ffffff&height=300&section=header&text=Sou%20Junior&fontSize=90&animation=fadeIn&fontAlignY=38&desc=Projeto%20Opensource%20para%20melhorar%20o%20match%20entre%20os%20profissionais%20Juniors%20e%20Empresas!&descAlignY=61&descAlign=52" />

## <p align="center"> Visitantes: <img alingn="center"  src="https://profile-counter.glitch.me/SouJunior/count.svg" /></p>

---

## Menu

### [Abrir e rodar o projeto](#abrir_e_rodar_o_projeto)

### [Acesso ao projeto](#acesso_ao_projeto)

### [Rodando Localmente](#rodando_localmente)

### [Rodando com Docker](#instalando_o_docker)

### [Stack Utilizada](#stack_utilizada)

### [Equipe Back-end](#equipe_do_backend)

### Pre requisitos:
* git
* docker
* insomnia

---

<a id="abrir_e_rodar_o_projeto"></a>

## 🛠️ Abrir e rodar o projeto


Clone o projeto na janela que abriu com o seguinte comando:

```bash
  git clone https://github.com/SouJunior/linkedin-backend.git
```


---

`docker-compose up -d`


O projeto vai estar rodando em:

`localhost:3000`

agora basta seguir para [Instalando o Insomnia](#instalando_o_insomnia)

---

<a id="acesso_ao_projeto"></a>

## 📁 Acesso ao projeto

Entre na pasta do projeto pelo Visual Studio, Abra o terminal do visual Studio e
vá para o diretório do projeto com o comando:

```bash
  cd vagas-api

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


Após a instalação do Wsl, vamos até a pasta do projeto e rodar o comando

`docker-compose up -d`


O projeto vai estar rodando em:

`localhost:3000`
  
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

## Head 🙎🏻‍♂️
| [<img src="https://avatars.githubusercontent.com/u/81826043?s=96&v=4" width=115><br><sub>Wanderson Santos</sub>](https://github.com/wandersonDeve) |
| :----------------------------------------------------------------------------------------------------------------------------: |

## Team lead 🙎🏻
| [<img src="https://cdn.discordapp.com/attachments/1011231850351558686/1047250060309712936/6E06CCD2-C5D1-445E-B9DE-F06FF1E797F7.png" width=115><br><sub>Amanda Fontes</sub>](#) |
| :----------------------------------------------------------------------------------------------------------------------------: |

## Devs 👨‍💻👨‍💻

| [<img src="https://avatars.githubusercontent.com/u/88009922?v=4" width=115><br><sub>Amaro Francisco</sub>](https://github.com/Amaro13) | [<img src="https://avatars.githubusercontent.com/u/100654478?v=4" width=115><br><sub>Ytallo Cesar</sub>](https://github.com/YtalloCesar2022) | [<img src="https://avatars.githubusercontent.com/u/98703647?v=4" width=115><br><sub>Pedro Igor</sub>](https://github.com/pedroigorsf)
| :------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------: |

## Mentores 🙎🏻‍♂️

| [<img src="https://avatars.githubusercontent.com/u/54317829?v=4" width=115><br><sub>Thiago Rodrigues</sub>](https://github.com/thiagorcode) | 
| :-----------------------------------------------------------------------------------------------------------------------------: |

## Ex contribuidores 🙎🏻‍♂️🙎🏻

| [<img src="https://avatars.githubusercontent.com/u/75804508?v=4" width=115><br><sub>Leonardo Monteiro</sub>](https://github.com/lmmagalhaes) | [<img src="https://avatars.githubusercontent.com/u/95504029?v=4" width=115><br><sub>Daniel Vinhas</sub>](https://github.com/vinhas93) | [<img src="https://avatars.githubusercontent.com/u/95653155?s=96&v=4" width=115><br><sub>Joana D'arc</sub>](https://github.com/Joanadarknes) | [<img src="https://avatars.githubusercontent.com/u/56273265?v=4" width=115><br><sub>Audinéia Carmo</sub>](https://github.com/audicarmo) | [<img src="https://avatars.githubusercontent.com/u/88730176?v=4" width=115><br><sub>Bruno</sub>](https://github.com/brunodev21)| [<img src="https://avatars.githubusercontent.com/u/96137175?v=4" width=115><br><sub>Leonardo Reis</sub>](https://github.com/LeonardoReis86) |
| :----------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------: |

## Idealizador do projeto 🙎🏻‍♂️

| [<img src="https://avatars.githubusercontent.com/u/287287?v=4" width=115><br><sub>Wouerner</sub>](https://github.com/wouerner) |
| :----------------------------------------------------------------------------------------------------------------------------: |

---

## Feedback

Se você tiver algum feedback, por favor nos deixe saber por meio do nosso fazendo uma [contribuição](#contribuição).

## Contribuição

Contribuições são sempre bem-vindas!

## Usado por

Esse projeto é usado pela [SouJunior](https://github.com/SouJunior).

---

### [Voltar ao 🔝](#linkedin_backend)
