import { FieldValidationSpy } from "@presentation/validation/test";
import { ValidationComposite } from "@presentation/validation/validators";

type SutReturns = {
  sut: ValidationComposite;
  fieldValidationSpys: FieldValidationSpy[];
};

const makeSut = (field: string): SutReturns => {
  const fieldValidationSpys = [new FieldValidationSpy(field), new FieldValidationSpy(field)];
  const sut = ValidationComposite.build(fieldValidationSpys);

  return { sut, fieldValidationSpys };
};

describe("ValidationComposite", () => {
  test("Should return error is any validation fails", () => {
    const field = "anyField";
    const firstError = "first error";
    const { sut, fieldValidationSpys } = makeSut(field);
    fieldValidationSpys[0].error = new Error(firstError);
    fieldValidationSpys[1].error = new Error("second error");
    const error = sut.validate(field, "Any value");
    expect(error).toBe(firstError);
  });

  test("Should return error is any validation fails", () => {
    const field = "anyField";
    const { sut } = makeSut(field);
    const error = sut.validate(field, "Any value");
    expect(error).toBeFalsy();
  });
});
