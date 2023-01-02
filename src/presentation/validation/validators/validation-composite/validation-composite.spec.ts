import { FieldValidationSpy } from "../test/mock-field-validation";
import { ValidationComposite } from "./validation-composite";

type SutReturns = {
  sut: ValidationComposite;
  fieldValidationSpys: FieldValidationSpy[];
};

const makeSut = (field: string): SutReturns => {
  const fieldValidationSpys = [new FieldValidationSpy(field), new FieldValidationSpy(field)];
  const sut = new ValidationComposite(fieldValidationSpys);

  return { sut, fieldValidationSpys };
};

describe("ValidationComposite", () => {
  test("Should return error is any validation fails", () => {
    const field = "anyField";
    const { sut, fieldValidationSpys } = makeSut(field);
    fieldValidationSpys[0].error = new Error("first error");
    fieldValidationSpys[1].error = new Error("second error");
    const error = sut.validate(field, "Any value");
    expect(error).toBe("first error");
  });

  test("Should return error is any validation fails", () => {
    const field = "anyField";
    const { sut } = makeSut(field);
    const error = sut.validate(field, "Any value");
    expect(error).toBeFalsy();
  });
});