import { Button } from 'components/UI';
import { Component } from 'react';

import * as styles from './styles.module.css';

interface State {
  hasError: boolean;
  errorMessage: string | null;
}
interface Props {
  children?: JSX.Element;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props | Readonly<Props>) {
    super(props);
    this.state = { hasError: false, errorMessage: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorMessage: error.message };
  }

  refreshPage = () => {
    window.location.reload();
  };

  render() {
    const { hasError, errorMessage } = this.state;
    if (hasError) {
      return (
        <section className={styles.boundary}>
          <h1>Something went wrong, please try to reload</h1>
          <p>Error: {errorMessage}</p>
          <Button key="console" onClick={this.refreshPage} type="button">
            Try to reload
          </Button>
        </section>
      );
    }

    return this.props.children;
  }
}
