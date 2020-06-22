import React from 'react'
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ children, isAuth, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) =>
                localStorage.getItem("sessionId") ? (
                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: props.location }
                            }}
                        />
                    )
            }
        />
    );
}

export default PrivateRoute;