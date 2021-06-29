import "./App.css";
import HomePage from "./Containers/HomePage/HomePage";
import SignUpPage from "./Containers/SignUpPage/SignUpPage";
import { Switch, Route } from "react-router-dom";
import AccountHomePage from "./Containers/AccountHomePage/AccountHomePage";
import { useSelector } from "react-redux";

function App() {
    const authenticated = useSelector((state) => state.auth.loggedIn);
    return (
        <div className="App">
            <Switch>
                {!authenticated ? (
                    <>
                        <Route
                            exact
                            path="/signUp"
                            component={SignUpPage}
                        ></Route>
                        <Route component={HomePage}></Route>
                    </>
                ) : (
                    <Route component={AccountHomePage}></Route>
                )}
            </Switch>
        </div>
    );
}

export default App;
