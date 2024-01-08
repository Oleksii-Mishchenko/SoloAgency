# Використовуйте офіційний образ Node.js як базовий образ
FROM node:21

# Встановити робочий каталог /app
WORKDIR /app

# Копіювати package.json та package-lock.json
COPY frontend/package*.json .

# Встановити залежності та запустити додаткові команди
RUN npm install -g npm@10.2.5; npm cache clean --force

# Копіювати решту коду додатка
COPY frontend/ .

# Відкрити порт, на якому буде працювати React-додаток
EXPOSE 3000

# Команда для запуску додатка у режимі розробки
CMD ["npm", "install", "--legacy-peer-deps", "&&", "npm", "run", "dev"]
