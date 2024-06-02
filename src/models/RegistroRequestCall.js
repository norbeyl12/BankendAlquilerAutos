const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RequestCallSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("RequestCall_collection", RequestCallSchema);
