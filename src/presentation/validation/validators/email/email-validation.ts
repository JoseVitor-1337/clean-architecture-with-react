import { InvalidFieldError } from "@presentation/validation/errors";
import { FieldValidation } from "@presentation/validation/protocols";

export class EmailValidation implements FieldValidation {
  constructor(readonly field: string) {}

  validate(value: string): Error {
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!value) return null;
    return emailRegex.test(value) ? null : new InvalidFieldError(this.field);
  }
}
