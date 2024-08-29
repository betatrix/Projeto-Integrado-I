package com.vocco.api.domain.teste.dto;

import jakarta.validation.constraints.NotNull;

public record DadosAtualizacaoTeste(
        @NotNull
        Long id,
        String titulo,
        String descricao) {
}
