#  Social Network Backend API

This is a RESTful backend API for a simple social network application built with **Node.js**, **Express**, **TypeScript**, and **PostgreSQL**.

##  Features

- User registration and login
- Authentication using JWT
- Sending and accepting friend requests
- Preventing duplicate friend requests and friendships
- Retrieving incoming friend requests
- Getting a user's friends list
- User search by name and age

---

##  Technologies Used

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- JWT (jsonwebtoken)
- pg (PostgreSQL client)
- dotenv
- CORS

---

## Project Structure

src/
├── app.ts
├── server.ts
├── controllers/
├── services/
├── routes/
├── middleware/
├── utils/
├── database/
├── types/


---

##  Environment Variables

Create a `.env` file in your project root:

NODE_ENV=local
DATABASE_URL=postgresql://postgres:123@localhost:5432/postgres
PORT=3001
JWT_SECRET=""


---

##  Authorization

Authorization: Bearer <your_token>

##  Getting Started

---

```bash
git clone https://github.com/yourname/social-network-api.git
cd social-network-api

npm install

# Run with nodemon
npm run dev

```
## Swagger
local: http://localhost:3001/api-docs
dev: https://social-backend-production-3b37.up.railway.app/api-docs