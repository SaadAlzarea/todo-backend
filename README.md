
# .env
<!-- app port -->
PORT=4000

<!-- DB connection -->
DB_URL=mongodb+srv://root:Saad2002@myfirstprojectcluster.fvuwkr4.mongodb.net/?appName=MyFirstProjectCluster

<!-- JWT -->
JWT_SECRET=supersecretkey123ffff
JWT_EXPIRES_IN=1h       


<!-- request cycle -->
request => adapter => controller => service => repo => response

# RUN USING
pnpm run dev


<!-- =-=-=-=-=- User Role -=-=-=-=-= -->
<!-- user -->
{
  "email": "user1@test.com",
  "password": "123456"
}
<!-- admin -->
{
  "email": "admin1@test.com",
  "password": "123456"
}
<!-- super admin -->
{
  "email": "superadmin1@test.com",
  "password": "123456"
}