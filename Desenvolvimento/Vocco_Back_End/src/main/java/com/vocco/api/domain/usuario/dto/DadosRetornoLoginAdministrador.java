package com.vocco.api.domain.usuario.dto;

import com.vocco.api.domain.administrador.Administrador;
import com.vocco.api.domain.administrador.dto.DadosDetalhamentoAdministrador;
import com.vocco.api.domain.usuario.Usuario;

public record DadosRetornoLoginAdministrador(
        String token,
        DadosDetalhamentoUsuario usuario,
        DadosDetalhamentoAdministrador administrador) {
    public DadosRetornoLoginAdministrador(String token, Usuario usuario, Administrador administrador){
        this(token,
                new DadosDetalhamentoUsuario(usuario),
                new DadosDetalhamentoAdministrador(administrador));
    }
}
