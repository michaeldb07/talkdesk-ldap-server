FROM node:16

WORKDIR /app

COPY package*.json ./
RUN npm config set strict-ssl false && \
    npm install

COPY . .

EXPOSE 389 636 3000
CMD ["node", "./src/server.js"]
