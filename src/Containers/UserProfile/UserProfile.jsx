import { Button, makeStyles } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import "./UserProfile.scss";

const useStyles = makeStyles({
    editButton: {
        color: "black",
        fontWeight: "600",
        marginLeft: "3rem",
        border: "1px solid grey",
        padding: "2px 6px",

    }
})

const UserProfile = () => {

    const classes = useStyles();

    const getUserDetails = async () => {
        const token = localStorage.getItem("i_c_jwt");
        const result = await axios({
            method: "POST",
            url: `${process.env.REACT_APP_BASE_URL}getUserDetails`,
            headers: {
                "content-type": "application/json",
                accept: "application/json",
            },
            data: JSON.stringify({
                token: token,
            }),
        });
        console.log(result);
    };

    useEffect(() => {
        getUserDetails();
    }, []);

    return (
        <div>
            <NavBar />
            <div className="userProfileMainDiv">
                <div className="userProfileInfo">
                    <div className="userProfileImage">
                        <img
                            src="https://he-s3.s3.amazonaws.com/media/avatars/19H51A05G2/resized/160/20f4972img_7260.jpg"
                            alt="ProfilePic"
                        ></img>
                    </div>
                    <div className="userProfileDetailes">
                        <div className="userProfileDeatilesUsernameTab">
                            <p>Deepesh Dragoneel</p>
                            <Button className={classes.editButton}>
                                Edit Profile
                            </Button>
                        </div>
                        <div className="userProfileDetailesStats">
                            <p>
                                <span
                                    style={{
                                        fontWeight: "800",
                                        marginRight: "5px",
                                    }}
                                >
                                    5
                                </span>
                                posts
                            </p>
                            <p>
                                <span
                                    style={{
                                        fontWeight: "800",
                                        marginRight: "5px",
                                    }}
                                >
                                    5M
                                </span>
                                Followers
                            </p>
                            <p>
                                <span
                                    style={{
                                        fontWeight: "800",
                                        marginRight: "5px",
                                    }}
                                >
                                    100
                                </span>
                                Following
                            </p>
                        </div>
                        <div className="userProfileDetailesNameBioTab">
                            <p className="userProfileDetailesFullName">
                                D33P35H DR4G0N331 😈✌🏻☮️
                            </p>
                            <p>
                                𝘊𝘰𝘯𝘤𝘦𝘪𝘵𝘦𝘥 <br /> 𝘿𝙞𝙖𝙗𝙤𝙡𝙞𝙘𝙖𝙡
                                <br /> 𝘋𝘰𝘯’𝘵 𝘵𝘳𝘺 𝘵𝘰 𝘬𝘯𝘰𝘸 𝘮𝘦, 𝘶𝘯𝘵𝘪𝘭 𝘺𝘰𝘶 𝘬𝘯𝘰𝘸
                                𝘈𝘳𝘵𝘪𝘧𝘪𝘤𝘪𝘢𝘭 𝘕𝘦𝘶𝘳𝘢𝘭 𝘕𝘦𝘵𝘸𝘰𝘳𝘬𝘴 🤖 𝙅𝙚 𝙨𝙪𝙞𝙨 𝙡𝙚 𝙜𝙖𝙧𝙨 𝙡𝙚
                                𝙥𝙡𝙪𝙨 𝙞𝙣𝙩𝙚𝙡𝙡𝙞𝙜𝙚𝙣𝙩 𝙦𝙪𝙚 𝙟'𝙖𝙞𝙚 𝙟𝙖𝙢𝙖𝙞𝙨 𝙧𝙚𝙣𝙘𝙤𝙣𝙩𝙧é!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
