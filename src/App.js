import "./App.css";
import HomePage from "./Containers/HomePage/HomePage";
import SignUpPage from "./Containers/SignUpPage/SignUpPage";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
      <div className="App">
          <Switch>
              <Route exact path="/signUp" component={SignUpPage}></Route>
              <Route component={HomePage}></Route>
          </Switch>
      </div>
  );
}

export default App;
