const express = require('express');
const mongoose = require('mongoose');
const { searchRecords } = require('./api/controller/recordsController.js');
const app = express();
app.use(express.json());

mongoose.connect(`mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_USER_PASSWORD}@${process.env.DB_SERVER}/${process.env.DB_NAME}?retryWrites=true`);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("DB Connected successfully");
    const port = process.env.PORT ? Number.parseInt(process.env.PORT) : 3000;
    app.listen(port, () => {
        console.log("Server is running at port: " + port);
    });
});

// Routes
app.post('/records/search', async (request, response) => searchRecords(request, response));
