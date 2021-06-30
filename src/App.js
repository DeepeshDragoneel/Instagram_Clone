import "./App.css";
import { Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import HomePage from "./Containers/HomePage/HomePage";
import SignUpPage from "./Containers/SignUpPage/SignUpPage";
import AccountHomePage from "./Containers/AccountHomePage/AccountHomePage";
import UserProfile from "./Containers/UserProfile/UserProfile";

function App() {
    const authenticated = useSelector((state) => state.auth.loggedIn);
    return (
        <div className="App">
            {!authenticated ? (
                <Switch>
                    <Route exact path="/signUp" component={SignUpPage}></Route>
                    <Route component={HomePage}></Route>
                </Switch>
            ) : (
                <Switch>
                    <Route
                        exact
                        path="/:username/"
                        component={UserProfile}
                    ></Route>
                    <Route component={AccountHomePage}></Route>
                </Switch>
            )}
        </div>
    );
}

export default App;
