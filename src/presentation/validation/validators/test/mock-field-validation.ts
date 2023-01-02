import { FieldValidation } from "@presentation/validation/protocols";

export class FieldValidationSpy implements FieldValidation {
  error: Error = null;

  constructor(readonly field: string) {}

  validate(value: string): Error {
    console.log("value", value);
    return this.error;
  }
}
