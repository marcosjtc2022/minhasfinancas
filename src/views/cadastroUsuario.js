//Componente de classe.
import React from "react";
import { withRouter } from 'react-router-dom'
import Card from '../components/card'
import FormGroup from "../components/form-group";
import UsuarioService from "../app/service/usuarioService";
import { mensagemSucesso, mensagemErro } from '../components/toastr';

class CadastroUsuario extends React.Component{

    state = {
       nome : '',
       email : '' ,
       senha : '',
       senhaRepeticao : ''

    }

    constructor(){
      super();
      this.service = new UsuarioService();

    }

    validar(){
      const msgs = [];

      if(!this.state.nome){
         msgs.push('O campo Nome é obrigatório');
      }

      if(!this.state.email){
         msgs.push('O campo Email é obrigatório');
        //Expressão regular é pra saber se uma string está no formato correto. 
        //Regex para validar email, não precisa colocar como string.
      }else if (! this.state.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)){
         msgs.push('Informe um Email válido.');
      } 

      if(!this.state.senha || !this.state.senhaRepeticao){
         msgs.push('Digite a senha 2x.');
         //Forma de comparação tem dois iguais.
      }else if (this.state.senha !== this.state.senhaRepeticao){
        msgs.push('As senhas não iguais.');
     } 

      return msgs; 
    }

    //Aerofunction
    //Mesmas propriedades do UsuarioDTO da API.
    cadastrar = () => {
      const msgs = this.validar();
      //Se o array existe e tem mensagem( Array preenchido).
      if (msgs && msgs.length > 0){
          //O método forEach é usado para fazer uma iteração dentro do array.
          //msg = elemento; index = posição.
          msgs.forEach( (msg, index)  => {
             mensagemErro(msg);
          });
          //Interrompe o método cadastrar.
          return false;
      }

      const usuario = {
        nome: this.state.nome,
        email: this.state.email,
        senha: this.state.senha
      }  

      this.service.salvar(usuario)
      .then( response => {
          mensagemSucesso('Usuário cadastrado com sucesso! Faça o login para acessar o sistema.');
          this.props.history.push('/login');
      }).catch(error => {
        mensagemErro(error.response.data.message);
      });

    }

    cancelar = () => {
      this.props.history.push('/login');
    }

// evento (e) + callbackfunction
     render(){

       return(
       
          <Card title="Cadastro de Usuário">
          <div className="row">
              <div className="col-lg-12">
                <div className="bs-component">
                    <FormGroup label="Nome: *" htmlFor="inputNome">
                        <input type="text"
                         id="inputNome"
                         className="form-control" 
                         name="nome" 
                         onChange={e => this.setState({nome: e.target.value})}/>
                    </FormGroup>
                    <FormGroup label="Email: *" htmlFor="inputEmail">
                        <input type="email"
                         id="inputEmail" 
                         className="form-control" 
                         name="email" 
                         onChange={e => this.setState({email: e.target.value})}/>
                    </FormGroup>
                    <FormGroup label="Senha: *" htmlFor="inputSenha">
                        <input type="password"
                         id="inputSenha" 
                         className="form-control" 
                         name="senha" 
                         onChange={e => this.setState({senha: e.target.value})}/>
                    </FormGroup>
                    <FormGroup label="Repita a Senha: *" htmlFor="inputRepitaSenha">
                        <input type="password"
                         id="inputRepitaSenha" 
                         className="form-control" 
                         name="senha" 
                         onChange={e => this.setState({senhaRepeticao: e.target.value})}/>
                    </FormGroup>
                    <button onClick={this.cadastrar} type="button" className="btn btn-success">Salvar</button>
                    <button onClick={this.cancelar} type="button" className="btn btn-danger">Cancelar</button>
                </div>
              </div> 
          </div>    
          </Card>
        
       


       )

     } 

}

export default withRouter ( CadastroUsuario )