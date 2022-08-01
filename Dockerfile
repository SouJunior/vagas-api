FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install --verbose

COPY . .

EXPOSE 3000 

CMD [ "npm", "run", "dev" ]
