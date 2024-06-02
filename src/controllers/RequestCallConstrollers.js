const { Response } = require("../utils/Response");
const RequestCallModel = require("../models/RegistroRequestCall");
const RequestCallRepository = require('../repository/RequestCallRepository');

// Importa la función createRequestCall

async function RegistroRequestCall(req, res) {
    const { name, email, phoneNumber, message } = req.body;

    try {
        // Crea una nueva instancia de RequestCallModel
        const newRequestCall = new RequestCallModel({
            name,
            email,
            phoneNumber,
            message
        });

        // Guarda el nuevo objeto RequestCallModel en la base de datos utilizando la función createRequestCall
        const result = await RequestCallRepository.createRequestCall(newRequestCall);

        res.status(201).json({
            message: "Guardado Correctamente",
            result: result
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            message: "Ocurrió un error al guardar en la base de datos",
            error: error.message // Envía el mensaje de error específico al cliente
        });
    }
}
async function ListRequestCall(req, res) {
    try {
        const result = await RequestCallRepository.ListAllRequestCall();
        Response.status = 200;
        Response.message = "Listado Correctamente"
        Response.result = result;
        res.status(200).send(
            Response
        );
    } catch (error) {
        console.log("Error:", error)
        Response.status = 500;
        Response.message = "Ocurrio un error"
        Response.result = error;
        res.status(500).send(
            Response
        );
    }
}

async function BuscarByEmailRequestCall(req, res) {
    const email = req.params['email'];
    try {
        const result = await RequestCallRepository.FindByEmailRequestCall(email);
        if (result) {
            Response.status = 200;
            Response.message = "Encontrado Correctamente"
            Response.result = result;
        } else {
            Response.status = 404;
            Response.message = "Request a Call No Encontrado"
        }
        res.status(Response.status).send(
            Response
        );
    } catch (error) {
        console.log("Error:", error)
        Response.status = 500;
        Response.message = "Ocurrio un error"
        Response.result = error;
        res.status(500).send(
            Response
        );
    }
}
module.exports = {
    RegistroRequestCall,
    ListRequestCall,
    BuscarByEmailRequestCall
}