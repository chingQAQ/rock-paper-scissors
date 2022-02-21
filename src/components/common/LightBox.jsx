import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';


export function LightBox ({state, children}) {
    return (
        <section className={clsx(
            'fixed w-full h-full top-0 left-0',
            'bg-[rgba(0,0,0,0.5)] flex justify-center items-center',
            state ? 'block' : 'hidden'
        )}>
            <div className="bg-white rounded-md px-8 pt-6 pb-10">
                {children}
            </div>
        </section>
    );
}

export default LightBox;

LightBox.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.string
    ]).isRequired,
    state: PropTypes.bool
};

