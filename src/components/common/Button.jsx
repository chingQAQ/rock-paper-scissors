import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

export function Button({ children, className, onClick }) {
    return (
        <button
            className={clsx(
                'text-white', className
            )}
            onClick={onClick}
        >
            { children }
        </button>
    );
}

export default Button;

Button.propTypes = {
    children: PropTypes.string.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func.isRequired
};
