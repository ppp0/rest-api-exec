FROM node:lts-slim
WORKDIR /opt
COPY package* ./
COPY src/ ./src
ADD https://github.com/krallin/tini/releases/download/v0.19.0/tini-static /usr/local/bin/tini
RUN chmod +x /usr/local/bin/tini && npm install
EXPOSE 1337

ENTRYPOINT ["tini", "-g", "--", "node", "src/server.js"]
