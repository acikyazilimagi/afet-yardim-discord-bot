FROM node:18-alpine

RUN apk add --no-cache bash tini

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 80

ENTRYPOINT ["/sbin/tini", "--"]

CMD ["node", "bot.js"]