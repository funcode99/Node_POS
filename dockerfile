FROM node:lts-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install -g nodemon

RUN npm install

EXPOSE 1999

CMD ["npm", "start"]
