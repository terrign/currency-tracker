import { AppProvider } from './context/App/App.provider';
import { ThemeProvider } from './context/Theme/Theme.provider';
import { Router } from './router';

export function App() {
  return (
    <AppProvider>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </AppProvider>
  );
}
