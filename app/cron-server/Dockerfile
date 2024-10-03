FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install && \
    npm audit fix && \
    npm install --package-lock-only

COPY src ./src

EXPOSE 3001

CMD ["node", "src/cronServer.js"]