import React from "react";

import Card from "../../components/card";
import FormGroup from "../../components/form-group";


import { withRouter } from "react-router-dom";
import SelectMenu from "../../components/selectMenu";
import LancamentoService from "../../app/service/lancamentoService";



class CadastroLancmentos extends React.Component{

    state = {
        id: null,
        descricao: '',
        valor: '',
        mes: '',
        ano: '',
        tipo: '',
        status: ''

    }
    
    constructor(){
        super();
        this.service = new LancamentoService();
    }

    submit = () => {
        console.log(this.state);
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

          <Card title="Cadastro de Lançamento">
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
                <button onClick={this.submit} className="btn btn-success">Salvar</button>
                <button className="btn btn-danger">Cancelar</button>
              </div> 
            </div>
          </Card>


       )  

    }

}

export default withRouter(CadastroLancmentos);