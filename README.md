# ND_StoreFront_Backend_API

## Running Script
- To build the project use: "npm run build"
- To run Jasmine unit testing use: "npm run test"
- To run the project use: "npm run start"
- To run the project after build use: "node ./build"


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
