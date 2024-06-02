const { mockRequest, mockResponse } = require("./mocks/mocks"); // Asegúrate de tener un archivo utilidades.js con las funciones mockRequest y mockResponse

const {
  RegistroRequestCall,
  ListRequestCall,
  BuscarByEmailRequestCall,
} = require("../controllers/RequestCallConstrollers");

const RequestCallRepository = require("../repository/RequestCallRepository");
const RequestCallModel = require("../models/RegistroRequestCall");

// Mockear RequestCallModel y RequestCallRepository
jest.mock("../models/RegistroRequestCall");
jest.mock("../repository/RequestCallRepository");

describe("RegistroRequestCall", () => {
  test("debería devolver un objeto JSON con un mensaje de éxito y un código de estado 201", async () => {
    const req = mockRequest();
    const res = mockResponse();

    // Datos simulados
    req.body = {
      name: "John Doe",
      email: "john@example.com",
      phoneNumber: "1234567890",
      message: "Hola mundo",
    };

    const expectedResult = {
      _id: "someId",
      name: req.body.name,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      message: req.body.message,
    };

    // Mockear la función createRequestCall del repositorio
    RequestCallRepository.createRequestCall.mockResolvedValue(expectedResult);

    await RegistroRequestCall(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Guardado Correctamente",
      result: expectedResult,
    });
  });

  test("debería devolver un objeto JSON con un mensaje de error y un código de estado 500 si la creación falla", async () => {
    const req = mockRequest();
    const res = mockResponse();

    // Datos simulados
    req.body = {
      name: "John Doe",
      email: "john@example.com",
      phoneNumber: "1234567890",
      message: "Hola mundo",
    };

    const errorMessage = "Error al guardar en la base de datos";
    // Mockear la función createRequestCall del repositorio para que falle
    RequestCallRepository.createRequestCall.mockRejectedValue(
      new Error(errorMessage)
    );

    await RegistroRequestCall(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Ocurrió un error al guardar en la base de datos",
      error: errorMessage,
    });
  });
});

describe("ListRequestCall", () => {
  test("debería devolver un objeto JSON con un mensaje de éxito y un código de estado 200", async () => {
    const req = mockRequest();
    const res = mockResponse();

    // Datos simulados
    const mockResult = [
      {
        _id: "someId",
        name: "John Doe",
        email: "john@example.com",
        phoneNumber: "1234567890",
        message: "Hola mundo",
      },
    ];

    // Mockear la función ListAllRequestCall del repositorio
    RequestCallRepository.ListAllRequestCall.mockResolvedValue(mockResult);

    await ListRequestCall(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      status: 200,
      message: "Listado Correctamente",
      result: mockResult,
    });
  });

  test("debería devolver un objeto JSON con un mensaje de error y un código de estado 500 si la obtención falla", async () => {
    const req = mockRequest();
    const res = mockResponse();

    const errorMessage = "Error al obtener la lista de llamadas";
    // Mockear la función ListAllRequestCall del repositorio para que falle
    RequestCallRepository.ListAllRequestCall.mockRejectedValue(
      new Error(errorMessage)
    );

    await ListRequestCall(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      status: 500,
      message: "Ocurrió un error",
      result: errorMessage,
    });
  });
});

describe("BuscarByEmailRequestCall", () => {
  test("debería devolver un objeto JSON con un mensaje de éxito y un código de estado 200 si se encuentra el correo electrónico", async () => {
    const req = mockRequest();
    const res = mockResponse();

    // Mockear la función FindByEmailRequestCall del repositorio
    const mockResult = {
      _id: "someId",
      name: "John Doe",
      email: "john@example.com",
      phoneNumber: "1234567890",
      message: "Hola mundo",
    };
    RequestCallRepository.FindByEmailRequestCall.mockResolvedValue(mockResult);

    // Simular el parámetro de correo electrónico
    req.params = { email: "john@example.com" };

    await BuscarByEmailRequestCall(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      status: 200,
      message: "Encontrado Correctamente",
      result: mockResult,
    });
  });

  test("debería devolver un objeto JSON con un mensaje de error y un código de estado 404 si no se encuentra el correo electrónico", async () => {
    const req = mockRequest();
    const res = mockResponse();

    const errorMessage = "Request a Call No Encontrado";
    // Mockear la función FindByEmailRequestCall del repositorio para que no encuentre el correo electrónico
    RequestCallRepository.FindByEmailRequestCall.mockResolvedValue(null);

    // Simular el parámetro de correo electrónico
    req.params = { email: "nonexistent@example.com" };

    await BuscarByEmailRequestCall(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith({
      status: 404,
      message: errorMessage,
      result: "", // Debe ser null en lugar de una cadena vacía
    });
  });

  
});




