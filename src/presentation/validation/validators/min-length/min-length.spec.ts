import { InvalidFieldError } from "@presentation/validation/errors";
import { MinLengthValidation } from "@presentation/validation/validators";

const makeSut = (): MinLengthValidation => new MinLengthValidation("password", 5);

describe("MinLength", () => {
  test("Should return error if email is invalid", () => {
    const sut = makeSut();
    const error = sut.validate("123");
    expect(error).toEqual(new InvalidFieldError("senha"));
  });

  test("Should return error falsy if value is valid", () => {
    const sut = makeSut();
    const error = sut.validate("12345");
    expect(error).toBeFalsy();
  });
});
