import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import { selectIsLoggedIn, selectIsAuthLoading } from "redux/auth/authSelectors";

export const PublicRoute = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const isAuthLoading = useSelector(selectIsAuthLoading);

    if (isAuthLoading) {
        return;
    };
    
    return isLoggedIn ? <Navigate to="/contacts" replace={true} /> : <Outlet />;
};