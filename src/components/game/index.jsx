import React, { memo, useState, useEffect, useCallback, createElement, useContext } from 'react';
import PropTypes from 'prop-types';
import Pentagon from '@/assets/bg-pentagon.svg?component';
import { MEMBERS, battle } from '@/logic';
import clsx from 'clsx';
import { Button } from '@/components';
import StoreContext from '@/components/store/context';

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

    const {
        action: { addSource }
    } = useContext(StoreContext);

    useEffect(() => {

        let time;

        if(!player) return;

        time = setTimeout(() => {

            const random = ~~(Math.random() * 5);

            setComputer(MEMBERS.find(i => i.id === random));

        }, 1000);

        return () => {
            clearTimeout(time);
        };

    }, [player]);

    useEffect(() => {

        if (!computer) return;

        const win = battle(player, computer);

        setWinner(() => {
            let ret = 'DRAW';

            if (win.name === player.name) {
                ret = 'YOU WIN';
            }

            if (win.name === computer.name) {
                ret = 'YOU LOSE';
            }

            return ret;
        });

    }, [computer]);

    useEffect(() => {

        if (winner === 'YOU WIN') {
            addSource();
        }

    }, [winner]);

    const restGame = useCallback(() => {
        setPlayer(null);
        setComputer(null);
        setWinner(null);
    }, []);

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
                    <div className="grid grid-cols-[repeat(3,minmax(min-content,max-content))] place-content-center gap-10 mt-[100px]">
                        <div className="flex flex-col justify-start relative">
                            <h2 className="text-center text-white text-[36px] tracking-widest">YOU PICKED</h2>
                            <div className="mt-[50px] grid place-content-center">
                                <Shape
                                    size="300"
                                    {...player}
                                />
                            </div>
                        </div>
                        { winner && (
                            <div className="flex flex-col justify-center">
                                <p className="text-6xl text-white mb-6">{winner}</p>
                                <Button
                                    className="bg-white w-full py-5 rounded-md"
                                    onClick={restGame}
                                >
                                    <span className="text-neutral-dark">PLAY AGAIN</span>
                                </Button>
                            </div>
                        )}
                        <div className="flex flex-col justify-start relative">
                            <h2 className="text-center text-white text-[36px] tracking-widest">THE HOUSE PICKED</h2>
                            <div className="mt-[50px] grid place-content-center">
                                {computer && (
                                    <Shape
                                        size="300"
                                        {...computer}
                                    />
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
