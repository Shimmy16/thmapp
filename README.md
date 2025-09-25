# 📦 THM Asset Management Webapplikation

Diese Webapplikation wurde im Rahmen eines Projekts zur Verwaltung von Assets entwickelt.  
Sie besteht aus einem **Frontend (React)**, einem **Backend (Express/Node.js)** und einer **MongoDB-Datenbank** – alles vollständig über **Docker Compose** containerisiert und lokal ausführbar.

---

## ✅ Systemvoraussetzungen

Um die Anwendung auszuführen, wird lediglich Folgendes benötigt:

- **Docker** (mind. Version 20.10)
- **Docker Compose** (integriert oder separat installiert)
- Ein Betriebssystem mit Terminalunterstützung (Linux, macOS, Windows mit WSL oder PowerShell)

---

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

---

## 🌐 Zugriff auf die Anwendung (lokal)

| Komponente         | URL                              |
|--------------------|-----------------------------------|
| 🌐 Frontend        | http://localhost:3000             |
| ⚙️ Backend (API)   | http://localhost:5000/api         |
| 📘 Swagger UI      | http://localhost:5000/api-docs    |
| 🛢️ MongoDB         | Läuft intern auf `mongo:27017`    |

---

## 📱 Zugriff über Smartphone / Tablet

Wenn sich Smartphone und Hostsystem im selben WLAN befinden, kann die Applikation auch über den mobilen Browser aufgerufen werden:

1. **Lokale IP-Adresse des Hostsystems ermitteln:**

   - Windows:  
     ```bash
     ipconfig
     ```
     und die IPv4-Adresse suchen (z. B. `192.168.1.100`)

   - macOS/Linux:  
     ```bash
     ifconfig
     ```
     oder  
     ```bash
     hostname -I
     ```

2. **Aufruf im mobilen Browser (gleicher Port wie lokal):**

   - Frontend:  
     `http://<IP-ADRESSE-DES-HOSTS>:3000`

     z. B. `http://192.168.1.100:3000`

3. **Voraussetzung:**  
   - Die **Firewall des Hostsystems** muss Port **3000** (und ggf. 5000 für die API) für das lokale Netzwerk freigeben.
   - Das Smartphone muss sich im **selben lokalen Netzwerk (WLAN)** befinden.

---

## 📁 Projektstruktur

```
THMApp/
├── client/              → React Frontend
├── server/              → Express Backend
├── docker-compose.yml   → Multi-Service Deployment
└── README.md
```

---

## 📂 Datenhaltung

Die MongoDB-Daten werden im Docker-Volume **`mongo-data`** gespeichert und bleiben auch nach einem Neustart erhalten.

Einsehen der Datenbank:
```bash
docker exec -it mongo mongosh
```

---

## 🛑 Container stoppen

```bash
docker compose down
```

Optional: Mit `--volumes` können zusätzlich alle gespeicherten Daten gelöscht werden.

---

## ℹ️ Weitere Hinweise

- Die App ist **responsiv** und vollständig **mobilfähig**.
- Zugriff erfolgt **browserbasiert** – keine App-Installation notwendig.
- API-Endpunkte sind via Swagger dokumentiert.
- Datenexport (z. B. als Excel) ist vorgesehen.

---

## 👤 Kontakt

**Luca Rahm**  
📧 luca.rahm7@gmail.com  
📱 +41 78 899 20 95