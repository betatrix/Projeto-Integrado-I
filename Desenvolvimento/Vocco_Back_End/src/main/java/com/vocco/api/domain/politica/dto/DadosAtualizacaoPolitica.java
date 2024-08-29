package com.vocco.api.domain.politica.dto;

import com.vocco.api.domain.politica.TipoPolitica;
import jakarta.validation.constraints.NotNull;

public record DadosAtualizacaoPolitica(
        @NotNull
        Long id,
        TipoPolitica tipo,
        String descricao
) {
}
