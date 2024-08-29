package com.vocco.api.domain.pergunta.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record DadosCadastroPergunta(
        @NotBlank
        String texto,
        @NotNull
        Long testeId,
        @NotNull
        Long perfilId
) {
}
