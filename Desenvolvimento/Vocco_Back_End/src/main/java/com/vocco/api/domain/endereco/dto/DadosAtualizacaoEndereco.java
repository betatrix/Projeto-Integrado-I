package com.vocco.api.domain.endereco.dto;

import jakarta.validation.constraints.NotBlank;

public record DadosAtualizacaoEndereco(
        String cep,
        String logradouro,
        String estado,
        String cidade,
        String numero,
        String bairro,
        String complemento) {
}
