package com.vocco.api.domain.politica.dto;

import com.vocco.api.domain.politica.Politica;
import com.vocco.api.domain.politica.TipoPolitica;

public record DadosDetalhamentoPolitica(
        Long id,
        TipoPolitica tipo,
        String descricao,
        Boolean ativo
) {
    public DadosDetalhamentoPolitica(Politica politica){
        this(politica.getId(), politica.getTipo(), politica.getDescricao(), politica.getAtivo());
    }
}
