import ThemeProvider from './context/ThemeProvider';
import Router from './router';

function App() {
  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}

export default App;
