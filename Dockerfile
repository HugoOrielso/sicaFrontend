# Etapa 1: Build
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: Producción
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html

# Copiar configuración opcional de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
