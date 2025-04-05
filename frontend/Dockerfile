# Этап сборки
FROM node:18 AS builder
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package.json package-lock.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код
COPY . .

# Собираем приложение
RUN npm run build

# Создаем папку dist и копируем туда необходимые файлы
RUN mkdir -p /app/dist && \
    cp -r /app/.next /app/dist/.next && \
    cp -r /app/public /app/dist/public && \
    cp -r /app/node_modules /app/dist/node_modules && \
    cp /app/package.json /app/dist/package.json

# Этап запуска
FROM node:18-alpine
WORKDIR /app

# Копируем файлы из папки dist
COPY --from=builder /app/dist /app

# Указываем порт
EXPOSE 3000

# Запускаем приложение
CMD ["npm", "start"]