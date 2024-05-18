FROM node:18-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install

ENV PORT=3000

EXPOSE ${PORT}

CMD [ "node", "index.js" ]