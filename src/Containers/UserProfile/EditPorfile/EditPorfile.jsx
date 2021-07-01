import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import NavBar from "../../../Components/NavBar/NavBar";
import { NavLink } from "react-router-dom";
import "./EditPorfile.scss";

const EditPorfile = () => {
    const [user, setuser] = useState();
    const [usernameChanged, setusernameChanged] = useState(false);
    const [originalUserName, setoriginalUserName] = useState("")
    let temp;

    const h = useHistory();

    const submitUserDetails = async() => {
        const result = await axios({
            method: "POST",
            url: `${process.env.REACT_APP_BASE_URL}changeUserDetails`,
            headers: {
                "content-type": "application/json",
                accept: "application/json",
            },
            data: JSON.stringify({
                user: user,
                usernameChanged: usernameChanged,
                originalUserName: originalUserName
            })
        });
    }

    const getUserDetails = async () => {
        const token = localStorage.getItem("i_c_jwt");
        const result = await axios({
            method: "GET",
            url: `${process.env.REACT_APP_BASE_URL}getUserProfileDetails`,
            headers: {
                "content-type": "application/json",
                accept: "application/json",
            },
            params: {
                token: token,
            },
        });
        console.log(result.data);
        temp = result.data.user;
        console.log(temp);
        setuser(result.data);
        console.log(user);
    };

    useEffect(() => {
        getUserDetails();
        console.log("1st");
    }, []);
    useEffect(() => {
        console.log("UseEffect: ", user);
        console.log(usernameChanged);
        console.log(originalUserName);  
        if (user !== {} && user !== undefined && !usernameChanged) {
            setoriginalUserName(user.user.username);
        }
    }, [user]);
    return (
        <div>
            <NavBar></NavBar>
            {user !== {} && user !== undefined ? (
                <div className="editProfileMainDiv">
                    <div className="editProfileEditor">
                        <h1
                            style={{
                                marginTop: "1.5rem",
                            }}
                        >
                            Edit Profile
                        </h1>
                        <hr />
                        <div className="editProfileUserPicSection">
                            <img
                                className="editProfileUserPic"
                                src={user.user.image}
                                alt="Profile"
                            ></img>
                            <div
                                className=""
                                style={{
                                    textAlign: "start",
                                    marginLeft: "2rem",
                                }}
                            >
                                <p
                                    style={{
                                        fontSize: "1.1rem",
                                        fontWeight: "900",
                                        marginBottom: "5px",
                                    }}
                                >
                                    {user.user.username}
                                </p>
                                <NavLink
                                    to="/"
                                    style={{
                                        textDecoration: "none",
                                        fontWeight: "900",
                                    }}
                                >
                                    Change Profile image
                                </NavLink>
                            </div>
                        </div>
                        <div className="editProfileSection">
                            <label for="useProfleName">Name: </label>
                            <input
                                type="text"
                                id="useProfleName"
                                value={user.user.fullname}
                                onChange={(event) => {
                                    setuser((i) => ({
                                        ...i,
                                        user: {
                                            ...i.user,
                                            fullname: event.target.value,
                                        },
                                    }));
                                }}
                            ></input>
                        </div>
                        <div className="editProfileSection">
                            <label for="useProfleUserName">Username: </label>
                            <input
                                type="text"
                                id="useProfleUserName"
                                value={user.user.username}
                                onChange={(event) => {
                                    setusernameChanged(true);
                                    console.log("Hello ", usernameChanged);
                                    setuser((i) => ({
                                        ...i,
                                        user: {
                                            ...i.user,
                                            username: event.target.value,
                                        },
                                    }));
                                }}
                            ></input>
                        </div>
                        <div className="editProfileSection">
                            <label for="useProfleBio">Bio: </label>
                            <textarea
                                type="text"
                                id="useProfleBio"
                                value={user.user.bio}
                                onChange={(event) => {
                                    setuser((i) => ({
                                        ...i,
                                        user: {
                                            ...i.user,
                                            bio: event.target.value,
                                        },
                                    }));
                                }}
                            ></textarea>
                        </div>
                        <div className="editProfileSection">
                            <label for="useProflleEmail">Email: </label>
                            <input
                                type="email"
                                id="useProflleEmail"
                                value={user.user.email}
                                onChange={(event) => {
                                    setuser((i) => ({
                                        ...i,
                                        user: {
                                            ...i.user,
                                            email: event.target.value,
                                        },
                                    }));
                                }}
                            ></input>
                        </div>
                        <div
                            className="editProfileSection"
                            style={{
                                marginBottom: "1.5rem",
                            }}
                        >
                            <label for="useProflleEmail">Phone number: </label>
                            <input type="number" id="useProflleEmail"></input>
                        </div>
                        <button
                            type="button"
                            className="btn btn-primary"
                            style={{
                                fontWeight: "bold",
                                marginBottom: "1.5rem",
                            }}
                            onClick={(event) => {
                                submitUserDetails();
                            }}
                        >
                            Submit
                        </button>
                    </div>
                    <p
                        style={{
                            margin: "1rem",
                        }}
                    >
                        @instgagramClone
                    </p>
                </div>
            ) : null}
        </div>
    );
};

export default EditPorfile;
