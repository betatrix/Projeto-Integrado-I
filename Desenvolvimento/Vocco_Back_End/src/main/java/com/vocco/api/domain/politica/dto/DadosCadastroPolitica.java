package com.vocco.api.domain.politica.dto;

import com.vocco.api.domain.politica.TipoPolitica;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record DadosCadastroPolitica(
        @NotNull
        TipoPolitica tipo,
        @NotBlank
        String descricao
) {
}
