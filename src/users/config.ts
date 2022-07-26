const username_min_chars: number = 5;
const username_max_chars: number = 20;

const email_min_chars: number = 3;
const email_max_chars: number = 254;

const password_min_chars: number = 10;
const regexStart = `^`;
const atLeastOneLowercase = `(?=.*[a-z])`;
const atLeastOneUppercase = `(?=.*[A-Z])`;
const atLeastOneNumber = `(?=.*[0-9])`;
const atLeastOneSpecial = `(?=.*[!@#\$%\^&\*])`;
const minChars = `(?=.{${password_min_chars},})`;


const login = {

    msg_success: `Login successful`,

    err_fail: `Username or password was incorrect`
}

const username = {
    min: username_min_chars,
    max: username_max_chars,

    err_min: `Username must be a minimum of ${username_min_chars} characters`,
    err_max: `Username must be a maximum of ${username_max_chars} characters`,
    err_req: `Username is required`,
}

const email = {
    min: email_min_chars,
    max: email_max_chars,

    regex: "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$",
    err_min: `Email must be a minimum of ${email_min_chars} characters`,
    err_max: `Email must be a maximum of ${email_max_chars} characters`,
    err_req: `Email is required`,
    err_val: `Not a valid email`,
}

const password = {
    min: password_min_chars,

    regex:
        regexStart +
        atLeastOneLowercase +
        atLeastOneUppercase +
        atLeastOneNumber +
        atLeastOneSpecial +
        minChars,
    err_min: `Password must contain at least ${password_min_chars} characters`,
    err_req: `Password is required`,
    err_val: `Password is invalid`,
}

console.log(password.regex)

const config = {
    username,
    email,
    password,
    login
}

export default config;