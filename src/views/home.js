import React from "react";
import UsuarioService from "../app/service/usuarioService";
import LocalStorageService from "../app/service/localstorageService";
import axios from "axios";

class Home extends React.Component{

    state = {
     
        saldo: 0

    }

    constructor(){
        super();
        this.UsuarioService = new UsuarioService();
    }

    //Cria como função comum. 
    //Carrega quando a classe é inciada. 
    componentDidMount() {
        //Recupera usuário logado da classe login.js.
        const usuarioLogadoString = localStorage.getItem('_usuario_logado');
        //const usuarioLogadoString = LocalStorageService.obterItem('_usuario_logado');

        //JSON.stringify() transforma uma string em um objeto JSON.
        const usuarioLogado = JSON.parse(usuarioLogadoString);
        //console.log('Usuário logado do localstorage' , usuarioLogado);
        
        //Tira a aspa simples e coloca a crase para colocar o parâmetro dinâmico.
        //Desta forma, transforma-se em template string.
        //Pode quebrar a linha e colocar uma string dentro sem precisar concatenar.
        //Pode interpolar variáveis que estão no contexto.
        //axios.get(`http://localhost:8080/api/usuarios/${usuarioLogado.id}/saldo`)
        this.UsuarioService
            .obterSaldoPorusuario(usuarioLogado.id)
            .then( response => {
                this.setState({saldo: response.data})   
            }).catch( error => {
                console.error(error.response)
            })
    }
    // O ciclo de vida do react sãp callbacks que são executados em fases específicas.
    //Depois que o componente executar(montado ou desmontado) na tela,
    // irá executar as instruções em um callback(function).
    //componentDidMount,componentWillUnmount
    //Sessão irá durar enquanto não limpar o localstorage.
    render(){

        return (
            <div className="jumbotron">
                <h1 className="display-3">Bem vindo!</h1>
                <p className="lead">Esse é seu sistema de finanças.</p>
                <p className="lead">Seu saldo para o mês atual é de R$ {this.state.saldo}</p>
                <hr className="my-4" />
                <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
                <p className="lead">
                    <a className="btn btn-primary btn-lg" href="#/cadastro-usuarios" role="button"><i className="fa fa-users"></i>  Cadastrar Usuário</a>
                    <a className="btn btn-danger btn-lg" href="https://bootswatch.com/flatly/#" role="button"><i className="fa fa-users"></i>  Cadastrar Lançamento</a>
                </p>
            </div>
        
      )

    }

}

export default Home