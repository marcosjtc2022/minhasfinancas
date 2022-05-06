import React from "react";
import Login from "../views/login";
import Home from "../views/home";
import CadastroUsuario from "../views/cadastroUsuario";
import ConsultaLancamentos from "../views/consulta-lancamentos";

import { Route,Switch,HashRouter} from 'react-router-dom'

function Rotas(){
  //HashRouter = # da url
  //Caso coloque no browser a palavra 'Login'. o react renderiza o componente Login
    return (
        <HashRouter> 
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/cadastro-usuarios" component={CadastroUsuario} />
              <Route path="/consulta-lancamentos" component={ConsultaLancamentos} />

            </Switch>
        </HashRouter>

    )

}

export default Rotas