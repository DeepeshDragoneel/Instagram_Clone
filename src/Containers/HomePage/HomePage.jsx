import React, { useState } from "react";
import "./HomePage.scss";
import InstagramPhone from "../../assets/homepageSideImage.jpg";
import InstagramIconText from "../../assets/instagramIconText.png";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

const HomePage = () => {
    const [userInfo, setuserInfo] = useState({
        username: "",
        password: "",
    });

    const history = useHistory();

    const [error, seterror] = useState("");

    const postSignInInfo = async () => {
        try {
            const result = await axios({
                method: "POST",
                url: "http://localhost:8000/signIn",
                headers: {
                    "content-type": "application/json",
                    accept: "application/json",
                },
                data: JSON.stringify({ data: userInfo }),
            });
            console.log(result.data);
            if (result.data.resutl === "SUCCESS") {
                localStorage.setItem("i_c_jwt", result.data.token);
                localStorage.setItem("i_c_username", result.data.username);
                localStorage.setItem("i_c_profile_pic", result.data.profilePic);
                seterror("");
                window.location.reload();
            } else {
                console.log("ERROR");
                seterror("error");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="homePage">
            <div className="HomeLoginDiv">
                <img
                    src={InstagramPhone}
                    alt="Instagram"
                    className="InstagramPhoneHome"
                ></img>
                <form className="HomeSignInForm">
                    <img
                        className="mb-4"
                        src={InstagramIconText}
                        alt=""
                        width="200"
                    ></img>
                    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                    <div className="form-floating">
                        <input
                            type="email"
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                            onChange={(e) => {
                                setuserInfo({
                                    ...userInfo,
                                    username: e.target.value,
                                });
                            }}
                        ></input>
                        <label for="floatingInput">Username</label>
                    </div>
                    <div className="form-floating">
                        <input
                            type="password"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Password"
                            onChange={(e) => {
                                setuserInfo({
                                    ...userInfo,
                                    password: e.target.value,
                                });
                            }}
                        ></input>
                        <label for="floatingPassword">Password</label>
                    </div>
                    <div
                        className="alert alert-danger"
                        role="alert"
                        style={{
                            display: `${error === "" ? "none" : ""}`,
                        }}
                    >
                        Invalid Credentials!
                    </div>
                    <button
                        className="w-100 btn btn-lg btn-primary mb-3"
                        type="button"
                        onClick={() => {
                            postSignInInfo();
                            history.push("../");
                        }}
                    >
                        Sign in
                    </button>
                    <Link to="/signUp">Don't Have an Account?</Link>
                    <p className="mt-5 mb-3 text-muted">Instagram Clone</p>
                </form>
            </div>
        </div>
    );
};

export default HomePage;
