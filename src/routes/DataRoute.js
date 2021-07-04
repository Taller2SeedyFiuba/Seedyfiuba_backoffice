import React from "react";
import {Route, Redirect} from "react-router-dom";
import {app} from "../app/app"

export function DataRoute({component: Component, ...rest}) {
    return (
        <Route {...rest}
            render={props => app.thereIsLoggedInUser() ?
                (app.thereIsRegisteredUser() ? 
                    <Redirect to={{pathname: app.routes().users}}/> : 
                    <Component {...props}/>) :
                <Redirect to={{pathname: app.routes().login}}/>
            }
        />
    )
}