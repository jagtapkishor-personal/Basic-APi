
const mongoose = require("mongoose");
const userModel = require("../Model/user")

exports.adduser = async (req, res) => {
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
}

exports.getAlluser = async (req, res) => {
    const result = await userModel.find(req.query).select();
    // const result = await userModel.find().select("image userName");
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
}

exports.getUserById = async (req, res) => {
    const id = mongoose.isValidObjectId(req.params.id)
    console.log(id);
    if (id) {
        const result = await userModel.find({ _id: req.params.id });
        if (result.length > 0) {
            res.send({
                message: "User Found",
                data: result
            })
        } else {
            res.send({
                message: "No user Found"
            })
        }
    }
    else {
        res.send({
            message: "Invalid Id"
        })
    }
}

exports.getUserByName = async (req, res) => {
    const result = await userModel.find({ userName: req.params.name });
    if (result.length > 0) {
        res.send({
            message: "user Found",
            length: result.length,
            data: result,
        })
    }
    else {
        res.send({
            message: "User Not Found"
        })
    }
}
