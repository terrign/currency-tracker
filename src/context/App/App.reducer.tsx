import { Action, AppReducerType, ReducerState } from './models';

const appReducer: AppReducerType = (state: ReducerState, action: Action) => {
  switch (action.type) {
    case 'preferredCurrency':
      return {
        ...state,
        preferredCurrency: action.payload,
      };

    default:
      return state;
  }
};

export default appReducer;
