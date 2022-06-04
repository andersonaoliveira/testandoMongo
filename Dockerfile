FROM node:latest
LABEL maintainer="Anderson Oliveira"
COPY . /var/www
WORKDIR /var/www
RUN npm install node@17.7.2
RUN npm install express@4.18.1
RUN npm install mongoose@6.3.5
RUN node . /apipokemon/mongodb/server.js
ENTRYPOINT node index.js
EXPOSE 3000