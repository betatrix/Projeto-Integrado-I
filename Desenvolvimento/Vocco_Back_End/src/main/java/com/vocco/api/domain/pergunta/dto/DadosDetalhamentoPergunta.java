package com.vocco.api.domain.pergunta.dto;

import com.vocco.api.domain.perfil.dto.DadosListagemPerfil;
import com.vocco.api.domain.pergunta.Pergunta;

public record DadosDetalhamentoPergunta(
        Long id,
        String texto,
        String textoIngles,
        Boolean ativo,
        DadosListagemPerfil perfil,
        String imagem
) {
    public DadosDetalhamentoPergunta(Pergunta pergunta){
        this(pergunta.getId(), pergunta.getTexto(), pergunta.getTextoIngles(), pergunta.isAtivo(), new DadosListagemPerfil(pergunta.getPerfil()), pergunta.getImagem());
    }
}
