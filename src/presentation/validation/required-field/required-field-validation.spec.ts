import { RequiredFieldError } from "../errors";
import { RequiredFieldValidation } from "./required-field-validation";

describe("RequiredFieldValidation", () => {
  test("Should return error is field is Empty", () => {
    const sut = new RequiredFieldValidation("email");
    const error = sut.validate("");
    expect(error).toEqual(new RequiredFieldError());
  });

  test("Should not return a error if field is not empty", () => {
    const sut = new RequiredFieldValidation("email");
    const error = sut.validate("vitor@gmail.com");
    expect(error).toBeFalsy();
  });
});
