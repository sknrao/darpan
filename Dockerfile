FROM node:23

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

RUN npm install

EXPOSE 5173

RUN chmod -R 755 /app

CMD ["npm", "run", "dev"]
