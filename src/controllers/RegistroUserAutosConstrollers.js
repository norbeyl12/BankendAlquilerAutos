const { Response } = require("../utils/Response");
const RequestCallModel = require("../models/RegistroUserAuto");
const RequestCallRepository = require('../repository/RegistroUserAutosRepository');

async function RegistroUserAutos(req, res) {
    const {
        firstName,
        lastName,
        email,
        fromAddress,
        toAddress,
        phoneNumber,
        persons,
        luggage,
        rentalDate,
        journeyTime,
        message,
        paymentInformation
    } = req.body;

    const requestCall = new RequestCallModel({
        firstName,
        lastName,
        email,
        fromAddress,
        toAddress,
        phoneNumber,
        persons,
        luggage,
        rentalDate,
        journeyTime,
        message,
        paymentInformation
    });

    try {
        const result = await RequestCallRepository.createRegistroUserAutos(requestCall);
        res.status(201).json({
            status: 201,
            message: "Guardado Correctamente",
            result: result
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            status: 500,
            message: "Ocurrió un error",
            error: error.message
        });
    }
}

async function ListRegistroUserAutos(req, res) {
    try {
        const result = await RequestCallRepository.ListAllRegistroUserAutos();
        res.status(200).json({
            status: 200,
            message: "Listado Correctamente",
            result: result
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            status: 500,
            message: "Ocurrió un error",
            error: error.message
        });
    }
}


async function BuscarByEmailRegistroUserAutos(req, res) {
    const email = req.params['email'];
    try {
        const result = await RequestCallRepository.FindByEmailRegistroUserAutos(email);
        if (result) {
            res.status(200).json({
                status: 200,
                message: "Encontrado Correctamente",
                result: result
            });
        } else {
            res.status(404).json({
                status: 404,
                message: "Request a Call No Encontrado"
            });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            status: 500,
            message: "Ocurrió un error",
            error: error.message
        });
    }
}

module.exports = {
    RegistroUserAutos,
    ListRegistroUserAutos,
    BuscarByEmailRegistroUserAutos
};
