const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    path: ({
        type: String
    })
},
    {
        timestamps: true
    });

module.exports = mongoose.model("userModel", userModel)