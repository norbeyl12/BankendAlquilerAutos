const { mockRequest, mockResponse } = require("./mocks/mocks"); // Asegúrate de tener un archivo utilidades.js con las funciones mockRequest y mockResponse

const {
  RegistroUserAutos,
  ListRegistroUserAutos,
  BuscarByEmailRegistroUserAutos,
} = require("../controllers/RegistroUserAutosConstrollers");


const RequestCallRepository = require("../repository/RegistroUserAutosRepository");
const RequestCallModel = require("../models/RegistroUserAuto");

// Mockear RequestCallModel y RequestCallRepository
jest.mock("../models/RegistroUserAuto");
jest.mock("../repository/RegistroUserAutosRepository");

describe("RegistroUserAutos", () => {
  test("debería devolver un objeto JSON con un mensaje de éxito y un código de estado 201", async () => {
    const req = mockRequest();
    const res = mockResponse();

    // Datos simulados
    req.body = {
      _id: "someId",
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      fromAddress: "Address1",
      toAddress: "Address2",
      phoneNumber: "1234567890",
      persons: 2,
      luggage: "2 bags",
      rentalDate: new Date(),
      journeyTime: "2 hours",
      message: "Hola mundo",
      paymentInformation: "Credit Card",
    };

    const expectedResult = {
      _id: "someId",
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      fromAddress: "Address1",
      toAddress: "Address2",
      phoneNumber: "1234567890",
      persons: 2,
      luggage: "2 bags",
      rentalDate: new Date(),
      journeyTime: "2 hours",
      message: "Hola mundo",
      paymentInformation: "Credit Card",
    };

    // Mockear la función createRegistroUserAutos del repositorio
    RequestCallRepository.createRegistroUserAutos.mockResolvedValue(
      expectedResult
    );

    await RegistroUserAutos(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      status: 201, // Agrega la propiedad status al objeto esperado
      message: "Guardado Correctamente",
      result: expectedResult,
    });
  });

  test("debería devolver un objeto JSON con un mensaje de error y un código de estado 500 si ocurre un error al guardar los datos", async () => {
    const req = mockRequest();
    const res = mockResponse();

    // Datos simulados
    req.body = {
      // Datos de entrada...
    };

    // Mockear la función createRegistroUserAutos del repositorio para que lance un error
    RequestCallRepository.createRegistroUserAutos.mockRejectedValue(
      new Error("Error al guardar los datos en la base de datos")
    );

    await RegistroUserAutos(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      status: 500,
      message: "Ocurrió un error",
      error: "Error al guardar los datos en la base de datos",
    });
  });
});

describe("ListRegistroUserAutos", () => {
  test("debería devolver un objeto JSON con un mensaje de éxito y un código de estado 200", async () => {
    const req = mockRequest();
    const res = mockResponse();

    // Datos simulados
    const mockResult = [
      {
        _id: "someId",
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        fromAddress: "Address1",
        toAddress: "Address2",
        phoneNumber: "1234567890",
        persons: 2,
        luggage: "2 bags",
        rentalDate: new Date(),
        journeyTime: "2 hours",
        message: "Hola mundo",
        paymentInformation: "Credit Card",
      },
    ];

    // Mockear la función ListAllRegistroUserAutos del repositorio
    RequestCallRepository.ListAllRegistroUserAutos.mockResolvedValue(
      mockResult
    );

    await ListRegistroUserAutos(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 200,
      message: "Listado Correctamente",
      result: mockResult,
    });
  });

  test("debería devolver un objeto JSON con un mensaje de error y un código de estado 500 si ocurre un error al obtener el listado", async () => {
    const req = mockRequest();
    const res = mockResponse();

    // Mockear la función ListAllRegistroUserAutos del repositorio para que lance un error
    RequestCallRepository.ListAllRegistroUserAutos.mockRejectedValue(
      new Error("Error al obtener el listado de datos")
    );

    await ListRegistroUserAutos(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      status: 500,
      message: "Ocurrió un error",
      error: "Error al obtener el listado de datos",
    });
  });
});

describe("BuscarByEmailRegistroUserAutos", () => {
  test("debería devolver un objeto JSON con un mensaje de éxito y un código de estado 200 si se encuentra el correo electrónico", async () => {
    const req = mockRequest();
    const res = mockResponse();

    // Mockear la función FindByEmailRegistroUserAutos del repositorio
    RequestCallRepository.FindByEmailRegistroUserAutos.mockResolvedValue({
      _id: "someId",
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      fromAddress: "Address1",
      toAddress: "Address2",
      phoneNumber: "1234567890",
      persons: 2,
      luggage: "2 bags",
      rentalDate: new Date(),
      journeyTime: "2 hours",
      message: "Hola mundo",
      paymentInformation: "Credit Card",
    });

    // Simular el parámetro de correo electrónico
    req.params = { email: "john@example.com" };

    await BuscarByEmailRegistroUserAutos(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 200,
      message: "Encontrado Correctamente",
      result: {
        _id: "someId",
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        fromAddress: "Address1",
        toAddress: "Address2",
        phoneNumber: "1234567890",
        persons: 2,
        luggage: "2 bags",
        rentalDate: expect.any(Date),
        journeyTime: "2 hours",
        message: "Hola mundo",
        paymentInformation: "Credit Card",
      },
    });
  });

  test("debería devolver un objeto JSON con un mensaje de error y un código de estado 500 si ocurre un error al buscar por correo electrónico", async () => {
    const req = mockRequest();
    const res = mockResponse();

    // Mockear la función FindByEmailRegistroUserAutos del repositorio para que lance un error
    RequestCallRepository.FindByEmailRegistroUserAutos.mockRejectedValue(
      new Error("Error al buscar por correo electrónico")
    );

    // Simular el parámetro de correo electrónico
    req.params = { email: "john@example.com" };

    await BuscarByEmailRegistroUserAutos(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      status: 500,
      message: "Ocurrió un error",
      error: "Error al buscar por correo electrónico",
    });
  });
});


