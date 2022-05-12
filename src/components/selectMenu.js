import React from "react";
//props vai receber a lista dos options do combobox
export default (props) => {
    //Objeto map mapeia a lista para um outro tipo de objeto.
    //Neste caso um array de options.
    //Quando tem um parâmetro na aerofucntion não precisa parêntesis.
    const options = props.lista.map( (option, index) => {

        return (
            //Propriedade key é importante para que no momento 
            //da atualização o dom saiba qual é o componente.
            <option key={index} value={option.value}>{option.label}</option>
        )
    } )

    return (
        //Pega todas as propriedades do componente props e espalha (spread)
        //no select. (Ex: className="form-control")
        <select {...props}>
            {options}
        </select>
    )

}