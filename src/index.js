import React from 'react';
import ReactDOM from 'react-dom';

import App from './main/App'; //Componente a ser renderizado

//Recebe dois parâmetros: o componente a ser renderizado, o segundo 
//é para renderizar dentro da página index.html.
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);