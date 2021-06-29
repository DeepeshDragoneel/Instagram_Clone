const initialState = {
    loggedIn: false,
    username: null,
}

const AuthReducer = (state = initialState, action) => {
    const token = localStorage.getItem("i_c_jwt");
    let username = localStorage.getItem("i_c_username");
    console.log(token);
    if (token !== null) {
        action.type = "LOGIN_USER";
    } else if (token === null) {
        action.type = "LOGOUT_USER";
    }
    switch (action.type) {
        case "LOGOUT_USER":
            return {
                ...state,
                loggedIn: false,
                username: null,
            };
        case "LOGIN_USER":
            return {
                ...state,
                loggedIn: true,
                username: username,
            };
        default:
            return state;
    }
};

export default AuthReducer;