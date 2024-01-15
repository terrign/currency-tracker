import { StrictMode } from 'react';

import { AppProvider } from './context/App/App.provider';
import { ThemeProvider } from './context/Theme/Theme.provider';
import { Router } from './router';

export function App() {
  return (
    <StrictMode>
      <AppProvider>
        <ThemeProvider>
          <Router />
        </ThemeProvider>
      </AppProvider>
    </StrictMode>
  );
}
