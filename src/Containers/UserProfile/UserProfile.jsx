import { Button, makeStyles } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import AddAPhotoOutlinedIcon from "@material-ui/icons/AddAPhotoOutlined";
import "./UserProfile.scss";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
    editButton: {
        color: "black",
        fontWeight: "600",
        margin: "auto",
        border: "1px solid grey",
        padding: "2px 6px",
    },
});

const UserProfile = () => {
    const [user, setuser] = useState();

    const classes = useStyles();

    let temp;

    const h = useHistory();

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
    }, [user]);
    return (
        <div>
            <NavBar />
            {user !== {} && user !== undefined ? (
                <div className="userProfileMainDiv">
                    <div className="userProfileInfo">
                        <div className="userProfileImage">
                            <img
                                style={{
                                    height: "10rem",
                                }}
                                src={user.user.image}
                                alt="ProfilePic"
                            ></img>
                        </div>
                        <div className="userProfileDetailes">
                            <div className="userProfileDeatilesUsernameTab">
                                <p>{user.user.username}</p>
                                <Button className={classes.editButton} onClick={() => {
                                    h.push("/editProfile");
                                }}>
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
                                        {user.postsCount}
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
                                        {user.followers}
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
                                        {user.following}
                                    </span>
                                    Following
                                </p>
                            </div>
                            <div className="userProfileDetailesNameBioTab">
                                <p className="userProfileDetailesFullName">
                                    {user.user.fullname}
                                </p>
                                <p>
                                    <span style={{ whiteSpace: "pre-line" }}>
                                        {user.user.bio}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <hr
                        style={{
                            width: "80%",
                            margin: "auto",
                        }}
                    />
                    <div className="userPosts">
                        <h1>POSTS</h1>
                        <div className="userPostsDisplay">
                            {user.posts !== undefined &&
                            user.posts.length !== 0 ? (
                                user.posts.map((post) => (
                                    <div className="userDisplayPost">
                                        <img
                                            src={post.imageURL}
                                            alt="UserPost"
                                        ></img>
                                    </div>
                                ))
                            ) : (
                                <div>
                                    <AddAPhotoOutlinedIcon
                                        style={{
                                            fontSize: "4rem",
                                            margin: "4rem auto",
                                        }}
                                    />
                                    <h1 className="noPostsProfile">
                                        No Posts Yet
                                    </h1>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <h1>No user Found</h1>
                </>
            )}
        </div>
    );
};

export default UserProfile;
