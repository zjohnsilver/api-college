FROM node:9.9.0-alpine

WORKDIR /src

COPY package.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]