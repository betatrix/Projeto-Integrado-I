package com.vocco.api.domain.teste.dto;

import jakarta.validation.constraints.NotNull;

public record DadosCadastroTeste(
        @NotNull
        String titulo,
        String descricao
) {
}
