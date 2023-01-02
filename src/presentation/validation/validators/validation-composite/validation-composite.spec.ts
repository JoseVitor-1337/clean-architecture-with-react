import { FieldValidationSpy } from "../test/mock-field-validation";
import { ValidationComposite } from "./validation-composite";

describe("ValidationComposite", () => {
  test("Should return error is any validation fails", () => {
    const field = "anyField";
    const fieldValidationSpy = new FieldValidationSpy(field);
    fieldValidationSpy.error = new Error("first error");
    const anotherFieldValidationSpy = new FieldValidationSpy(field);
    anotherFieldValidationSpy.error = new Error("second error");
    const sut = new ValidationComposite([fieldValidationSpy, anotherFieldValidationSpy]);
    const error = sut.validate(field, "Any value");
    expect(error).toBe("first error");
  });
});
