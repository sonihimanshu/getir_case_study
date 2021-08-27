import express from 'express';
import mongoose from 'mongoose';
import recordsController from './api/controller/recordsController';
const app = express();
app.use(recordsController);

//mongoose.connect("mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getir-case-study?retryWrites=true");
mongoose.connect(`mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_USER_PASSWORD}@${process.env.DB_SERVER}/${process.env.DB_NAME}?retryWrites=true`);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("DB Connected successfully");
    app.listen(3000, () => {
        console.log("Server is running at port 3000");
    });
});
