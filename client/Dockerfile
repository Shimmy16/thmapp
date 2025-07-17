# Schritt 1: Build-Phase mit Node
FROM node:20-alpine AS build
WORKDIR /app

# Installiere Abhängigkeiten
COPY package*.json ./
RUN npm install

# Kopiere gesamten Code inkl. public/ Ordner
COPY . .

# Baue das Frontend (Vite inkludiert automatisch public/* in dist/)
RUN npm run build

# Schritt 2: Produktionsserver mit Nginx
FROM nginx:alpine

# Kopiere das gebaute Frontend in den Nginx-Ordner
COPY --from=build /app/dist /usr/share/nginx/html

# Kopiere die Nginx-Konfiguration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
