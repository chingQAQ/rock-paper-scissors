import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import Pentagon from '@/assets/bg-pentagon.svg?component';
import { MEMBERS } from '@/logic';
import clsx from 'clsx';

const GameBackGround = () => (
    <Pentagon></Pentagon>
);

function Shape({ id, name, className, onClick, size }) {
    return (
        <div
            style={{
                width: `${size || 120}px`,
                height: `${size || 120}px`
            }}
            className={clsx(
            className,
            'rounded-full cursor-pointer',
            'flex justify-center items-center z-1',
            `shape-color-${name}`
        )}
            onClick={() => onClick(id)}
        >
            <div
                style={{
                    width: `${(parseInt(size, 10)) - (size / 4) || 90}px`,
                    height: `${(parseInt(size, 10)) - (size / 4) || 90}px`
                }}
                className={clsx(
                'rounded-full bg-white',
                'flex justify-center items-center'
            )}>
                <div
                    style={{
                        width: `${(parseInt(size, 10)) / 2}px`,
                        height: `${(parseInt(size, 10)) / 2}px`
                    }}
                    className={'icon-' + name}
                ></div>
            </div>
        </div>
    );
}

export function GameBase() {

    const [choiceShape, setChoiceShape] = useState(null);

    const player = MEMBERS.find(i => i.id === choiceShape);

    return (
        <>
            {choiceShape == null && (
                <div className="grid grid-cols-[0.4fr] place-content-center mt-[100px]">
                    <div className="relative">
                        <GameBackGround />
                        <Shape
                            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
                            onClick={setChoiceShape}
                            {...MEMBERS[0]}
                        />
                        <Shape
                            className="absolute top-[25%] right-0 translate-x-1/2"
                            onClick={setChoiceShape}
                            {...MEMBERS[1]}
                        />
                        <Shape
                            className="absolute top-[100%] right-[7%] -translate-y-1/2"
                            onClick={setChoiceShape}
                            {...MEMBERS[2]}
                        />
                        <Shape
                            className="absolute top-[100%] left-[7%] -translate-y-1/2"
                            onClick={setChoiceShape}
                            {...MEMBERS[3]}
                        />
                        <Shape
                            className="absolute top-[25%] left-0 -translate-x-1/2"
                            onClick={setChoiceShape}
                            {...MEMBERS[4]}
                        />
                    </div>
                </div>
            )}
            {player && (
                <div className="grid grid-cols-2 place-content-center mt-[100px]">
                    <div className="flex flex-col justify-center relative">
                        <h2 className="text-center text-white text-[36px] tracking-widest">YOU PICKED</h2>
                        <div className="mt-[100px]">
                            <Shape
                                size="300"
                                className=""
                                {...player}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col justify-center relative">
                        <h2 className="text-center text-white text-[36px] tracking-widest">THE HOUSE PICKED</h2>
                        <div className="mt-[100px]">
                            {/* <Shape
                                size="300"
                                className=""
                                {...player}
                            /> */}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export const Game = memo(GameBase);

Shape.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
    size: PropTypes.string
};
