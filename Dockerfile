FROM node:alpine

EXPOSE 3001

WORKDIR /opt/server

COPY ./src /opt/server/src
COPY *.json /opt/server/

ENV DB_HOST=localhost
ENV DB_PORT=5432
ENV PORT=3001
ENV DB_USER=postgres
ENV DB_PASS=postgres
ENV DB_NAME=gntech_db
ENV REDIS_HOST=localhost
ENV REDIS_PORT=6379

RUN npm i

CMD ["sh", "-c", "npm run migration:run && npm start"]