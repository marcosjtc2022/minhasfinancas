import ApiService from "../apiservice";
import ErroValidacao from "../exception/ErroValidacao";

class UsuarioService extends ApiService{

    constructor(){
        super('/api/usuarios');
    }

    autenticar(credenciais){
        return this.post('/autenticar',credenciais);
    }

    obterSaldoPorusuario(id){
        return this.get(`/${id}/saldo`);
    }

    salvar(usuario){
        return this.post('/', usuario);

    }

    validar(usuario){

        const erros = [];

      if(!usuario.nome){
        erros.push('O campo Nome é obrigatório');
      }

      if(!usuario.email){
        erros.push('O campo Email é obrigatório');
        //Expressão regular é pra saber se uma string está no formato correto. 
        //Regex para validar email, não precisa colocar como string.
      }else if (! usuario.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)){
        erros.push('Informe um Email válido.');
      } 

      if(!usuario.senha || !usuario.senhaRepeticao){
        erros.push('Digite a senha 2x.');
         //Forma de comparação tem dois iguais.
      }else if (usuario.senha !== usuario.senhaRepeticao){
        erros.push('As senhas não iguais.');
     } 

      if (erros && erros.length > 0){
          throw new ErroValidacao(erros);
      }

    }

}

export default UsuarioService;