import React, { memo, useState, useEffect, useCallback, createElement } from 'react';
import PropTypes from 'prop-types';
import Pentagon from '@/assets/bg-pentagon.svg?component';
import { MEMBERS, battle } from '@/logic';
import clsx from 'clsx';

const GameBackGround = () => (
    <Pentagon></Pentagon>
);

function Shape({ id, name, className, onClick, size }) {

    return createElement(
        'div',
        {
            style: {
                width: `${size || 120}px`,
                height: `${size || 120}px`
            },
            className: clsx(
                className,
                'rounded-full cursor-pointer',
                'flex justify-center items-center z-1',
                `shape-color-${name}`
            ),
            onClick: onClick && (() => onClick(id))
        },
        <div
            style={{
                width: `${(parseInt(size, 10)) - (size / 4) || 90}px`,
                height: `${(parseInt(size, 10)) - (size / 4) || 90}px`
            }}
            className={clsx(
                'rounded-full bg-white',
                'flex justify-center items-center',
                'shadow-[inset_0_7px_0_rgba(0,0,0,0.1)]'
            )}>
            <div
                style={{
                    width: `${(parseInt(size, 10)) / 2}px`,
                    height: `${(parseInt(size, 10)) / 2}px`
                }}
                className={'icon-' + name}
            ></div>
        </div>
    );
}

export function GameBase() {

    const [player, setPlayer] = useState(null);

    const [computer, setComputer] = useState(null);

    const [winner, setWinner] = useState(null);

    const startGame = useCallback((id) => {

        setPlayer(MEMBERS.find(i => i.id === id));

    }, []);

    useEffect(() => {

        let time;

        if(!player) return;

        time = setTimeout(() => {

            const random = ~~(Math.random() * 5);

            setComputer(MEMBERS.find(i => i.id === random));

            clearTimeout(time);

        }, 1000);

    }, [player]);

    useEffect(() => {

        if (!computer) return;

        const win = battle(player, computer);

        setWinner(() => {
            let ret = 'draw';

            if (win.name === player.name) {
                ret = 'You Win';
            }

            if (win.name === computer.name) {
                ret = 'You Lose';
            }

            return ret;
        });

    }, [computer]);

    return (
        <>
            { player == null 
                ? (
                    <div className="grid grid-cols-[0.4fr] place-content-center mt-[100px]">
                        <div className="relative">
                            <GameBackGround />
                            <Shape
                                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                onClick={startGame}
                                {...MEMBERS[0]}
                            />
                            <Shape
                                className="absolute top-[25%] right-0 translate-x-1/2"
                                onClick={startGame}
                                {...MEMBERS[1]}
                            />
                            <Shape
                                className="absolute top-[100%] right-[7%] -translate-y-1/2"
                                onClick={startGame}
                                {...MEMBERS[2]}
                            />
                            <Shape
                                className="absolute top-[100%] left-[7%] -translate-y-1/2"
                                onClick={startGame}
                                {...MEMBERS[3]}
                            />
                            <Shape
                                className="absolute top-[25%] left-0 -translate-x-1/2"
                                onClick={startGame}
                                {...MEMBERS[4]}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 place-content-center mt-[100px]">
                        <div className="flex flex-col justify-start relative">
                            <h2 className="text-center text-white text-[36px] tracking-widest">YOU PICKED</h2>
                            <div className="mt-[50px] grid place-content-center">
                                <Shape
                                    size="300"
                                    {...player}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col justify-start relative">
                            <h2 className="text-center text-white text-[36px] tracking-widest">THE HOUSE PICKED</h2>
                            <div className="mt-[50px] grid place-content-center">
                                {computer && (
                                    <Shape
                                        size="300"
                                        {...computer}
                                    />
                                )}

                                {winner && (
                                    <>{winner}</>
                                )}
                            </div>
                        </div>
                    </div>
                )
            }
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
