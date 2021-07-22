import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import {PrivateRoute} from "./PrivateRoute"
import {LoginRoute} from "./LoginRoute"
import {DataRoute} from "./DataRoute"
import {app} from "../app/app"
import {Login} from "../screens/Login"
import {Users} from "../screens/Users"
import {UserView} from "../screens/UserView"
import {SignUp} from "../screens/SignUp"
import {SignUpData} from "../screens/SignUpData"
import {ResetPassword} from "../screens/ResetPassword"
import {Projects} from "../screens/Projects"
import {ProjectView} from "../screens/ProjectView"
import {Metrics} from "../screens/Metrics"
import  * as Auth from "../provider/auth-provider"

export default function App() {
    React.useEffect(() => {
        Auth.init();
    }, [])

    return (
        <Router>
            <LoginRoute exact path={app.routes().login} component={Login}/>
            <LoginRoute exact path={app.routes().signup} component={SignUp}/>
            <LoginRoute exact path={app.routes().resetpassword} component={ResetPassword}/>
            <DataRoute exact path={app.routes().signupdata} component={SignUpData}/>
            <PrivateRoute exact path={app.routes().users} component={Users}/>
            <PrivateRoute exact path={app.routes().userid} component={UserView}/>
            <PrivateRoute exact path={app.routes().projects} component={Projects}/>
            <PrivateRoute exact path={app.routes().projectid} component={ProjectView}/>
            <PrivateRoute exact path={app.routes().metrics} component={Metrics}/>
        </Router>
    );
}
