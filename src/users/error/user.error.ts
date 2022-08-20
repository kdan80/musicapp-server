export class UserError {
    code: number
    message: string

    constructor(code: number, message: string) {
      this.code = code;
      this.message = message;
    }

    static isNotLoggedIn(){
        return new UserError(401, 'You are not authorized to perform that operation')
    }

    static userAlreadyExists(){
        return new UserError(400, 'An account with that username already exists')
    }
  
    static badRequest(msg: string) {
      return new UserError(400, msg);
    }
  
    static internal(msg: string) {
      return new UserError(500, msg);
    }
}
  