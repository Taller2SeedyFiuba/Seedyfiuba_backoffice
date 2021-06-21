import React from "react";
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import {PrivateRoute} from "./PrivateRoute"
import {app} from "../app/app"
import {Login} from "../screens/Login"
import {Home} from "../screens/Home"
import {SignUp} from "../screens/SignUp"

export default function App() {
    return (
        <Router>
            <Route exact path={app.routes().login} 
                render={props => localStorage.getItem("token") ?
                    <Redirect to={{pathname: app.routes().home}}/> :
                    <Login {...props}/>
                }
            />
            <Route exact path={app.routes().signup} 
                render={props => localStorage.getItem("token") ?
                    <Redirect to={{pathname: app.routes().home}}/> :
                    <SignUp {...props}/>
                }
            />
            <PrivateRoute exact path={app.routes().home} component={Home}/>
        </Router>
    );
}
