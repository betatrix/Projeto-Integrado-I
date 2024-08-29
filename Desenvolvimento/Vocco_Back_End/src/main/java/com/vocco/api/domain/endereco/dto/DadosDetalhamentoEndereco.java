package com.vocco.api.domain.endereco.dto;

import com.vocco.api.domain.endereco.Endereco;

public record DadosDetalhamentoEndereco(
        String cep,
        String logradouro,
        String estado,
        String cidade,
        String numero,
        String bairro,
        String complemento) {
    public DadosDetalhamentoEndereco(Endereco endereco){
        this(endereco.getCep(), endereco.getLogradouro(), endereco.getEstado(), endereco.getCidade(), endereco.getNumero(), endereco.getBairro(), endereco.getComplemento());
    }
}
