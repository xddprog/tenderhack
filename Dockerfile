# Используем базовый образ Nginx
FROM nginx:latest

# Копируем ваш конфигурационный файл с хоста в контейнер
COPY ./nginx.conf /etc/nginx/nginx.conf

# Открываем порты
EXPOSE 80