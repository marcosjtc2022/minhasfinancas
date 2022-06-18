import LocalStorageService from "./localstorageService";

export const USUARIO_LOGADO = '_usuario_logado';

export default class AuthService {

    static isUsuarioAutenticado(){
        const usuario = LocalStorageService.obterItem(USUARIO_LOGADO);
        //Expressão booleana. Só verifica o segundo se o primeiro for nulo ou branco.
        //Verifica se existe um usuário e o usuário tem id.
        return usuario && usuario.id;
    }

    static removerUsuarioAutenticado(){
        LocalStorageService.removerItem(USUARIO_LOGADO);
    }

    static logar(usuario){
        LocalStorageService.adicionarItem(USUARIO_LOGADO, usuario);
    }

    static obterUsuarioAutenticado(){
        return LocalStorageService.obterItem(USUARIO_LOGADO);
    }

}