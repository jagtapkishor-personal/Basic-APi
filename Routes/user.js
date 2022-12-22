const express = require("express");
const multer = require("multer");
const router = express.Router();
const controller = require("../Controller/user")

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

router.post("/adduser", upload.single("image"), controller.adduser);
router.get("/getAlluser", controller.getAlluser)
router.get("/getuserbyid/:id", controller.getUserById);
router.get("/getuserByName/:name",controller.getUserByName)
