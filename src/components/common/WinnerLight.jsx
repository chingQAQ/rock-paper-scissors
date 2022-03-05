import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './WinnerLight.css';

function WinnerLight ({unmount = () => {}}) {
    return (
        <div
            className="winner-light"
            onAnimationEnd={unmount}>    
        </div>
    );
}

export function trigger({
    root = 'div'
}) {

    const wrap = document.createElement('div');

    wrap.classList.add('absolute', 'w-full', 'pt-[100%]');
    
    if (
        !(root instanceof HTMLElement)
        && !root
    ) {
        root = document.createElement(root);
    } else {
        root = root.insertAdjacentElement('afterbegin', wrap);
    }

    ReactDOM.render(
        <WinnerLight unmount={() => ReactDOM.unmountComponentAtNode(wrap)}></WinnerLight>
        , wrap
    );

}

WinnerLight.propTypes = {
    unmount: PropTypes.func
};

export default { trigger };
