import {Navigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth"
import type { JSX } from "react";

interface PrivateRoutesProps{
    children: JSX.Element;
}

const PrivateRoute =({children}: PrivateRoutesProps) => {
    const {token} = useAuth();

    if(!token){
        return <Navigate to="/" replace />;
    }

    return children;
}

export default PrivateRoute;