package com.vocco.api.domain.pergunta.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record DadosCadastroPergunta(
        @NotBlank
        String texto,
        String textoIngles,
        @NotNull
        Long testeId,
        @NotNull
        Long perfilId
) {
}
