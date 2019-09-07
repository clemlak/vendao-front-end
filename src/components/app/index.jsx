import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
import {
  createGlobalStyle,
} from 'styled-components';

import Home from '../../routes/home';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #f7f7fa;
    font-family: 'Source Sans Pro';
  }
`;

function App() {
  return (
    <BrowserRouter>
      <>
        <GlobalStyle />
        <Switch>
          <Route path="/" exact component={Home} />
        </Switch>
      </>
    </BrowserRouter>
  );
}

export default App;
