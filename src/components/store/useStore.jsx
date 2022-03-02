import { useReducer, useCallback } from 'react';

const ACTION = {
    YOU_WIN: 'YOU_WIN'
};

const reducer = (state = 0, action = {}) => {

    let count = state.count;
    
    switch (action.type) {
        case ACTION.YOU_WIN:

            count = state.count + action.data;

            localStorage.setItem('source', JSON.stringify({count}));

            return { count };
        default:
            return state;
    }
};

export function useStore(init) {
    const [state, dispatch] = useReducer(reducer, init);

    const addSource = useCallback(() => {

        dispatch({
            type: ACTION.YOU_WIN,
            data: 1,
        });

    }, []);

    return {
        state,
        action: {
            addSource
        }
    };

}
