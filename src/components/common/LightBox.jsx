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
            <div className={clsx(
                'bg-white sm:rounded-none md:rounded-md',
                'px-8 sm:py-6 md:pt-6 md:pb-10',
                'sm:w-full sm:h-full md:w-auto md:h-auto',
                'sm:flex md:block justify-around flex-col items-center'
            )}>
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

