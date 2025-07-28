#!/bin/sh
set -e

echo "🔧 Generando archivo .env desde variables de entorno..."

# Extraer variables VITE_ y guardarlas en .env
printenv | grep '^VITE_' > .env

if [ ! -s .env ]; then
  echo "⚠️  No se encontraron variables VITE_ en el entorno."
else
  echo "✅ Variables VITE_ escritas en .env:"
  cat .env
fi

echo "📦 Instalando dependencias..."
npm install --frozen-lockfile

echo "🏗 Ejecutando build de Vite..."
npm run build

echo "🚀 Sirviendo aplicación con 'serve'..."
npm install -g serve
serve -s dist -l 3000
