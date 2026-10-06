# KL Radio — Campus Live Radio & Music Broadcast Portal
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![Security Audit](https://img.shields.io/badge/security-audited-blue.svg)]()
[![Tech Stack](https://img.shields.io/badge/stack-TypeScript-informational.svg)]()
[![License](https://img.shields.io/badge/license-private-lightgrey.svg)]()

## Overview
KL Radio is a comprehensive campus broadcasting and digital radio station portal engineered for university students and RJ broadcasters. The platform combines a Next.js frontend, an Express + FastAPI backend architecture, WebRTC real-time audio signaling, and a PostgreSQL database for live song requests, program scheduling, and campus podcasts.

- **Problem Solved:** Modernizing university campus radio broadcasting with real-time digital song requests and WebRTC live streaming.
- **Target Users:** University students, campus radio jockeys (RJs), and station managers.
- **Current Status:** Advanced Multi-Service Portal.

## Features
- **Live Radio Streaming:** Low-latency WebRTC and HLS streaming audio playback.
- **Song Request Queue:** Interactive student song suggestion portal with live upvoting.
- **Broadcast Schedule:** Weekly timetable of shows, RJs on-air, and campus announcements.
- **RJ Admin Panel:** Moderation interface for live broadcasters to approve song requests and review chat.

## Architecture
```mermaid
flowchart TD
    Listener["Student / Listener"] --> WebUI["Next.js Web Portal (Port 3000)"]
    RJ["Radio Jockey / Broadcaster"] --> AdminUI["RJ Admin Panel"]
    WebUI --> API["Express.js API (Port 5000)"]
    AdminUI --> API
    WebUI --> RTC["FastAPI WebRTC Signaling (Port 8000)"]
    API --> PG[("PostgreSQL Database")]
```

## User Flow
```mermaid
sequenceDiagram
    autonumber
    actor Student as University Student
    participant Web as KL Radio Portal (Port 3000)
    participant API as Express API (Port 5000)
    participant Stream as FastAPI WebRTC Signaling (Port 8000)
    actor RJ as Campus Radio Jockey

    Student->>Web: Open KL Radio live stream
    Web->>Stream: Request WebRTC audio stream handshake
    Stream-->>Web: Establish low-latency audio stream
    Web-->>Student: Play live radio broadcast
    Student->>Web: Submit song request via request box
    Web->>API: POST /api/requests (songTitle, studentRoll)
    API-->>RJ: Push real-time request to RJ Live Studio panel
    RJ->>Web: Accept song request for upcoming playlist queue
```

## Technology Stack
| Layer | Technology | Purpose |
|---|---|---|
| Frontend | Next.js 15, React, Tailwind CSS | Radio player, request portal, and RJ dashboard |
| Application API | Node.js, Express.js | User authentication, request queue, program guide |
| Streaming Core | Python, FastAPI, WebRTC / aiortc | Real-time low-latency audio distribution |
| Database | PostgreSQL | Relational storage for users, requests, schedules |

## Infrastructure
- **Frontend Port:** 3000
- **Express Backend Port:** 5000
- **Streaming Core Port:** 8000
- **Database Port:** 5432 (PostgreSQL)

## Project Structure
```text
Klradio/
├── Backend-main/        # Express.js REST API & PostgreSQL connection
├── frontend-main/       # Next.js interactive web radio application
├── signaling/           # FastAPI / WebRTC audio signaling service
├── .gitignore           # Git ignore definitions
└── README.md            # Technical documentation
```

## Prerequisites
- Node.js >= 18.x
- Python >= 3.10
- PostgreSQL >= 14.0

## Environment Variables
Copy `Backend-main/.env.example` to `Backend-main/.env`:
```env
PORT=5000
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/klradio
JWT_SECRET=your_jwt_secret_key
```
Copy `frontend-main/.env.example` to `frontend-main/.env.local`:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
NEXT_PUBLIC_STREAM_URL=http://localhost:8000/stream
```

## Local Development Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/Bhanutejanallamothu/Klradio.git
   cd Klradio
   ```
2. Start Backend:
   ```bash
   cd Backend-main && npm install && cp .env.example .env && npm start
   ```
3. Start Signaling (in another terminal):
   ```bash
   cd ../signaling && pip install -r requirements.txt && python server.py
   ```
4. Start Frontend (in another terminal):
   ```bash
   cd ../frontend-main && npm install && npm run dev
   ```
5. Tune in at `http://localhost:3000`.

## Docker Setup
*Not detected in repository. Multi-service Docker Compose configuration recommended.*

## Database Setup
Initialize PostgreSQL database:
```sql
CREATE DATABASE klradio;
```

## API Documentation
- `GET /api/schedule` - Retrieve upcoming radio programming.
- `POST /api/requests` - Submit a song request.
- `GET /api/requests/active` - List queued song requests for live RJ.

## Deployment
Deploy frontend on Vercel; deploy Express and FastAPI services on Render or AWS ECS.

## Security
- Input validation to prevent spam in song request chat.
- CORS policy restricts access to verified university domains.

## Testing
```bash
cd Backend-main && npm test
```

## Troubleshooting
- **Audio Stream Disconnected:** Ensure WebRTC signaling port 8000 is reachable and not blocked by firewall.

## Future Improvements
- Live podcast recording archive and playback on-demand.

## License
Campus initiative. All rights reserved by repository owner.
