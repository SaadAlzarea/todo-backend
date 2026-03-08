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

## Project Flow
```
request → adapter → controller → service → repository → response
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
http://localhost:4000/api-docs
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
