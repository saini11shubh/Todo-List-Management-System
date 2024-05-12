require('dotenv').config({ path: ".env" });
const http = require('http');
const fs = require('fs');
const app = require("./app");
const { connectDatabase } = require("./src/config/database");
connectDatabase();

//create http server
http.createServer(app).listen(process.env.PORT || 3001, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})