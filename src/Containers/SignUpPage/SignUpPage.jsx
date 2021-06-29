import React, { useState } from 'react';
import "./SignUpPage.scss";
import { Link } from "react-router-dom";
import InstagramIconText from "../../assets/instagramIconText.png";
import axios from 'axios';

const SignUpPage = () => {

    const [error, seterror] = useState("");
    const [msg, setmsg] = useState("");

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
            if (result.data.status === "error") {
                console.log(result.data.error);
                seterror(result.data.error);
                setmsg("");
            }
            else {
                seterror("");
                setmsg("An verification Email has been send to you mail!")
            }
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
                    className="mb-4"
                    src={InstagramIconText}
                    alt=""
                    width="200"
                ></img>
                <h1 className="h3 mb-3 fw-normal">Please Sign Up</h1>

                <div className="form-floating">
                    <input
                        type="text"
                        className="form-control"
                        id="floatingInputFullname"
                        placeholder="Deepesh Dragoneel"
                        onChange={(e) => {
                            setsignUpInfo({
                                ...signUpInfo,
                                fullname: e.target.value,
                            });
                        }}
                    ></input>
                    <label htmlFor="floatingInputFullname">Fullname</label>
                </div>
                <div className="form-floating">
                    <input
                        type="text"
                        className="form-control"
                        id="floatingInputUsername"
                        placeholder="deepeshdragoneel"
                        onChange={(e) => {
                            setsignUpInfo({
                                ...signUpInfo,
                                username: e.target.value,
                            });
                        }}
                    ></input>
                    <label htmlFor="floatingInputUsername">Username</label>
                </div>
                <div className="form-floating">
                    <input
                        type="email"
                        className="form-control"
                        id="floatingInputEmail"
                        placeholder="name@example.com"
                        onChange={(e) => {
                            setsignUpInfo({
                                ...signUpInfo,
                                email: e.target.value,
                            });
                        }}
                    ></input>
                    <label htmlFor="floatingInputEmail">Email address</label>
                </div>
                <div className="form-floating">
                    <input
                        type="password"
                        className="form-control"
                        id="floatingPassword"
                        placeholder="Password"
                        onChange={(e) => {
                            setsignUpInfo({
                                ...signUpInfo,
                                password: e.target.value,
                            });
                        }}
                    ></input>
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <div
                    className="alert alert-danger"
                    role="alert"
                    style={{
                        display: `${error === "" ? "none" : ""}`,
                    }}
                >
                    {error}
                </div>
                <div
                    className="alert alert-success"
                    role="alert"
                    style={{
                        display: `${msg === "" ? "none" : ""}`,
                        width: "90%",
                        margin: " 1rem auto"
                    }}
                >
                    {msg}
                </div>
                <button
                    type="button"
                    className="w-100 btn btn-lg btn-primary mb-3"
                    onClick={postSignUpInfo}
                >
                    Sign Up
                </button>
                <Link to="/">Have an Account?</Link>
                <p className="mt-3 mb-2 text-muted">Instagram Clone</p>
            </form>
        </div>
    );
}

export default SignUpPage;
