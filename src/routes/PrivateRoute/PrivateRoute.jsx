import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';

import { selectIsLoggedIn, selectIsAuthLoading } from "redux/auth/authSelectors";

export const PrivateRoute = ({ component }) => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const isAuthLoading = useSelector(selectIsAuthLoading);

    if (isAuthLoading) {
        return;
    };
    
    return isLoggedIn ? component : <Navigate to="/login"/>;
};

PrivateRoute.propTypes = {
    component: PropTypes.node.isRequired,
};