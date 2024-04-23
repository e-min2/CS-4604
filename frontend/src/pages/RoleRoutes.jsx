import React from "react";
import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; 

const RoleRoutes = ({ children, allowedRoles }) => {
    // Get the token from local storage. 
    const token = localStorage.getItem('token'); 
    let userRole = null;

    try {
        // Try decoding the token now and getting the user's role.
        const decodedToken = jwtDecode(token);
        userRole = decodedToken.role;
    } catch (error) {
        console.error("Error decoding token:", error);
    }

    if (token && userRole && allowedRoles.includes(userRole)) {
        // Allow the component to be rendered if everything checks out with the roles.
        return children;
    } else {
        // Redirect to the home page if the user is not authorized or if there's an error. 
        // I tried using useNavigate here but I don't know why it doesn't work but this works as a fix so who cares I guess. 
        return <Navigate to="/" replace />;
    }
};

export default RoleRoutes;