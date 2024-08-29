package com.vocco.api.domain.pergunta.dto;

import com.vocco.api.domain.estudante_perfil.EstudantePerfil;
import com.vocco.api.domain.perfil.dto.DadosListagemPerfil;
import com.vocco.api.domain.pergunta.Pergunta;

public record DadosDetalhamentoPergunta(
        String texto,
        Boolean ativo,
        DadosListagemPerfil perfil
) {
    public DadosDetalhamentoPergunta(Pergunta pergunta){
        this(pergunta.getTexto(), pergunta.isAtivo(), new DadosListagemPerfil(pergunta.getPerfil()));
    }
}
