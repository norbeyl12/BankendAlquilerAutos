const RequestCallModel = require("../models/RegistroUserAuto");
const RegistroUserAutosRepository = require("../repository/RegistroUserAutosRepository");

jest.mock("../models/RegistroUserAuto");

describe("RegistroUserAutosRepository Tests", () => {
  describe("createRegistroUserAutos", () => {
    

    test("should throw error if saving fails", async () => {
      const mockRegistroUserAuto = {
        save: jest.fn().mockRejectedValueOnce(new Error("Mocked save error"))
      };

      RequestCallModel.mockReturnValueOnce(mockRegistroUserAuto);

      await expect(
        RegistroUserAutosRepository.createRegistroUserAutos(mockRegistroUserAuto)
      ).rejects.toThrow("Error al guardar los datos en la base de datos");
    });
  });

  describe("ListAllRegistroUserAutos", () => {
    test("should list all registro user autos successfully", async () => {
      const mockRegistroUserAutos = [
        "Mocked registro user auto 1",
        "Mocked registro user auto 2"
      ];

      RequestCallModel.find.mockResolvedValueOnce(mockRegistroUserAutos);

      const result = await RegistroUserAutosRepository.ListAllRegistroUserAutos();

      expect(result).toEqual(mockRegistroUserAutos);
      expect(RequestCallModel.find).toHaveBeenCalled();
    });

    test("should throw error if listing fails", async () => {
      RequestCallModel.find.mockRejectedValueOnce(new Error("Mocked find error"));

      await expect(
        RegistroUserAutosRepository.ListAllRegistroUserAutos()
      ).rejects.toThrow("Error al guardar los datos en la base de datos");
    });
  });

  describe("FindByEmailRegistroUserAutos", () => {
    test("should find registro user auto by email successfully", async () => {
      const email = "test@example.com";
      const mockRegistroUserAuto = {
        firstName: "Test",
        lastName: "User",
        email: email,
        fromAddress: "Address 1",
        toAddress: "Address 2",
        phoneNumber: "123456789",
        persons: 2,
        luggage: "Some luggage",
        rentalDate: new Date(),
        journeyTime: "2 hours",
        message: "Test message",
        paymentInformation: "Test payment"
      };

      RequestCallModel.findOne.mockResolvedValueOnce(mockRegistroUserAuto);

      const result = await RegistroUserAutosRepository.FindByEmailRegistroUserAutos(email);

      expect(result).toEqual(mockRegistroUserAuto);
      expect(RequestCallModel.findOne).toHaveBeenCalledWith({ email: email });
    });

    test("should return null if registro user auto with email not found", async () => {
      const email = "nonexistent@example.com";

      RequestCallModel.findOne.mockResolvedValueOnce(null);

      const result = await RegistroUserAutosRepository.FindByEmailRegistroUserAutos(email);

      expect(result).toBeNull();
      expect(RequestCallModel.findOne).toHaveBeenCalledWith({ email: email });
    });

    test("should throw error if finding fails", async () => {
      const email = "test@example.com";

      RequestCallModel.findOne.mockRejectedValueOnce(new Error("Mocked find error"));

      await expect(
        RegistroUserAutosRepository.FindByEmailRegistroUserAutos(email)
      ).rejects.toThrow("Error al guardar los datos en la base de datos");
    });
  });
});
