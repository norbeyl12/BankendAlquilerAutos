const RequestCallModel = require("../models/RegistroUserAuto");

module.exports.createRegistroUserAutos = async (RequestCall) => {
    try {
        return await RequestCall.save();
    } catch (err) {
        throw new Error('Error al guardar los datos en la base de datos');
    }
};

module.exports.ListAllRegistroUserAutos = async () => {
    try {
        return await RequestCallModel.find();
    } catch (err) {
        throw new Error('Error al guardar los datos en la base de datos');
    }
};

module.exports.FindByEmailRegistroUserAutos = async (email) => {
    try {
        return await RequestCallModel.findOne({ email: email });
    } catch (err) {
        throw new Error('Error al guardar los datos en la base de datos');
    }
};

