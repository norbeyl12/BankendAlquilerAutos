const express = require('express');
const RequestCallControllers = require('../controllers/RequestCallConstrollers');
const RegistroUserAutosControllers = require('../controllers/RegistroUserAutosConstrollers');

const api = express.Router();

// Rutas para RequestCall
api.post('/RequestCall/RegistroRequestCall', RequestCallControllers.RegistroRequestCall);
api.get('/RequestCall/ListRequestCall', RequestCallControllers.ListRequestCall);
api.get('/RequestCall/BuscarRequestCall/:email', RequestCallControllers.BuscarByEmailRequestCall);

// Rutas para RegistroUserAutos
api.post('/RegistroUserAutos/RegistroUserAutos', RegistroUserAutosControllers.RegistroUserAutos);
api.get('/RegistroUserAutos/ListRegistroUserAutos', RegistroUserAutosControllers.ListRegistroUserAutos);
api.get('/RegistroUserAutos/BuscarByEmailRegistroUserAutos/:email', RegistroUserAutosControllers.BuscarByEmailRegistroUserAutos);
module.exports = api;
