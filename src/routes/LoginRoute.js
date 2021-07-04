import React from "react";
import {Route, Redirect} from "react-router-dom";
import {app} from "../app/app"

export function LoginRoute({component: Component, ...rest}) {
    return (
        <Route {...rest}
            render={props => app.thereIsLoggedInUser() ?
                <Redirect to={{pathname: app.routes().users}} /> :
                <Component {...props}/>
            }
        />
    )
}