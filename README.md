# AZGUARDS Assignment: Todo List Management System

## Overview
Develop a backend application using Node.js and Express.js to manage a todo list. Users can be able to perform CRUD operations on todo items, upload todo items from a CSV file, download the todo list in CSV format, and set a status flag for each todo item.

### API Documentation
Several API endpoints are available to perform operations. For detailed documentation, refer to the Postman collection.

[REST APIs - Postman Collection](https://documenter.getpostman.com/view/21633219/2sA3JNZzw5)

To generate a token, visit jwt.io and use the following payload:

```json
{
  "username": "test_user"
}
```

The secret token is `AZGUARDS SECRET`, and it should not be base64 encoded.

![jwt](jwt.png)

Sample JWT Token along with Header

`Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RfdXNlciIsImlhdCI6MTcxNTQzNDIyMH0.M3kNcadCj76a25H2a4BILzlD4c9wqOjkLefIjiyJGAo`

### Steps to Run the Server

1. Download and install the NPM packages:

```shell
npm install
```

2. Update the MongoDB connection string value of `DB_URL` in the `.env` file.

3. Run the application:

```shell
npm run start
```

#### CORS Whitelist

Update the values in of CORS_WHITELIST in `.env` and For specifying multiple origins, separate them with commas. To allow requests from any origin, use the wildcard symbol "*".
