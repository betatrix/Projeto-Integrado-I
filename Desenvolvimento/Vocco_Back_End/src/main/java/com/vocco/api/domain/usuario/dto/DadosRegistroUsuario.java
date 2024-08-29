package com.vocco.api.domain.usuario.dto;

import com.vocco.api.domain.usuario.UsuarioRole;

public record DadosRegistroUsuario(String login, String senha, UsuarioRole role) {
}
