# Todo Backend API
---

## Environment Variables

Create a `.env` file:
```
PORT=4000
DB_URL=mongodb+srv://root:Saad2002@myfirstprojectcluster.fvuwkr4.mongodb.net/?appName=MyFirstProjectCluster

JWT_SECRET=supersecretkey123ffff
JWT_EXPIRES_IN=1h
```
---

## Tech Stack 
```
node.js → express with typescript
Tools :
 - Validation : TypeBox Validation
 - Authentication & Authorization : JWT, and CASL with (User Role)
 - SQL Database : drizzle, Postgres SQL - MongooseBD NoSQL ,and Table Plus
 - NoSQL Database :  MongooseBD NoSQL
 - Documentation : swagger and postman
 - others : Git, Github 

 Design Patterns: 
 - Dependency Injection
 - Express Adapter
 - Validation Adapter
 - Success Response Adapter 
 - Error and Auth Middleware
 - Rate limit request Middleware
 - Error handle (ensure)
```
---

## Project Flow
```
request → adapter → controller → service → mapper → repository → response
```

---

## Run Project

```
pnpm install
pnpm run dev
```

Server runs on:

```
http://localhost:4000
```

---

## Swagger API Docs

```
http://localhost:4000/api-docss
```

---

## DATABASE Connect Table Plus or drizzle studio 

```
Host: localhost
Port: 5432
User: salzarea
Password: 1234
Database: todo_app
```
```
https://local.drizzle.studio
```

---

## Test Users

**User**
```
{
  "email": "user1@test.com",
  "password": "123456"
}
```
**Admin**
```
{
  "email": "admin1@test.com",
  "password": "123456"
}
```
**Super Admin**
```
{
  "email": "superadmin1@test.com",
  "password": "123456"
}
```
