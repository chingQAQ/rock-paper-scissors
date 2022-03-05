import React, { useState, useCallback, useContext } from "react";
import Logo from '@/assets/logo-bonus.svg?component';
import Rules from '@/assets/image-rules-bonus.svg';
import clsx from 'clsx';
import {
  Button,
  LightBox,
  Game
} from '@/components';

import StoreContext, { PageProvider } from '@/components/store/context';

function Main() {

  const [ruleState, setRuleState] = useState(false);

  const {
    state: { count }
  } = useContext(StoreContext);

  const rulesClickHandler = useCallback(() => setRuleState(p => !p), []);

  return (
    <>
      <article className="container py-12">
        <div className="py-6 px-8 rounded-2xl border-4 border-header-outline">
          <h1 className="sr-only">ROCK, PAPER, SCISSORS, LIZARD, SPOCK</h1>
          <section className="flex justify-between">
            <div className="flex-[0_1_120px]">
              <Logo className="w-full h-full" />
            </div>
            <div className="flex flex-col justify-center items-center flex-[0_1_150px] h-[130px] p-4 rounded-2xl bg-white">
              <h2 className="text-[18px] text-neutral-score tracking-widest">SCORE</h2>
              <h3 className="text-[70px] text-neutral-dark font-bold leading-none tracking-wider">{count}</h3>
            </div>
          </section>
        </div>
        <Game></Game>
      </article>
      <Button
        className={clsx(
          'absolute bottom-8 sm:right-1/2 md:right-8 text-xl rounded-xl border-2',
          'py-2 border-header-outline min-w-[150px] tracking-widest',
          'sm:translate-x-1/2 md:translate-x-0'
        )}
        onClick={rulesClickHandler}
      >
        RULES
      </Button>
      <LightBox state={ruleState}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-neutral-dark text-[36px] font-bold leading-none">RULES</h2>
          <Button
            className="-indent-8 overflow-hidden w-6 h-6 close sm:hidden md:block"
            onClick={rulesClickHandler}
          >
            x
          </Button>
        </div>
        <img className="w-full" src={Rules} alt="GAME RULES" />
        <Button
          className="-indent-8 overflow-hidden w-6 h-6 close sm:block md:sm"
          onClick={rulesClickHandler}
        >
          x
        </Button>
      </LightBox>
    </>
  );
}

function App() {
  return (
    <PageProvider>
      <Main></Main>
    </PageProvider>
  );
}

export default App;
