import { InvalidFieldError } from "@presentation/validation/errors";
import { EmailValidation } from "@presentation/validation/validators";

const makeSut = (): EmailValidation => new EmailValidation("email");

describe("EmailValidation", () => {
  test("Should return error if email is invalid", () => {
    const sut = makeSut();
    const error = sut.validate("vitor@");
    expect(error).toEqual(new InvalidFieldError("email"));
  });

  test("Should return falsy if email is valid", () => {
    const sut = makeSut();
    const error = sut.validate("josedocarana@gmail.com");
    expect(error).toBeFalsy();
  });

  test("Should return falsy if email is empty", () => {
    const sut = makeSut();
    const error = sut.validate("");
    expect(error).toBeFalsy();
  });
});
