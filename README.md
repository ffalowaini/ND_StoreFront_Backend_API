# ND_StoreFront_Backend_API

## Running Script
- First run "npm i" to install required packages
- create new db with name "online-store" & "online-store-test" then run the migration by "db-migrate up"
- To build the project use: "npm run build"
- To run Jasmine unit testing use: "npm run test"
- To run the project use: "npm run start"
- To run the project after build use: "node ./build"

## DataSorce
- port -- 5432
- ip -- localhost
- db name -- online-store
- db schema

Product 
    id -- serial -- primary key
    name -- varchar
    price -- int

Users
    id -- serial -- primary key
    firstName -- varchar
    lastName -- varchar
    password -- varchar

Statuses
    id -- serial -- primary key
    name -- varchar

Order
    id --  serial -- primary key
    statusId -- int
    userId -- int

productOrder
    id -- serial -- primary key
    productId -- int
    quantity -- int
    orderId -- int



## Environment variable
POSTGRES_HOST= 127.0.0.1
POSTGRES_DB=online-store
POSTGRES_TEST_DB=online-store-test
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password123
BCRYPT_PASSWORD=test
SALT_ROUNDS=10
TOKEN_SECRET=test123
ENV=dev




## Endpoints to test see the project
* some endpoint needs a token, you can get it after run add user api


## API Endpoints
#### Products
- Index -- http://localhost:3000/product [get]
- Show -- http://localhost:3000/product [get]
- Create [token required] -- http://localhost:3000/product [post]

#### Users
- Index [token required] -- http://localhost:3000/users [get]
- Show [token required] -- http://localhost:3000/users [get]
- Create N[token required] -- http://localhost:3000/users [post]

#### Orders
- Current Order by user (args: user id)[token required] -- http://localhost:3000/orders [get]
- Create Order [token required]  -- http://localhost:3000/orders [post]
- Add Product To Order [token required] -- http://localhost:3000/orders [post]
