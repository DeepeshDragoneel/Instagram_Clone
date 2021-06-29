import React, { useState } from 'react';
import "./SignUpPage.scss";
import { Link } from "react-router-dom";
import InstagramIconText from "../../assets/instagramIconText.png";
import axios from 'axios';

const SignUpPage = () => {

    const postSignUpInfo = async (e) => {
        console.log(signUpInfo);
        try {
            const result = await axios({
                method: "POST",
                url: "http://localhost:8000/signUp",
                headers: {
                    "content-type": "application/json",
                    accept: "application/json",
                },
                data: JSON.stringify({ data: signUpInfo }),
            });
            console.log(result);
            localStorage.setItem("jwt", result.data.token);
        }
        catch (error) {
            console.log(error);
        }
    }

    const [signUpInfo, setsignUpInfo] = useState({
        fullname: "",
        username: "",
        email: "",
        password: "",
    });

    return (
        <div className="SignUpPageDiv">
            <form className="HomeSignUpForm">
                <img
                    class="mb-4"
                    src={InstagramIconText}
                    alt=""
                    width="200"
                ></img>
                <h1 class="h3 mb-3 fw-normal">Please Sign Up</h1>

                <div class="form-floating">
                    <input
                        type="text"
                        class="form-control"
                        id="floatingInput"
                        placeholder="Deepesh Dragoneel"
                        onChange={(e) => {
                            setsignUpInfo({
                                ...signUpInfo,
                                fullname: e.target.value,
                            });
                        }}
                    ></input>
                    <label for="floatingInput">Fullname</label>
                </div>
                <div class="form-floating">
                    <input
                        type="text"
                        class="form-control"
                        id="floatingInput"
                        placeholder="deepeshdragoneel"
                        onChange={(e) => {
                            setsignUpInfo({
                                ...signUpInfo,
                                username: e.target.value,
                            });
                        }}
                    ></input>
                    <label for="floatingInput">Username</label>
                </div>
                <div class="form-floating">
                    <input
                        type="email"
                        class="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                        onChange={(e) => {
                            setsignUpInfo({
                                ...signUpInfo,
                                email: e.target.value,
                            });
                        }}
                    ></input>
                    <label for="floatingInput">Email address</label>
                </div>
                <div class="form-floating">
                    <input
                        type="password"
                        class="form-control"
                        id="floatingPassword"
                        placeholder="Password"
                        onChange={(e) => {
                            setsignUpInfo({
                                ...signUpInfo,
                                password: e.target.value
                            });
                        }}
                    ></input>
                    <label for="floatingPassword">Password</label>
                </div>
                <button
                    type="button"
                    class="w-100 btn btn-lg btn-primary mb-3"
                    onClick={postSignUpInfo}
                >
                    Sign Up
                </button>
                <Link to="/">Have an Account?</Link>
                <p class="mt-3 mb-2 text-muted">Instagram Clone</p>
            </form>
        </div>
    );
}

export default SignUpPage;
