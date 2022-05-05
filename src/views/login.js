import React from "react";
import Card from '../components/card'
import FormGroup from "../components/form-group";
import { withRouter } from 'react-router-dom'
//import axios from "axios";
import UsuarioService from "../app/service/usuarioService";
import LocalStorageService from "../app/service/localstorageService";
import { mensagemErro} from '../components/toastr';


class Login extends React.Component{

    state = {
        email: '',
        senha: '',
        mensagemErro: null
    }
    
    //Toda vez que coloca um construtor que estende uma super classe,
    //deve-se colocar a palavra super.
    constructor(){
        super();
        this.service = new UsuarioService();

    }

    entrar = () =>{
       console.log('Email: ', this.state.email)
       console.log('Senha' , this.state.senha)
       //Axios é baseado em promisses, que é a forma que o javascript
       //encontrou para realzar operações assíncronas.
       //Antes de enviar a resposta para o servidor já executa a próxima requisição.
       //async + await = A requisição é assíncrona, mas com 'await' só passa para a,
       //próxima linha quando tiver o retorno da requisição.
       //Localstorage - Apenas o front end tem acesso. Os cookies, por sua vez, podem ser recuperados,
       //dentro da aplicação java. Neste caso, o localstorage será utilizado para armazenar no browser.
       //Recupera o usuário logado para ser utilizado em outras telas.
       this.service.autenticar({
        email: this.state.email,
        senha: this.state.senha 
     //  })
     /*  axios.post('http://localhost:8080/api/usuarios/autenticar', {
               email: this.state.email,
               senha: this.state.senha  */
       }).then (response => {
            //console.log(response)
            //JSON.stringify() transforma o objeto JSON em uma string.
            LocalStorageService.adicionarItem('_usuario_logado', response.data)
           //* localStorage.setItem('_usuario_logado', JSON.stringify(response.data));
            this.props.history.push("/home");
           // this.props.history.push("/home");
       }).catch( erro =>{
           // this.setState({mensagemErro: erro.response.data.message});
            //console.log("teste")
            mensagemErro(erro.response.data.message);
       })



    }

    prepareCadastrar = () => {

        this.props.history.push('/cadastro-usuarios');
    }
   
    render(){
      return (   
       
            <div className="row">
                <div className="col-md-6" style={{position: 'relative', left: '300px'}}>
                    <div className="bs-docs-section">
                      <Card title="Login">
                         <div className="row">
                             <span>{this.state.mensagemErro}</span>
                         </div> 
                         <div className="row">
                             <div className="col-lg-12">
                                 <div className="bs-component">
                                     <fieldset>
                                        <FormGroup label="Email: *" htmlFor="exampleInputEmail1">
                                           <input type="email"
                                           value={this.state.email}
                                           onChange={e => this.setState({email: e.target.value})}
                                           className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Digite o Email"/>
                                        </FormGroup>
                                        <FormGroup label="Senha: *" htmlFor="exampleInputPassword1">
                                           <input type="password"
                                           value={this.state.senha}
                                           onChange={e => this.setState({senha: e.target.value})}
                                           
                                           className="form-control" id="exampleInputPassword1" placeholder="Password" />
                                        </FormGroup>
                                        <button onClick={this.entrar} type="button" className="btn btn-success">Entrar</button>
                                        <button onClick={this.prepareCadastrar}  type="button" className="btn btn-danger">Cadastrar</button>
                                     </fieldset>
                                 </div>
                             </div> 
                         </div>
                      </Card>
                    </div>
                </div>
            </div>
        
      )

    }
    

}

//Decorator - Recebe o componente como parâmetro,
//e retorna o mesmo componente, com novas funcionalidades.
//Adiciona a funcionalidade de navegar para outros componentes.
//Quando colocado desta forma ganha uma propriedade chamada history, através do props.
export default withRouter( Login );