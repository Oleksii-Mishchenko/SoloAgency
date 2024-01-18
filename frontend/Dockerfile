FROM node:21.2.0

WORKDIR /app
COPY frontend/package*.json ./
RUN npm install

COPY . .

CMD ["npm", "run", "dev"]
#CMD ["sleep", "80000"]