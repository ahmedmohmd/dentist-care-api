FROM node

WORKDIR /app

COPY prisma ./


COPY package.json yarn.lock ./

RUN yarn install

COPY . . 

RUN yarn run build

EXPOSE 3000

CMD ["yarn", "start"]
