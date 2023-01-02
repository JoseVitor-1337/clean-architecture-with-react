import { InvalidFieldError } from "@presentation/validation/errors";
import { FieldValidation } from "@presentation/validation/protocols";

export class EmailValidation implements FieldValidation {
  constructor(readonly field: string) {}

  validate(fieldValue: string): Error {
    console.log("fieldValue", fieldValue);
    return new InvalidFieldError(this.field);
  }
}
