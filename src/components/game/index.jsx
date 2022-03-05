import React, {
    memo,
    useState,
    useEffect,
    useCallback,
    createElement,
    useContext,
    useRef
} from 'react';
import PropTypes from 'prop-types';
import Pentagon from '@/assets/bg-pentagon.svg?component';
import { MEMBERS, battle } from '@/logic';
import clsx from 'clsx';
import { Button } from '@/components';
import StoreContext from '@/components/store/context';
import { WinnerLight } from '@/components';


const GameBackGround = () => (
    <Pentagon></Pentagon>
);

function Shape({ id, name, className, onClick }) {

    return createElement(
        'div',
        {
            className: clsx(
                'w-[120px] h-[120px] bg-white',
                'rounded-full cursor-pointer',
                'flex justify-center items-center z-[1]',
                'shadow-[inset_0_7px_0_rgba(0,0,0,0.1)]',
                `after:content-[''] after:w-full after:h-full shape-color-${name}`,
                `after:absolute after:rounded-full after:z-[0]`,
                className
            ),
            onClick: onClick && (() => onClick(id))
        },
        <div className="relative z-[1] w-full h-full flex justify-center items-center">
            <div className="w-[70%] h-[70%] rounded-full flex justify-center items-center bg-white">
                <div
                    className={clsx(
                        'icon-' + name,
                    )}>
                </div>
            </div>
        </div>
    );
}

export function GameBase() {

    const playerRef = useRef();

    const computerRef = useRef();

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

            WinnerLight.trigger({
                root: playerRef.current
            });
        }

        if (winner === 'YOU LOSE') {
            WinnerLight.trigger({
                root: computerRef.current
            });
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
                    <div className="grid sm:grid-cols-[0.8fr] md:grid-cols-[0.4fr] place-content-center mt-[100px]">
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
                    <div className="grid sm:grid-cols-2 md:grid-cols-[repeat(3,minmax(min-content,max-content))] place-content-center gap-10 mt-[100px]">
                        <div className="flex flex-col justify-start relative">
                            <h2 className="text-center text-white sm:text-[24px] md:text-[36px] tracking-widest">YOU PICKED</h2>
                            <div
                                ref={playerRef}
                                className="mt-[50px] grid place-content-center">
                                <Shape
                                    className={'relative sm:w-[150px] sm:h-[150px] md:w-[300px] md:h-[300px]'}
                                    {...player}
                                />
                            </div>
                        </div>
                        { winner && (
                            <div className="flex flex-col justify-center sm:col-span-2 md:col-span-1 sm:order-last md:order-none">
                                <p className="text-6xl text-center text-white mb-6">{winner}</p>
                                <Button
                                    className="bg-white w-full py-5 rounded-md sm:max-w-[280px] md:max-w-auto mx-auto"
                                    onClick={restGame}
                                >
                                    <span className="text-neutral-dark">PLAY AGAIN</span>
                                </Button>
                            </div>
                        )}
                        <div className="flex flex-col justify-start relative">
                            <h2 className="text-center text-white sm:text-[24px] md:text-[36px] tracking-widest">THE HOUSE PICKED</h2>
                            <div
                                ref={computerRef}
                                className="mt-[50px] grid place-content-center"
                            >
                                {computer && (
                                    <Shape
                                        className={'relative sm:w-[150px] sm:h-[150px] md:w-[300px] md:h-[300px]'}
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
    onClick: PropTypes.func
};
