import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import homeRouter from "./routes/home.js"
import DefectList from "./models/defectList.js";
import fs from "fs";

const app = express();

const PORT = 8080;

app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors());
app.use("/home", homeRouter)

// const data = JSON.parse(fs.readFileSync('csvjson.json', 'utf-8'));
// async function load() {
//     try {
//       await DefectList.insertMany(data);
//       console.log('Done!');
//       console.log(data)
//       process.exit();
//     } catch(e) {
//       console.log(e);
//       process.exit();
//     }
//   };
//   load();

const CONNECTION_URL = "mongodb+srv://theHugo:3edcvfr4@cluster0.zmju1j6.mongodb.net/quality-data?retryWrites=true&w=majority";
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log("Server up")
        })
    })
    .catch((error) => console.log(error.message))