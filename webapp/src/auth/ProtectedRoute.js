import React from "react";
import { Route, Navigate } from "react-router-dom";
import auth from "./Auth";

const ProtectedRoute = ({ component: Component, redirectTo, path, ...props }) => {
    if (!auth.isAuthenticated()) {
        return <Navigate to={redirectTo} />;
    }
    return <Route path={path} element={<Component {...props} />} />
};

export default ProtectedRoute;

// export const ProtectedRoute = ({ component: Component, ...rest }) => {
//     return (
//         <Route
//             {...rest}
//             render={(props) => {
//                 if (auth.isAuthenticated()) {
//                     return <Component {...props} />;
//                 } else {
//                     return (
//                         <Redirect
//                             to={{
//                                 pathname: "/",
//                                 state: {
//                                     from: props.location,
//                                 },
//                             }}
//                         ></Redirect>
//                     );
//                 }
//             }}
//         />
//     );
// };
