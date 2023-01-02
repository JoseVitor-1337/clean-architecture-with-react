export class InvalidFieldError extends Error {
  constructor(readonly fieldname: string) {
    super(`O campo ${fieldname} está inválido`);
    this.message = `O campo ${fieldname} está inválido`;
    this.name = "InvalidFieldError";
  }
}
