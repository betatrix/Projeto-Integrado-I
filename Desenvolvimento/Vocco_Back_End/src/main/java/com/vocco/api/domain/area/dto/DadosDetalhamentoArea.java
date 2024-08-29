package com.vocco.api.domain.area.dto;

import com.vocco.api.domain.area.Area;

public record DadosDetalhamentoArea(
        Long id,
        String descricao,
        Boolean ativo
) {
    public DadosDetalhamentoArea(Area area){
        this(area.getId(), area.getDescricao(), area.getAtivo());

    }
}
