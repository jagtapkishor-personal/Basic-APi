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
const multer = require("multer")
const userModel = require("./Model/user")
mongoose.set('strictQuery', false);
mongoose.connect(process.env.Url, { useNewUrlParser: true, useUnifiedTopology: true },
    (err, result) => {
        if (err) {
            console.log(`problem to connet with mongodb`);
            console.log(err);
        }
        else if (result) {
            console.log(`Connect to database`);
        }
    })

var upload = multer({
    storage: multer.diskStorage({
        destination: (req, res, callback) => {
            let type = req.params.type;
            let path = "./assets/images";
            callback(null, path)
        },
        filename: (req, file, callback) => {
            callback(null, file.originalname, file.fieldname)
        }
    })
});


app.post("/user", upload.single("image"), async (req, res) => {
    const userData = new userModel({
        userName: req.body.userName,
        image: req.file?.originalname,
        path: req.file?.path
    });
    userData.save((err, result) => {
        if (err) {
            res.send({
                message: "Something went wrong",
            })
        }
        else if (result) {
            res.send({
                message: "User Saved",
                data: result,
            })
        }
    })

});

app.get("/user", async (req, res) => {
    const result = await userModel.find();
    console.log(result);
    if (result.length > 0) {
        res.send({
            message: "All users",
            data: result,
        })
    }
    else {
        res.send({
            message: "No user Found"
        })
    }
})

app.get("/", (req, res) => {
    res.status(200).send("App Works")
});

app.listen(port, (err) => {
    if (err) throw err;
    console.log(`App running on ${port}`);
})

