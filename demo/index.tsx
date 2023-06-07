import 'react-app-polyfill/ie11';
import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ModalContainer from './src/service/modal-manager/container';

import Example from './src/example';
import Dashboard from './src/dashboard';

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
  }

  #root {
    height: 100%;
  }
`;

const App = () => {
  return (
    <div style={{ height: '100%', position: 'relative' }}>
      <Router>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Example />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
      </Router>
      <ModalContainer />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
