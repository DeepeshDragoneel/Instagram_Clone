import React, { useState, useEffect } from 'react';
import "./AccountHomePage.scss";
import NavBar from "../../Components/NavBar/NavBar";
import axios from 'axios';
import { useDispatch } from 'react-redux';

const AccountHomePage = () => {
    const dispatch = useDispatch();
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
                }),
            });
            console.log(result);
            if (result === "error") {
                dispatch({
                    type: "LOGOUT_USER",
                });
                localStorage.removeItem("i_c_jwt");
                localStorage.removeItem("i_c_username");
                localStorage.removeItem("i_c_profile_pic");
                window.location.reload();
            }
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log("First request cancelled", error);
            } else {
                console.log(error);
            }
        }
    };

    useEffect(() => {
        checkUserAuth();
    }, []);

    return (
        <div>
            <NavBar/>
            Account Home Page
        </div>
    )
}

export default AccountHomePage;
