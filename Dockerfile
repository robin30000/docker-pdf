FROM node:12-slim

WORKDIR /app

COPY packaje*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]



