export class UserError {
    code: number
    message: string

    constructor(code: number, message: string) {
      this.code = code;
      this.message = message;
    }
  
    static badRequest(msg: string) {
      return new UserError(400, msg);
    }
  
    static internal(msg: string) {
      return new UserError(500, msg);
    }
}
  