package com.vocco.api.domain.administrador.dto;

import com.vocco.api.domain.endereco.dto.DadosAtualizacaoEndereco;

public record DadosAtualizacaoAdministrador(
        Long id,
        String nome,
        String cpf,
        String email,
        String senha,
        String cargo,
        String celular,
        DadosAtualizacaoEndereco endereco) {
}
