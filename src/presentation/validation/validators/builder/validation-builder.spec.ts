import { EmailValidation, RequiredFieldValidation, ValidationBuilder as sut } from "@presentation/validation/validators";

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
});
