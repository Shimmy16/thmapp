# server/Dockerfile

FROM node:20
WORKDIR /app

# Nur package.json & lockfile kopieren und installieren
COPY package*.json ./
RUN npm install

# Quellcode + swagger.yaml kopieren
COPY . .

# TypeScript-Code bauen
RUN npm run build

# ← WICHTIG: swagger.yaml manuell ins dist/ kopieren
RUN cp ./swagger.yaml ./dist/swagger.yaml

# Anwendung starten
CMD ["npm", "start"]
