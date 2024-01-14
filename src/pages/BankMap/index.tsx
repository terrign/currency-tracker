import { Component, lazy, Suspense } from 'react';

import { AutoComplete } from '../../components/Autocomplete';
import { Loader } from '../../components/UI';
import { CUR_ISO_SYMBOL_MAP, CurISO } from '../../constants/currencyISOSymbolMap';
import { NoProps } from '../../models';
import { filterByCurrency } from '../../utils/filterByCurrency';
import * as styles from './styles.module.css';

const CustomMap = lazy(() => import('../../components/BankMap').then((module) => ({ default: module['BankMap'] })));

export class BankMap extends Component<NoProps, { currency: CurISO }, undefined> {
  constructor(props: NoProps) {
    super(props);
    this.state = {
      currency: '',
    };
  }

  selectHandler = (key: CurISO) => () => {
    this.setState({ currency: key });
  };

  render() {
    return (
      <>
        <div className={styles.bankWrapper}>
          <h2 className={styles.bankHeader}>Search currency in the bank</h2>
          <AutoComplete selectHandler={this.selectHandler} searchObject={CUR_ISO_SYMBOL_MAP} defaultValue="" />
        </div>
        <Suspense fallback={<Loader />}>
          <CustomMap markers={filterByCurrency(this.state.currency)} />
        </Suspense>
      </>
    );
  }
}
