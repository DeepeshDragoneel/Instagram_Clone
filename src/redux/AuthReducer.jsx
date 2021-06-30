const axios = require("axios");

const initialState = {
    loggedIn: false,
    username: null,
};


const checkUserAuth = async () => {
    try {
        const token = localStorage.getItem("i_c_jwt");
        const result = await axios({
            method: "POST",
            url: `${process.env.REACT_APP_BASE_URL}auth`,
            headers: {
                "content-type": "application/json",
                accept: "application/json",
            },
            data: JSON.stringify({
                token: token,
            })
        });
        console.log(result);
        return result.data;
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log("First request cancelled", error);
        }
        else {
            console.log(error);
        }
        return "ERROR";
    }
};

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
