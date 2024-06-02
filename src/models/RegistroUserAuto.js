const mongoose = require("mongoose");
const schema = mongoose.Schema;

const RegistroUserAutosSchema = new schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    fromAddress: {
        type: String,
        required: true
    },
    toAddress: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    persons: {
        type: Number,
        required: true
    },
    luggage: {
        type: String,
        required: true
    },
    rentalDate: {
        type: Date,
        required: true
    },
    journeyTime: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    paymentInformation: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("RegistroUserAutos", RegistroUserAutosSchema);
