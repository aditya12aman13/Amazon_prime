# Amazon Prime Video Clone

A full-stack replica of Amazon Prime Video built with **React**, **Node.js**, **Express**, **Sequelize**, and **SQLite**.

## Features
- 🎬 **Hero Banner** with featured movie carousel
- 📺 **Movie Rows** organized by category (Top 10, Bollywood, Hollywood, etc.)
- 🔐 **Authentication** — Login, Signup, JWT-based sessions
- 👤 **Profile Management** — Edit name and email
- 🛡️ **Admin Dashboard** — Add, edit, and delete movies (Superuser only)
- 🎨 **Amazon Prime UI** — Dark theme with Tailwind CSS

## Tech Stack
| Layer    | Technology                     |
|----------|--------------------------------|
| Frontend | React (Vite), Tailwind CSS     |
| Backend  | Node.js, Express               |
| Database | SQLite via Sequelize ORM       |
| Auth     | JSON Web Tokens (JWT), bcrypt  |

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/suyogshelke/Amazon-Prime-.git
cd "Amazon-Prime-"
```

### 2. Setup Backend
```bash
cd backend
npm install
node seed.js     # Seeds the database with movies and admin user
node server.js   # Starts on http://localhost:5000
```

### 3. Setup Frontend
```bash
cd frontend
npm install
npm run dev      # Starts on http://localhost:5173
```

## Default Credentials

| Role       | Email             | Password  |
|------------|-------------------|-----------|
| Superuser  | admin@prime.com   | admin123  |
| Admin      | admin2@prime.com  | admin123  |

## API Endpoints

### Auth
- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login and receive JWT
- `GET /api/auth/profile` — Get logged-in user profile
- `PUT /api/auth/profile` — Update profile

### Movies
- `GET /api/movies` — List all movies
- `POST /api/movies` — Add movie (Admin only)
- `PUT /api/movies/:id` — Update movie (Admin only)
- `DELETE /api/movies/:id` — Delete movie (Admin only)

## Screenshots
The UI replicates the Amazon Prime Video experience with a dark theme, horizontal scroll rows, hero banner, and responsive navigation.

## License
MIT
