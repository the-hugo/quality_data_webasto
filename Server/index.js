import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import defectsRouter from "./routes/defects.js"


const app = express();

const PORT = 5555;

app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors());
app.use("/defects", defectsRouter)

const CONNECTION_URL = "mongodb+srv://theHugo:3edcvfr4@cluster0.zmju1j6.mongodb.net/";
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log("Server up")
        })
    })
    .catch((error) => console.log(error.message))