import React, { useState } from "react";
import "./HomePage.scss";
import InstagramPhone from "../../assets/homepageSideImage.jpg";
import InstagramIconText from "../../assets/instagramIconText.png";
import { Link } from 'react-router-dom';
import axios from "axios";

const HomePage = () => {

    const [userInfo, setuserInfo] = useState({
        username: "",
        password: ""
    })

    const [error, seterror] = useState("");

    const postSignInInfo = async() => {
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
                localStorage.setItem("jwt", result.data.token);
                seterror("");
            }
            else {
                console.log("ERROR");
                seterror("error");
            }
        }
        catch(error) {
            console.log(error);
        }
    }

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
                        class="mb-4"
                        src={InstagramIconText}
                        alt=""
                        width="200"
                    ></img>
                    <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

                    <div class="form-floating">
                        <input
                            type="email"
                            class="form-control"
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
                    <div class="form-floating">
                        <input
                            type="password"
                            class="form-control"
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
                    <div class="alert alert-danger" role="alert" style={
                        {
                            display: `${error === "" ? "none" : ""}`
                        }
                    }>
                        Invalid Credentials!
                    </div>
                    <button
                        class="w-100 btn btn-lg btn-primary mb-3"
                        type="button"
                        onClick={postSignInInfo}
                    >
                        Sign in
                    </button>
                    <Link to="/signUp">Don't Have an Account?</Link>
                    <p class="mt-5 mb-3 text-muted">Instagram Clone</p>
                </form>
            </div>
        </div>
    );
}

export default HomePage;
