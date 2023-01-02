import { InvalidFieldError } from "@presentation/validation/errors";
import { EmailValidation } from "./email-validation";

const makeSut = () => new EmailValidation("email");

describe("Email Validation", () => {
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
});
