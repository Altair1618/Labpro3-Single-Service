# Labpro 3rd Selection (Single Service)
A Single Service Backend Server for Shopping App built with ExpressJS developed for Programming Lab Selection. The specification of this app can be seen [here](https://docs.google.com/document/d/1XERd5-yRuU-R7vK4Oe4REnQ4Nm8gL_bvDc37QQ7DoXI/edit).

## Author
- Farhan Nabil Suryono (13521114)

## How To Run
- Clone this repository
- Fill the .env file with your own credentials
- Run `docker-compose up` command inside the repository folder
- Server is started on docker image

## Design Pattern
1. Design Pattern Singleton </br>
Singleton is a design pattern that restricts the instantiation of a class to one object. In this project, singleton is used to create a single instance Prisma Client that can be used in all files. This is done to prevent multiple instances of Prisma Client for efficiency purposes. </br>
2. Design Pattern Chain of Responsibility </br>
Chain of Responsibility is a design pattern that allows us to divide many process into multiple handlers so that each handler only need to process a specific task. In this project, chain of responsibility is used in middlewares. For instances, middleware validateJWT will only validate the JWT token and pass the request to the next middleware. </br>
3. Design Pattern Decorator </br>
Decorator is a design pattern that allows a new functionality to be added to an existing object without altering its structure. In this project, decorator is used in data validation middleware to validate the received data using Zod. </br>

## Bonus
1. This project is deployed on vercel and can be accessed [here](https://labpro3-single-service.vercel.app/)
2. This project is built using TypeScript with strict mode enabled

## Tech Stacks
- bcryptjs (v2.4.3)
- express (v4.18.2)
- jsonwebtoken (v9.0.1)
- prisma (v4.16.2)
- zod (v3.21.4)

## Endpoints
<table>
    <thead>
        <td>Endpoint</td>
        <td>Description</td>
    </thead>
    <tbody>
        <tr>
            <td>POST `/login`</td>
            <td>Login to System</td>
        </tr>
        <tr>
            <td>GET `/self`</td>
            <td>Get Current Authenticated User Data</td>
        </tr>
        <tr>
            <td>GET `/barang`</td>
            <td>Get All Item Data with Query</td>
        </tr>
        <tr>
            <td>GET `/barang/:id`</td>
            <td>Get An Item Data by Id</td>
        </tr>
        <tr>
            <td>POST `/barang`</td>
            <td>Add New Item to Database</td>
        </tr>
        <tr>
            <td>POST `/buy/:id`</td>
            <td>Buy Item on Id</td>
        </tr>
        <tr>
            <td>PUT `/barang/:id`</td>
            <td>Update Item Data by Id</td>
        </tr>
        <tr>
            <td>DELETE `/barang/:id`</td>
            <td>Delete Item Data by Id</td>
        </tr>
        <tr>
            <td>GET `/perusahaan`</td>
            <td>Get All Company Data with Query</td>
        </tr>
        <tr>
            <td>GET `/perusahaan/:id`</td>
            <td>Get A Company Data by Id</td>
        </tr>
        <tr>
            <td>POST `/perusahaan`</td>
            <td>Add New Company to Database</td>
        </tr>
        <tr>
            <td>PUT `/perusahaan/:id`</td>
            <td>Update Company Data by Id</td>
        </tr>
        <tr>
            <td>DELETE `/perusahaan/:id`</td>
            <td>Delete Company Data by Id</td>
        </tr>
    </tbody>
</table>