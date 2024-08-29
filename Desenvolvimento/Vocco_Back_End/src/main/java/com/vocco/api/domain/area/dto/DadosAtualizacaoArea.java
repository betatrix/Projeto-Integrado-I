package com.vocco.api.domain.area.dto;

import jakarta.validation.constraints.NotNull;

public record DadosAtualizacaoArea(
        @NotNull
        Long id,
        String desricao
) {
}
