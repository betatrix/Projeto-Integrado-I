package com.vocco.api.domain.instituicao.dto;

import com.vocco.api.domain.endereco.dto.DadosAtualizacaoEndereco;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record DadosAtualizacaoInstituicao(
        @NotNull
        Long id,
        String nome,
        String site,
        BigDecimal notaMec,
        String sigla,
        String formaIngresso,
        DadosAtualizacaoEndereco endereco) {
}
