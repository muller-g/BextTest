# Dockerfile para Next.js
FROM node:18-alpine

WORKDIR /app

# Copia todos os arquivos do projeto para o container
COPY . .

ENV NEXT_PUBLIC_API_URL=http://localhost:3001

RUN yarn install
RUN yarn build

EXPOSE 3000

CMD ["npm", "run", "dev"]
