package com.vocco.api.domain.instituicao.dto;

import com.vocco.api.domain.endereco.dto.DadosCadastroEndereco;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record DadosCadastroInstituicao(
        @NotBlank
        String nome,
        @NotBlank
        String site,
        @NotBlank
        String sigla,
        BigDecimal notaMec,
        String formaIngresso,
        @NotNull
        @Valid
        DadosCadastroEndereco endereco
) {
}
