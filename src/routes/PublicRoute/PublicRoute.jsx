import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';

import { selectIsLoggedIn, selectIsAuthLoading } from "redux/auth/authSelectors";

export const PublicRoute = ({ component }) => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const isAuthLoading = useSelector(selectIsAuthLoading);

    if (isAuthLoading) {
        return;
    };
    
    return isLoggedIn ? <Navigate to="/contacts" replace={true}/> : component;
};

PublicRoute.propTypes = {
    component: PropTypes.node.isRequired,
};