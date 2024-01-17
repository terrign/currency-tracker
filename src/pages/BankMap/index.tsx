import { CURRENCY_ISO_SYMBOL_MAP } from '@constants';
import { AutoComplete } from 'components/Autocomplete';
import { MarkersList } from 'components/BankMap/MarkersList';
import { Loader } from 'components/UI';
import { Component, lazy, Suspense } from 'react';
import { CurISO, NoProps } from 'types';
import { filterBanksByCurrency } from 'utils';

import * as styles from './styles.module.css';

const CustomMap = lazy(() => import('components/BankMap').then((module) => ({ default: module['BankMap'] })));

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
        <section className={styles.bankWrapper}>
          <h2 className={styles.bankHeader}>Search currency in the bank</h2>
          <AutoComplete selectHandler={this.selectHandler} searchObject={CURRENCY_ISO_SYMBOL_MAP} defaultValue="" />
        </section>
        <Suspense fallback={<Loader />}>
          <CustomMap>
            <MarkersList markers={filterBanksByCurrency(this.state.currency)} />
          </CustomMap>
        </Suspense>
      </>
    );
  }
}
