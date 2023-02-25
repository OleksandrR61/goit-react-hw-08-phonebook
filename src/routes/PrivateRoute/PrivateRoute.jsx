import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import { selectIsLoggedIn, selectIsAuthLoading } from "redux/auth/authSelectors";

export const PrivateRoute = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const isAuthLoading = useSelector(selectIsAuthLoading);

    if (isAuthLoading) {
        return;
    };
    
    return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace={true} />;
};