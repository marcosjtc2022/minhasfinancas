import React from "react";
import 'bootswatch/dist/flatly/bootstrap.css'
import Login from './views/login' //Importando a classe que contém o arquivo js.

//Componente que inicializa a aplicação.

class App extends React.Component {
  
  render(){
    return (
    <div>
      <Login />  
    </div>
    )

  }

}

export default App;
