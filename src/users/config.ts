const login = {
    msg_200_success         : `Login successful`,
    msg_200_superfluous     : `User is already logged in`,
    err_401_fail            : `Username or password was incorrect`,
    err_405_not_allowed     : `That action is not permitted`
}

const logout = {
    msg_200_success         : `Logout successful`,
    err_401_fail            : `An error occurred`,
    err_405_not_allowed     : `That action is not permitted`
}

const register = {
    msg_200_success         : `User successfully registered`,
    err_401_fail            : `An error occurred`,
    err_405_not_allowed     : `That action is not permitted`
}

const config = {
    login,
    logout,
    register,
}

export default config