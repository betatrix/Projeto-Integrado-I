package com.vocco.api.domain.teste.dto;

import com.vocco.api.domain.teste.Teste;

public record DadosListagemTeste(
        String titulo,
        String descricao
) {
    public DadosListagemTeste(Teste teste){
        this(teste.getTitulo(), teste.getDescricao());
    }
}
