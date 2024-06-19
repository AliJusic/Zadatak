FROM node:21.4.0-alpine

RUN npm install -g nodemon

WORKDIR /APP

COPY package.json .

RUN npm install

COPY . .

EXPOSE 7000

CMD ["npm", "run", "dev"]
