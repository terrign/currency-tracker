import ThemeProvider from './context/Theme.provider';
import Router from './router';

function App() {
  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}

export default App;
