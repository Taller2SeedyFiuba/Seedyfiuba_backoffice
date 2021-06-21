import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import {PrivateRoute} from "./PrivateRoute"
import {LoginRoute} from "./LoginRoute"
import {app} from "../app/app"
import {Login} from "../screens/Login"
import {Home} from "../screens/Home"
import {SignUp} from "../screens/SignUp"
import {ResetPassword} from "../screens/ResetPassword"

export default function App() {
    return (
        <Router>
            <LoginRoute exact path={app.routes().login} component={Login}/>
            <LoginRoute exact path={app.routes().signup} component={SignUp}/>
            <LoginRoute exact path={app.routes().resetpassword} component={ResetPassword}/>
            <PrivateRoute exact path={app.routes().home} component={Home}/>
        </Router>
    );
}
