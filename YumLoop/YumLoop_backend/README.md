# YumLoop Backend

## Setup

1. Clone the repository
2. Install dependencies:
   ```sh
   npm install
   ```
3. Copy `.env.example` to `.env` and fill in your values
4. Start the server:
   ```sh
   npm start
   ```

## Features
- REST API for social, e-commerce, and food delivery
- Real-time messaging with Socket.IO
- JWT authentication & role-based access
- File uploads with Multer
- Rate limiting, validation, and error handling

## Deployment
- Use the provided `Dockerfile` for containerized deployment

## Scripts
- `npm start` — start the server
- `npm run dev` — start with nodemon (if installed)

## Environment Variables
See `.env.example` for required variables. 