package com.vocco.api.infra.exception;

import org.springframework.validation.FieldError;

public record DadosErroValidacao(String campo, String mensagem) {
    public DadosErroValidacao(FieldError erro) {
        this(erro.getField(), erro.getDefaultMessage());
    }
}
