import React from 'react';
import PropTypes from 'prop-types';
import { useStore } from './useStore';

const StoreContext = React.createContext();

const { count } = JSON.parse(localStorage.getItem('source'));

const DEFAULT_SOURCE = {
    count: count || 0
};

export function PageProvider({ children }) {

    const {
        state,
        action
    } = useStore({
        ...DEFAULT_SOURCE
    });

    return (
        <StoreContext.Provider value={{ state, action }}>
            { children }
        </StoreContext.Provider>
    );
}

export default StoreContext;

PageProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node,
        PropTypes.element,
    ])
};
