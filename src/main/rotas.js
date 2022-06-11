import React from "react";
import Login from "../views/login";
import Home from "../views/home";
import CadastroUsuario from "../views/cadastroUsuario";
import ConsultaLancamentos from "../views/lancamentos/consulta-lancamentos";
import CadastroLancamentos from "../views/lancamentos/cadastro-lancamentos";

import { Route,Switch,HashRouter, Redirect} from 'react-router-dom'

const isUsuarioAutenticado = () => {
    return true;
}

//Usando um operado destructor para pegar parte de props.
//No caso a propriedade component que foi passada abaixo: component={ConsultaLancamentos}.
//Component é um alias.
//Todos os componentes começam com letra maiúscula.
//(...) spread operator coloca todas as props junto com componentProps.
function RotaAutenticada({component: Component, ...props}){ 
  return (
    //Espalha a propriedade para uma rota comum.
    //Outra forma de renderizar o componente Router.
     <Route {...props} render={(componentProps) =>{
       if (isUsuarioAutenticado()){
         return (
             <Component {...componentProps} />
         ) 
        } else {
             return (
                 // Redireciona para uma rota.
                 //Salva na variável state a rota que estava tentando acessar.
                 <Redirect to={ {pathname: '/login', state: {from: componentProps.location}} } />
             ) 
        }  

     }  }/>
  )
}

function Rotas(){
  //HashRouter = # da url
  //Caso coloque no browser a palavra 'Login'. o react renderiza o componente Login
    return (
        <HashRouter> 
            <Switch>
              //Path e componente renderizado. 
              <Route path="/login" component={Login} />
              <Route path="/cadastro-usuarios" component={CadastroUsuario} />
              <RotaAutenticada path="/home" component={Home} />
              <RotaAutenticada path="/consulta-lancamentos" component={ConsultaLancamentos} />
              //Interrogação no fim determina que o parâmetro é opcional.
              //Isso evita erro!
              <RotaAutenticada path="/cadastro-lancamentos/:id?" component={CadastroLancamentos} />
              
              
            </Switch>
        </HashRouter>

    )

}

export default Rotas