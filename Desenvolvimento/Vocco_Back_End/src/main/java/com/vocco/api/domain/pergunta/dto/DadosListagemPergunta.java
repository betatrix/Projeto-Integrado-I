package com.vocco.api.domain.pergunta.dto;

import com.vocco.api.domain.pergunta.Pergunta;

public record DadosListagemPergunta(
        Long id,
        String texto,
        String imagem,
        String textoIngles,
        Boolean ativo
) {
    public DadosListagemPergunta(Pergunta pergunta){
        this(pergunta.getId(), pergunta.getTexto(), pergunta.getImagem(), pergunta.getTextoIngles(), pergunta.isAtivo());
    }
}
