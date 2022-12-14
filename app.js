require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors")
const bodyparser = require("body-parser")
const port = process.env.PORT || 3000;
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }))
app.use(cors());
const userModel = require("./Routes/user")

DB = process.env.Url.replace("<PASSWORD>", process.env.DATABASE_PASSWORD)
mongoose.set('strictQuery', false);
mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true },
    (err, result) => {
        if (err) {
            console.log(`problem to connet with mongodb`);
            console.log(err);
        }
        else if (result) {
            console.log(`Connect to database`);
        }
    })


app.use("/userData", userModel)



app.get("/", (req, res) => {
    res.status(200).send("App Works")
});

app.listen(port, (err) => {
    if (err) throw err;
    console.log(`App running on ${port}`);
})

