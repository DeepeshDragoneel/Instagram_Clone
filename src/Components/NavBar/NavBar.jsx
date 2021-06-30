import React, { useState } from "react";
import "./NavBar.scss";
import InstagramIconText from "../../assets/instagramIconText.png";
import { NavLink, useHistory } from "react-router-dom";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import HomeIcon from "@material-ui/icons/Home";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import InsertCommentOutlinedIcon from "@material-ui/icons/InsertCommentOutlined";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        transformOrigin: "-100% bottom",
    },
    paper: {
        marginRight: theme.spacing(2),
    },
    menu: {
        transformOrigin: "-100% bottom !important",
        transform: `translate3d(${
            window.innerWidth - 140
        }px, 31px, 0px) !important`,
    },
}));

const NavBar = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const h = useHistory();

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setprofilePicSizeClass("");
        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === "Tab") {
            event.preventDefault();
            setprofilePicSizeClass("");
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);
    const profilePic = localStorage.getItem("i_c_profile_pic");
    const [profilePicSizeClass, setprofilePicSizeClass] = useState("");
    const [NavBarHome, setNavBarHome] = useState(true);
    const [NavBarMsg, setNavBarMsg] = useState(false);

    const dispatch = useDispatch();
    const logoutUser = () => {
        dispatch({
            type: "LOGOUT_USER",
        });
        localStorage.removeItem("i_c_jwt");
        localStorage.removeItem("i_c_username");
        localStorage.removeItem("i_c_profile_pic");
        window.location.reload();
    }

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
                onClick={() => {
                    setprofilePicSizeClass("");
                    setNavBarHome(true);
                    setNavBarMsg(false);
                }}
            >
                {NavBarHome ? (
                    <HomeIcon className="NavLinkIcon" />
                ) : (
                    <HomeOutlinedIcon className="NavLinkIcon" />
                )}
            </NavLink>
            <NavLink
                className="mr-2 ml-2 navbarLink"
                to="/"
                activeClassName="ActiveNavLink"
                onClick={() => {
                    setprofilePicSizeClass("");
                    setNavBarHome(false);
                    setNavBarMsg(true);
                }}
            >
                {NavBarMsg ? (
                    <InsertCommentIcon className="NavLinkIcon" />
                ) : (
                    <InsertCommentOutlinedIcon className="NavLinkIcon" />
                )}
            </NavLink>
            <NavLink
                className="mr-2 ml-2 navbarLink"
                to="/"
                activeClassName="ActiveNavLink"
                onClick={() => {
                    setprofilePicSizeClass("");
                    setNavBarHome(false);
                    setNavBarMsg(false);
                }}
            >
                <SearchOutlinedIcon className="NavLinkIcon" />
            </NavLink>
            {/* <NavLink
                className="mr-2 ml-2 navbarLink"
                to="/"
                activeClassName="ActiveNavLink"
                onClick={() => {
                    setprofilePicSizeClass("profilePicSizeClass");
                    setNavBarHome(false);
                    setNavBarMsg(false);
                }}
                isActive={() => {
                    console.log("ActiveNavLink Msg");
                }}
            >
                <img
                    className={`navbarLinkProfilePic ${profilePicSizeClass}`}
                    src={profilePic}
                    alt="profilePic"
                ></img>
            </NavLink> */}
            <div className={classes.root}>
                <div>
                    <button
                        className="mr-2 profilePicNavButton"
                        ref={anchorRef}
                        aria-controls={open ? "menu-list-grow" : undefined}
                        aria-haspopup="true"
                        onClick={() => {
                            handleToggle();
                            setprofilePicSizeClass("profilePicSizeClass");
                            setNavBarHome(false);
                            setNavBarMsg(false);
                        }}
                        style={{
                            width: "1.8rem",
                            padding: "0",
                        }}
                    >
                        <img
                            className={`navbarLinkProfilePic ${profilePicSizeClass}`}
                            src={profilePic}
                            alt="profilePic"
                        ></img>
                    </button>
                    <Popper
                        open={open}
                        anchorEl={anchorRef.current}
                        role={undefined}
                        transition
                        disablePortal
                        className={classes.menu}
                    >
                        {({ TransitionProps, placement }) => (
                            <Grow {...TransitionProps}>
                                <Paper>
                                    <ClickAwayListener
                                        onClickAway={handleClose}
                                    >
                                        <MenuList
                                            autoFocusItem={open}
                                            id="menu-list-grow"
                                            onKeyDown={handleListKeyDown}
                                        >
                                            <MenuItem
                                                style={{
                                                    padding: "2px",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    paddingBottom: "10px"
                                                }}
                                                onClick={(e) => {
                                                    handleClose(e);
                                                    const username =
                                                        localStorage.getItem(
                                                            "i_c_username"
                                                        );
                                                    h.push(`/${username}/`);
                                                }}
                                            >
                                                <AccountCircleOutlinedIcon
                                                    style={{
                                                        margin: "auto 2px auto 8px",
                                                    }}
                                                />
                                                <span
                                                    style={
                                                        {
                                                            marginRight: "3rem"
                                                        }
                                                    }
                                                >
                                                    Profile
                                                </span>
                                            </MenuItem>
                                            <hr
                                                style={{
                                                    margin: 0,
                                                }}
                                            />
                                            <MenuItem
                                                onClick={(e) => {
                                                    handleClose(e);
                                                    logoutUser();
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        fontWeight: "900",
                                                        color: "red",
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    Logout
                                                </span>
                                            </MenuItem>
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
