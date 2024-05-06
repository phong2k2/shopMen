FROM node:alpine

EXPOSE 3000

WORKDIR ./src

COPY package.json package-lock.json ./

USER node

RUN npm install

COPY . .

CMD ["node", "index.js"]