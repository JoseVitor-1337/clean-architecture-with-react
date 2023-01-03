import { EmailValidation, MinLengthValidation, RequiredFieldValidation, ValidationBuilder as sut } from "@presentation/validation/validators";

describe("ValidationBuilder", () => {
  test("Should return RequiredFieldValidation", () => {
    const field = "anyField";
    const validations = sut.field(field).required().build();
    expect(validations).toStrictEqual([new RequiredFieldValidation(field)]);
  });

  test("Should return EmailValidation", () => {
    const field = "anyField";
    const validations = sut.field(field).email().build();
    expect(validations).toStrictEqual([new EmailValidation(field)]);
  });

  test("Should return MinLengthValidation", () => {
    const field = "anyField";
    const minLength = 5;
    const validations = sut.field(field).min(minLength).build();
    expect(validations).toStrictEqual([new MinLengthValidation(field, minLength)]);
  });

  test("Should return a list of validations", () => {
    const field = "anyField";
    const minLength = 5;
    const validations = sut.field(field).required().email().min(minLength).build();
    expect(validations).toStrictEqual([new RequiredFieldValidation(field), new EmailValidation(field), new MinLengthValidation(field, minLength)]);
  });
});
