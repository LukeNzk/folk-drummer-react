import React from 'react';
import Header from 'components/Header';
import DrumSettings from 'components/DrumSettings';
import AudioPlayer from 'components/AudioPlayer';

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

const theme = createMuiTheme({
  palette: {
    type: 'dark'
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      'Oxygen',
      'Ubuntu',
      'Cantarell',
      'Fira Sans',
      'Droid Sans',
      '"Helvetica Neue"',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(',')
  }
});

const withTheme = (Component: any) => (
  <ThemeProvider theme={theme}>
    <CssBaseline/>
    <Component/>
  </ThemeProvider>);

const AppContainer = () => withTheme(() => {
  return (
    <Container maxWidth='xs'>
      <header>
        <Header text="Metronome"/>
      </header>
      <section>
        <DrumSettings/>
          <AudioPlayer/>
      </section>
    </Container>
  );
})

function App() {
  return (
    <AppContainer/>
  );
}

export default App;
