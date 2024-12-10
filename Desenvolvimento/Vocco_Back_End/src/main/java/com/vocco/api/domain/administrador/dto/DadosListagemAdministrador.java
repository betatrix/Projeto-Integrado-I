package com.vocco.api.domain.administrador.dto;

import com.vocco.api.domain.administrador.Administrador;

public record DadosListagemAdministrador(
        Long id,
        String nome,
        String email,
        String cargo,
        String celular,
        Boolean ativo
) {
    public DadosListagemAdministrador(Administrador administrador){
        this(administrador.getId(), administrador.getNome(), administrador.getUsuario().getLogin(),
                administrador.getCargo(), administrador.getCelular(), administrador.getAtivo());
    }
}
