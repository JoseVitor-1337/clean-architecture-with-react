import { ValidationBuilder, ValidationComposite } from "@presentation/validation/validators";
import { makeLoginValidation } from "./login-validation-factory";

describe("LoginValidationFactory", () => {
  test("Should throw error if ValidationComposite is diferent of LoginFactory", () => {
    const composite = makeLoginValidation();
    expect(composite).not.toStrictEqual(ValidationComposite.build([...ValidationBuilder.field("email").required().email().build()]));
  });

  test("Should make ValidationComposit with correct validators", () => {
    const composite = makeLoginValidation();
    expect(composite).toStrictEqual(
      ValidationComposite.build([
        ...ValidationBuilder.field("email").required().email().build(),
        ...ValidationBuilder.field("password").required().min(5).build(),
      ])
    );
  });
});
