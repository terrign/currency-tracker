import { Dispatch } from 'react';

import { CurISO } from '../../constants/currencyISOSymbolMap';

export interface CurrencyAction {
  type: 'preferredCurrency';
  payload: CurISO;
}

export interface AppContextType {
  preferredCurrency: CurISO | null;
  dispatch: Dispatch<Action> | null;
}

export type Action = CurrencyAction;

export type ReducerState = Omit<AppContextType, 'dispatch'>;

export interface AppReducerType {
  (state: ReducerState, action: Action): typeof state;
}
