import React, {memo} from 'react';
import PropTypes from 'prop-types';
import Pentagon from '@/assets/bg-pentagon.svg?component';
import { MEMBERS } from '@/logic';
import clsx from 'clsx';

const GameBackGround = () => (
    <Pentagon></Pentagon>
);

function Shape({id, name, className}) {
    return (
        <div className={clsx(
            className,
            'absolute rounded-full',
            'w-[120px] h-[120px] z-1',
            'flex justify-center items-center',
            `shape-color-${name}`
        )}
            // onclick={}
        >
            <div className={clsx(
                'w-[90px] h-[90px]',
                'rounded-full bg-white',
                'flex justify-center items-center'
            )}>
                <div className={'icon-' + name}></div>
            </div>
        </div>
    );
}

export function GameBase() {
    return (
        <>
            <div className="grid grid-cols-[0.4fr] place-content-center mt-[100px]">
                <div className="relative">
                    <GameBackGround />
                    <Shape className="top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" {...MEMBERS[0]}/>
                    <Shape className="top-[25%] right-0 translate-x-1/2" {...MEMBERS[1]}/>
                    <Shape className="top-[100%] right-[7%] -translate-y-1/2" {...MEMBERS[2]}/>
                    <Shape className="top-[100%] left-[7%] -translate-y-1/2" {...MEMBERS[3]}/>
                    <Shape className="top-[25%] left-0 -translate-x-1/2" {...MEMBERS[4]}/>
                </div>
            </div>
        </>
    );
}

export const Game = memo(GameBase);

Shape.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    className: PropTypes.string
};
