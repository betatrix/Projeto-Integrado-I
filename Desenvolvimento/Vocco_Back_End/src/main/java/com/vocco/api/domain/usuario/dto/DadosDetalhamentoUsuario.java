package com.vocco.api.domain.usuario.dto;

import com.vocco.api.domain.usuario.Usuario;
import com.vocco.api.domain.usuario.UsuarioRole;

public record DadosDetalhamentoUsuario(
        Long id,
        String login,
        UsuarioRole role,
        Boolean ativo,
        String fotoDePerfil
) {
    public DadosDetalhamentoUsuario(Usuario usuario){
        this(usuario.getId(), usuario.getLogin(), usuario.getRole(), usuario.getAtivo(), usuario.getFotoDePerfil());
    }
}
