import { RequiredFieldValidation, ValidationBuilder as sut } from "@presentation/validation/validators";

describe("ValidationBuilder", () => {
  test("Should return RequiredFieldValidation", () => {
    const field = "anyField";
    const validations = sut.field(field).required().build();
    expect(validations).toEqual([new RequiredFieldValidation(field)]);
  });
});
