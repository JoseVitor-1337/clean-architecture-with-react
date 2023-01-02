import { Validation } from "@presentation/protocols/validation";
import { FieldValidation } from "@presentation/validation/protocols";

export class ValidationComposite implements Validation {
  constructor(private readonly validators: FieldValidation[]) {}

  validate(fieldName: string, fieldValue: string): string {
    if (this.validate.length === 0) return null;
    const validators = this.validators.filter((validator) => validator.field === fieldName);
    for (const validator of validators) {
      const error = validator.validate(fieldValue);
      if (error) return error.message;
    }
  }
}
