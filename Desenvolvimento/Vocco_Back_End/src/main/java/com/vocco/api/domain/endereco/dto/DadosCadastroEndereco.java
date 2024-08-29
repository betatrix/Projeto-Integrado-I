package com.vocco.api.domain.endereco.dto;

import jakarta.validation.constraints.NotBlank;

public record DadosCadastroEndereco(
        @NotBlank
        String cep,
        @NotBlank
        String logradouro,
        @NotBlank
        String estado,
        @NotBlank
        String cidade,
        @NotBlank
        String numero,
        String bairro,
        String complemento) {
}
