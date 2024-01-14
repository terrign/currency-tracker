import { Component } from 'react';

import { Button } from '../UI';
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
    if (this.state.hasError) {
      return (
        <div className={styles.boundary}>
          <h1>Something went wrong, please try to reload</h1>
          <p>Error: {this.state.errorMessage}</p>
          <Button key="console" onClick={this.refreshPage} type="button">
            Try to reload
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
