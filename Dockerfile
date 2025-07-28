FROM node:20-alpine

WORKDIR /app

# Copiar proyecto completo
COPY . .

# Copiar y dar permisos al entrypoint
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Puerto que usará `serve`
EXPOSE 3000

ENTRYPOINT ["/entrypoint.sh"]
