# 📦 THM Asset Management Webapplikation

Diese Webapplikation wurde im Rahmen eines Projekts zur Verwaltung von Assets entwickelt. Sie besteht aus einem **Frontend (React)**, einem **Backend (Express/Node.js)** und einer **MongoDB-Datenbank** – alles vollständig über **Docker Compose** containerisiert und lokal ausführbar.

## ✅ Systemvoraussetzungen

Um die Anwendung auszuführen, wird lediglich Folgendes benötigt:
- **Docker** (mind. Version 20.10)
- **Docker Compose** (integriert oder separat installiert)
- Ein Betriebssystem mit Terminalunterstützung (Linux, macOS, Windows mit WSL oder PowerShell)

## 🚀 Lokale Ausführung (Deployment)

### 1. Projekt entpacken 
```bash
unzip THMApp.zip
cd THMApp
```

### 2. Docker Container starten
```bash
docker compose up --build
```
⏳ Dieser Befehl baut alle Services (MongoDB, Backend, Frontend) und startet sie in drei Containern.

### 3. Zugriff auf die Anwendung

| Komponente         | URL                              |
|--------------------|-----------------------------------|
| 🌐 Frontend        | http://localhost:3000             |
| ⚙️ Backend (API)   | http://localhost:5000/api         |
| 📘 Swagger UI      | http://localhost:5000/api-docs    |
| 🛢️ MongoDB         | Läuft intern auf `mongo:27017`    |

## 📁 Projektstruktur

```
THMApp/
├── client/           → React Frontend
├── server/           → Express Backend
├── docker-compose.yml
└── README.md
```

## 📂 Datenhaltung

Die MongoDB-Daten werden im Docker-Volume **`mongo-data`** gespeichert und bleiben auch nach einem Neustart erhalten. Du kannst sie einsehen mit:
```bash
docker exec -it mongo mongosh
```

## ❌ Container stoppen
```bash
docker compose down
```
Optional: mit `--volumes` löschst du auch die gespeicherten Daten.

## ℹ️ Weitere Hinweise

- Die App ist responsive und mobilfähig.
- Alle Daten können exportiert werden (z. B. als Excel).
- Die Applikation ist über den mobilen Browser ohne App-Store-Installation nutzbar.
- API-Tests wurden via Swagger dokumentiert.

**📧 Kontakt bei Rückfragen:**  
Luca Rahm  
📩 luca.rahm7@gmail.com  
📱 +41 78 899 20 95