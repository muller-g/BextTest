# Dockerfile para NestJS
FROM node:18-alpine

WORKDIR /app

# Copia todos os arquivos do projeto para o container
COPY . .

RUN yarn install
RUN yarn build

EXPOSE 3001

CMD ["npm", "run", "start:dev"]
