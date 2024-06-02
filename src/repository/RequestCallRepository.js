const RequestCallModel = require("../models/RegistroRequestCall");

module.exports.createRequestCall = async (RequestCall) => {
    try {
        return await RequestCall.save();
    } catch (err) {
        throw new Error('Error al guardar los datos en la base de datos');
    }
};

module.exports.ListAllRequestCall = async () => {
    try {
        return await RequestCallModel.find();
    } catch (err) {
        throw new Error('Error al guardar los datos en la base de datos');
    }
};

module.exports.FindByEmailRequestCall = async (email) => {
    try {
        return await RequestCallModel.findOne({ email: email });
    } catch (err) {
        throw new Error('Error al eliminar los datos en la base de datos');
    }
};


