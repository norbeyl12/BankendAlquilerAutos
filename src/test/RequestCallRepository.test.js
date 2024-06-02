const RequestCallModel = require("../models/RegistroRequestCall");
const RequestCallRepository = require("../repository/RequestCallRepository");

jest.mock("../models/RegistroRequestCall");

describe("RequestCallRepository Tests", () => {
  describe("createRequestCall", () => {
    
    test("should throw error if saving fails", async () => {
      const mockRequestCall = {
        save: jest.fn().mockRejectedValueOnce(new Error("Mocked save error"))
      };

      RequestCallModel.mockReturnValueOnce(mockRequestCall);

      await expect(RequestCallRepository.createRequestCall(mockRequestCall)).rejects.toThrow(
        "Error al guardar los datos en la base de datos"
      );
    });
  });

  describe("ListAllRequestCall", () => {
    test("should list all request calls successfully", async () => {
      const mockRequestCalls = ["Mocked request call 1", "Mocked request call 2"];

      RequestCallModel.find.mockResolvedValueOnce(mockRequestCalls);

      const result = await RequestCallRepository.ListAllRequestCall();

      expect(result).toEqual(mockRequestCalls);
      expect(RequestCallModel.find).toHaveBeenCalled();
    });

    test("should throw error if listing fails", async () => {
      RequestCallModel.find.mockRejectedValueOnce(new Error("Mocked find error"));

      await expect(RequestCallRepository.ListAllRequestCall()).rejects.toThrow(
        "Error al guardar los datos en la base de datos"
      );
    });
  });

  describe("FindByEmailRequestCall", () => {
    test("should find request call by email successfully", async () => {
      const email = "test@example.com";
      const mockRequestCall = {
        name: "Test User",
        email: email,
        phoneNumber: "123456789",
        message: "Test message"
      };

      RequestCallModel.findOne.mockResolvedValueOnce(mockRequestCall);

      const result = await RequestCallRepository.FindByEmailRequestCall(email);

      expect(result).toEqual(mockRequestCall);
      expect(RequestCallModel.findOne).toHaveBeenCalledWith({ email: email });
    });

    test("should return null if request call with email not found", async () => {
      const email = "nonexistent@example.com";

      RequestCallModel.findOne.mockResolvedValueOnce(null);

      const result = await RequestCallRepository.FindByEmailRequestCall(email);

      expect(result).toBeNull();
      expect(RequestCallModel.findOne).toHaveBeenCalledWith({ email: email });
    });

    test("should throw error if finding fails", async () => {
      const email = "test@example.com";

      RequestCallModel.findOne.mockRejectedValueOnce(new Error("Mocked find error"));

      await expect(RequestCallRepository.FindByEmailRequestCall(email)).rejects.toThrow(
        "Error al eliminar los datos en la base de datos"
      );
    });
  });
});
