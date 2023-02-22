import { NavBar } from 'components';
import PropTypes from 'prop-types';

export const Layout = ({children}) => {
    return (
        <>
            <div>
                <NavBar />
            </div>
            {children}
        </>
    );
};

Layout.propTypes = {
    children: PropTypes.node,
};