FROM node:18-alpine3.17

WORKDIR /app

COPY package*.json ./
COPY . .

RUN yarn

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start:prod"]