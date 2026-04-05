FROM node:20-alpine as builder

WORKDIR /app

COPY ../headless-react/package*.json ./

RUN npm install

COPY ../headless-react/src ./src
COPY ../headless-react/public ./public
COPY ../headless-react/index.html ./index.html
COPY ../headless-react/vite.config.js ./vite.config.js
COPY ../headless-react/.env ./.env

RUN npm run build

FROM node:20-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
