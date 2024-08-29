package com.vocco.api.domain.area.dto;

import jakarta.validation.constraints.NotNull;

public record DadosCadastroArea(
        @NotNull
        String descricao
) {
}
