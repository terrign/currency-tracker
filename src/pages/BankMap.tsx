import { Component, ContextType } from 'react';

import AutoComplete from '../components/Autocomplete';
import CustomMap from '../components/Map';
import { BankMapInfo } from '../constants/bankMapInfo';
import { CUR_ISO_SYMBOL_MAP, CurISO } from '../constants/currencyISOSymbolMap';
import AppContext from '../context/App/App.context';
import { NoProps } from '../models';
import { filterByCurrency } from '../utils/filterByCurrency';
import * as styles from './styles.module.css';

class BankMap extends Component<NoProps, { currency: CurISO }, undefined> {
  static contextType = AppContext;

  declare context: ContextType<typeof AppContext>;

  constructor(props: NoProps) {
    super(props);
    this.state = {
      currency: 'USD',
    };
  }

  // @ts-expect-error unused param
  shouldComponentUpdate(_, nextState: Readonly<{ currency: CurISO; markers: BankMapInfo[] }>): boolean {
    return this.state.currency !== nextState.currency;
  }

  componentDidUpdate(): void {}

  selectHandler = (key: CurISO) => () => {
    this.setState({ currency: key });
  };

  render() {
    return (
      <>
        <div className={styles.bankWrapper}>
          <h2 className={styles.bankHeader}>Search currency in the bank</h2>
          <AutoComplete
            selectHandler={this.selectHandler}
            searchObject={CUR_ISO_SYMBOL_MAP}
            defaultValue={this.context.preferredCurrency!}
          />
        </div>
        <CustomMap markers={filterByCurrency(this.state.currency)} />
      </>
    );
  }
}

export default BankMap;
