FROM node:16-alpine AS builder

WORKDIR /user/app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:16-alpine

COPY --from=builder /user/app/node_modules ./node_modules
COPY --from=builder /user/app/package*.json ./
COPY --from=builder /user/app/dist ./dist

EXPOSE 3000

CMD ["npm","run","start:prod"]