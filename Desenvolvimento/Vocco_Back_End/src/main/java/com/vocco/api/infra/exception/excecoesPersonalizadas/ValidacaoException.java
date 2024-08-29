package com.vocco.api.infra.exception.excecoesPersonalizadas;
public class ValidacaoException extends RuntimeException{
    public ValidacaoException(String mensagem) {
        super(mensagem);
    }
}
