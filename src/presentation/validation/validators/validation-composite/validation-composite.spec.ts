import { FieldValidationSpy } from "../test/mock-field-validation";
import { ValidationComposite } from "./validation-composite";

describe("ValidationComposite", () => {
  test("Should return error is any validation fails", () => {
    const field = "anyField";
    const errorMessage = "Any error message";
    const fieldValidationSpy = new FieldValidationSpy(field);
    const anotherFieldValidationSpy = new FieldValidationSpy(field);
    anotherFieldValidationSpy.error = new Error(errorMessage);
    const sut = new ValidationComposite([fieldValidationSpy, anotherFieldValidationSpy]);
    const error = sut.validate(field, "Any value");
    expect(error).toBe(errorMessage);
  });
});
