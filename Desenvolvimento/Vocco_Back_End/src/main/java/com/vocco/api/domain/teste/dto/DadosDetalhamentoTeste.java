package com.vocco.api.domain.teste.dto;

import com.vocco.api.domain.pergunta.dto.DadosListagemPergunta;
import com.vocco.api.domain.teste.Teste;

import java.util.List;
import java.util.Optional;

public record DadosDetalhamentoTeste(
        Long id,
        String titulo,
        String descricao,
        Optional<List<DadosListagemPergunta>> perguntas
) {
    public DadosDetalhamentoTeste(Teste teste, List<DadosListagemPergunta> perguntas){
        this(teste.getId(), teste.getTitulo(), teste.getDescricao(),
                Optional.ofNullable(perguntas != null ? perguntas : null));
    }
}
