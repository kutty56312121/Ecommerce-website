# Server

ENV: copy `.env.example` to `.env` and fill values.

Scripts:
- dev: start with nodemon
- start: start node

API:
- GET /api/health
- POST /api/auth/signup
- POST /api/auth/login
- GET /api/auth/me
- GET /api/products
- GET /api/products/:id
- POST /api/products (admin)
- PUT /api/products/:id (admin)
- DELETE /api/products/:id (admin)
- GET /api/users (admin)