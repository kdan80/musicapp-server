// export class UserError extends Error {
//     code: number
//     message: string
//     name: string

//     constructor(code: number, message: string) {
//         super()
//         this.code = code
//         this.message = message
//         this.name = 'UserError2'
//     }

//     static isNotLoggedIn() {
//         return new UserError(401, 'You are not authorized to perform that operation')
//     }

//     static userAlreadyExists() {
//         return new UserError(400, 'An account with that username already exists')
//     }
  
//     static badRequest(msg: string) {
//       return new UserError(400, msg);
//     }
  
//     static internal(msg: string) {
//       return new UserError(500, msg);
//     }
// }

// export class ValidationError {
//     code: number
//     // Validation might fail for numerous reasons (username too short, invalid password etc)
//     // We keep an array of messages for each error
//     messages: string[] 

//     constructor(code: number, messages: string[]) {
//       this.code = code;
//       this.messages = messages;
//     }

//     static isNotLoggedIn() {
//         return new ValidationError(401, ['You are not authorized to perform that operation'])
//     }

//     static userAlreadyExists() {
//         return new ValidationError(400, ['That username is unavailable'])
//     }
// }