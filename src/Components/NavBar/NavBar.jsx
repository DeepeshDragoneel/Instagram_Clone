import React from 'react';
import "./NavBar.scss";
import InstagramIconText from "../../assets/instagramIconText.png";
import { NavLink } from "react-router-dom";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
// import { useSelector } from "react-redux";

const NavBar = () => {
    const profilePic = localStorage.getItem("i_c_profile_pic");
    return (
        <div className="MainNavBarDiv">
            <img
                className="instagramIconText"
                src={InstagramIconText}
                alt="InstagramIconText"
            ></img>
            <NavLink
                className="mr-4 ml-4 navbarLink"
                to="/"
                activeClassName="ActiveNavLink"
                isActive={() => {
                    console.log("ActiveNavLink Home");
                }}
            >
                <HomeOutlinedIcon
                    style={{
                        fontSize: "2rem",
                        color: "black",
                    }}
                />
            </NavLink>
            <NavLink
                className="mr-2 ml-2 navbarLink"
                to="/"
                activeClassName="ActiveNavLink"
                isActive={() => {
                    console.log("ActiveNavLink Msg");
                }}
            >
                <ChatBubbleOutlineOutlinedIcon
                    style={{
                        fontSize: "1.8rem",
                        color: "black",
                    }}
                />
            </NavLink>
            <NavLink
                className="mr-2 ml-2 navbarLink"
                to="/"
                activeClassName="ActiveNavLink"
                isActive={() => {
                    console.log("ActiveNavLink Msg");
                }}
            >
                <SearchOutlinedIcon
                    style={{
                        fontSize: "1.8rem",
                        color: "black",
                    }}
                />
            </NavLink>
            <NavLink
                className="mr-2 ml-2 navbarLink"
                to="/"
                activeClassName="ActiveNavLink"
                isActive={() => {
                    console.log("ActiveNavLink Msg");
                }}
            >
                <img
                    className="navbarLinkProfilePic"
                    src={profilePic}
                    alt="profilePic"
                ></img>
            </NavLink>
        </div>
    );
}

export default NavBar;
