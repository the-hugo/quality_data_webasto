import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react'
// import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.scss';
import "@fontsource/roboto";
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ChakraProvider>
);
