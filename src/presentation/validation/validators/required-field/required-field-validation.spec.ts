import { RequiredFieldError } from "@presentation/validation/errors";
import { RequiredFieldValidation } from "./required-field-validation";

type SutReturn = {
  sut: RequiredFieldValidation;
};

const makeSut = (): SutReturn => {
  const sut = new RequiredFieldValidation("email");

  return { sut };
};

describe("RequiredFieldValidation", () => {
  test("Should return error is field is Empty", () => {
    const { sut } = makeSut();
    const error = sut.validate("");
    expect(error).toEqual(new RequiredFieldError());
  });

  test("Should not return a error if field is not empty", () => {
    const { sut } = makeSut();
    const error = sut.validate("vitor@gmail.com");
    expect(error).toBeFalsy();
  });
});
