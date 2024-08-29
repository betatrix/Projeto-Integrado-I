package com.vocco.api.domain.politica_instituicao.dto;

import jakarta.validation.constraints.NotNull;

public record DadosCadastroPoliticaInstituicao(
        @NotNull
        Long politicaId,
        @NotNull
        Long instituicaoId
) {
}
