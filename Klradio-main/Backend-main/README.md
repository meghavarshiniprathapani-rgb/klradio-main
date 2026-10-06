🎙️ Radio Station Management System – Backend

A role-based backend system for managing a radio station’s daily operations such as scripts, announcements, podcasts, news assignments, and song suggestions.
Built with Node.js, Express, MySQL, Sequelize, and JWT authentication.

🚀 Features
🔐 Authentication

Username-based Signup & Login

Role-based access using JWT

Supported roles:

station_head

creative

rj

technical

✍️ Creative Role

Create, update, delete Scripts

Mark one script as Live

Create & manage Announcements

Create & assign Podcast Scripts to RJs

Fetch news from external API

Assign and save news for RJs

🎙️ RJ Role

View Live Script

View Assigned News

View Announcements

View assigned Podcast Scripts

Mark podcasts as Completed

🎛️ Technical Role

View Live Script

View Song Suggestions from public users

Delete song suggestions after playing

🌍 Public Access

View public Announcements

Submit Song Suggestions

🛠️ Tech Stack

Node.js

Express

MySQL

Sequelize ORM

JWT Authentication

bcryptjs

dotenv

📁 Project Structure
backend/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── config/
│   ├── app.js
│   └── server.js
├── .env
├── package.json
└── README.md

▶️ Running the Backend
Install dependencies
npm install

Start server
npm start


You should see:

Server running


Backend will run on:

http://localhost:5000

🔌 API Endpoints Overview
Auth
POST /api/auth/signup
POST /api/auth/login

Creative
POST   /api/creative/scripts
GET    /api/creative/scripts
PATCH  /api/creative/scripts/:id/live

POST   /api/creative/announcements
GET    /api/creative/announcements

POST   /api/creative/podcasts
GET    /api/creative/podcasts

News
GET  /api/news/fetch
POST /api/news/save

RJ
GET   /api/rj/live-script
GET   /api/rj/podcasts
PATCH /api/rj/podcasts/:id/complete
GET   /api/rj/news
GET   /api/rj/announcements

Technical
GET    /api/technical/live-script
GET    /api/technical/song-suggestions
DELETE /api/technical/song-suggestions/:id

Public
GET  /api/public/announcements
POST /api/public/song-suggestion

🧪 Testing

All APIs can be tested using Postman

Protected routes require:

Authorization: Bearer <JWT_TOKEN>

🔐 Security Notes

Passwords are hashed

JWT used for authorization

Role-based route protection

Public users cannot access internal data

