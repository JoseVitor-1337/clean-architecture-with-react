import { InvalidFieldError } from "@presentation/validation/errors";
import { FieldValidation } from "@presentation/validation/protocols";

export class MinLengthValidation implements FieldValidation {
  constructor(readonly field: string, private readonly minlength: number) {}

  validate(value: string): Error {
    console.log("value", value);
    console.log("this.minlength", this.minlength);
    return new InvalidFieldError("senha");
  }
}
