import React from "react";
import {Route, Redirect} from "react-router-dom";
import {app} from "../app/app"

export function PrivateRoute({component: Component, ...rest}) {
    return (
        <Route {...rest}
            render={props => app.thereIsLoggedInUser() ?
                (app.thereIsRegisteredUser() ? 
                    <Component {...props}/> : 
                    <Redirect to={{pathname: app.routes().signupdata}}/>) :
                <Redirect to={{pathname: app.routes().login}} />
            }
        />
    )
}
