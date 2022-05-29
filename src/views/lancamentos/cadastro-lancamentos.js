import React from "react";

import Card from "../../components/card";
import FormGroup from "../../components/form-group";


import { withRouter } from "react-router-dom";
import SelectMenu from "../../components/selectMenu";
import LancamentoService from "../../app/service/lancamentoService";
import * as messages from '../../components/toastr'
import LocalStorageService from "../../app/service/localstorageService";



class CadastroLancamentos extends React.Component{

    state = {
        id: null,
        descricao: '',
        valor: '',
        mes: '',
        ano: '',
        tipo: '',
        status: '',
        usuario: null,
        atualizando: false

    }
    
    constructor(){
        super();
        this.service = new LancamentoService();
    }

    //Vai ser executado depois que chama o render e mostra o formulário. 
    componentDidMount(){
        //Recebe os parâmetros da url da rota.
        const params = this.props.match.params;
        const params2 = this.props.params;
        if (params.id){
              this.service.obterPorId(params.id)
              .then(response => {
                  //(...) Coloca todas as propriedades do response.data dentro de setState
                  this.setState( {...response.data, atualizando: true} )
              })
              .catch(error =>{
                  messages.mensagemErro(error.response.data.message);
              })
        }
       // console.log('params:', params.props);
    }

    submit = () => {

        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');

        //Operador destructor. Vai desestruturar a propriedade (this.state),
        //em várias propriedades que são filhas do state.
        //O que se quer extrair.
        const {descricao,valor,mes,ano,tipo} = this.state;

        //Pode colocar a propriedade acima diretamtente abaixo.
        //Não precisa a repetição descricao: descricao.
        const lancamento = {descricao,valor,mes,ano,tipo,usuario:usuarioLogado.id};

        this.service
            .salvar(lancamento)
            .then(response => {
                this.props.history.push('/consulta-lancamentos');
                messages.mensagemSucesso('Lançamento cadastrado com sucesso!'); 
            }).catch(error => {
                messages.mensagemErro(error.response.data.message);
            })
    }

    atualizar = () => {

       
      
        //Operador destructor. Vai desestruturar a propriedade (this.state),
        //em várias propriedades que são filhas do state.
        //O que se quer extrair.
        const {descricao,valor,mes,ano,tipo,status, usuario,id} = this.state;

        //Pode colocar a propriedade acima diretamtente abaixo.
        //Não precisa a repetição descricao: descricao.
        const lancamento = {descricao,valor,mes,ano,tipo,usuario,status, id};

        this.service
            .atualizar(lancamento)
            .then(response => {
                this.props.history.push('/consulta-lancamentos');
                messages.mensagemSucesso('Lançamento atualizado com sucesso!'); 
            }).catch(error => {
                messages.mensagemErro(error.response.data.message);
            })
        


    }

    handleChange = (event) => {
       const value = event.target.value;
       const name = event.target.name;

       this.setState({ [name] : value });
    }

    render(){
       const tipos = this.service.obterListaTipos();
       const meses = this.service.obterListaMeses();

       return(
           
          //Operador ternário (? (if) - se for verdade - : (else))
          <Card title={this.state.atualizando ? 'Atualização de Lançamento':'Cadastro de Lançamento' }>
              <div className="row">
                <div className="col-md-12">
                  <FormGroup id="inputDescricao" label="Descrição: *">
                      <input id="inputDescricao" 
                      type="text"
                      className="form-control" 
                      name="descricao" 
                      value={this.state.descricao}
                      onChange={this.handleChange}/>
                  </FormGroup>
                </div>     
              </div>
              <div className="row">
                  <div className="col-md-6">
                      <FormGroup id="inputAno" label="Ano: *">
                         <input id="inputAno" 
                          type="text" 
                          className="form-control" 
                          name="ano" 
                          value={this.state.ano}
                          onChange={this.handleChange}/>
                      </FormGroup>
                  </div>
                  <div className="col-md-6">
                      <FormGroup id="inputMes" label="Mês: *">
                        <SelectMenu id="inputMes"
                         lista={meses}
                         className="form-control"
                         name="mes" 
                         value={this.state.mes}
                         onChange={this.handleChange}/>
                      </FormGroup>
                  </div>
                  <div className="col-md-4">
                      <FormGroup id="inputValor" label="Valor: *">
                         <input id="inputValor"
                          type="text" 
                          className="form-control" 
                          name="valor" 
                          value={this.state.valor}
                          onChange={this.handleChange}/>
                      </FormGroup>
                  </div>
                  <div className="col-md-4">
                      <FormGroup id="inputTipo" label="Tipo: *">
                         <SelectMenu id="inputTipo"
                          lista={tipos} 
                          className="form-control"
                          name="tipo" 
                          value={this.state.tipo}
                          onChange={this.handleChange}/>
                      </FormGroup>
                  </div>

                  <div className="col-md-4">
                      <FormGroup id="inputStatus" label="Status: ">
                         <input type="text" 
                          name="status" 
                          value={this.state.status}
                          className="form-control" disabled />
                      </FormGroup>
                  </div>
                 
            </div>
            <div className="row">
              <div className="col-md-6">
                { this.state.atualizando ? 
                    (
                        <button onClick={this.atualizar} className="btn btn-success">Atualizar</button>
                    ) : (
                        <button onClick={this.submit} className="btn btn-success">Salvar</button>
                    )
                }                  
                
                <button onClick={e => this.props.history.push('/consulta-lancamentos')} className="btn btn-danger">Cancelar</button>
              </div> 
            </div>
          </Card>


       )  

    }

}

export default withRouter(CadastroLancamentos);