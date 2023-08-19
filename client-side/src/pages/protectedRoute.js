import React from "react";
import {Route,redirect} from "react-router-dom";
import { useGlobalConext } from "../context";

const PrivateRoute = ({children,...rest}) =>{
    const {user} = useGlobalConext();

    return(
        <Route
            {...rest}
            render={() =>{
                return user ? children : redirect("/");
            }}
        >

        </Route>
    )
}

export default PrivateRoute;