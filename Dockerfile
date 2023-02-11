FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
COPY . .

# for healthcheck
EXPOSE 80
CMD [ "node", "bot.js" ]