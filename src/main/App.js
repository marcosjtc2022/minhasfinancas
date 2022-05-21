import React from "react";
import 'bootswatch/dist/flatly/bootstrap.css'
//import Login from '../views/login' //Importando a classe que contém o arquivo js.
//import CadastroUsuario from "../views/cadastroUsuario";
import Navbar from "../components/navbar";
import Rotas from "./rotas";
import '../custom.css';
import 'toastr/build/toastr.css';
import 'toastr/build/toastr.min.js';
//import 'primereact/resources/themes/nova-light/theme.css'
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';




//Componente que inicializa a aplicação.

class App extends React.Component {
  
  render(){
    return (
    <>
      <Navbar />
      <div className="container">
        <Rotas />  
      </div>
    </>
    )

  }

}

export default App;
