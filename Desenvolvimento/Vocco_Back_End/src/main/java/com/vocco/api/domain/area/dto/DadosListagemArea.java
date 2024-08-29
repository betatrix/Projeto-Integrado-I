package com.vocco.api.domain.area.dto;

import com.vocco.api.domain.area.Area;

public record DadosListagemArea(Long id, String descricao) {
    public DadosListagemArea(Area area){
        this(area.getId(), area.getDescricao());
    }
}
