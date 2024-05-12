const cors = require('cors');
const express = require("express")
const app = express()
app.use(express.json())

const todoRoutes = require("./src/router/todoRoutes");
const { errorHandler } = require('./src/middleware/errorHandler');
const allowedOrigins = (process.env.CORS_WHITELIST ?? '').split(",");

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use('/api', todoRoutes);
app.use(errorHandler);

module.exports = app
