package com.vocco.api.domain.usuario.dto;

import com.vocco.api.domain.estudante.Estudante;
import com.vocco.api.domain.estudante.dto.DadosDetalhamentoEstudante;
import com.vocco.api.domain.usuario.Usuario;

public record DadosRetornoLoginEstudante(
        String token,
        DadosDetalhamentoUsuario usuario,
        DadosDetalhamentoEstudante estudante) {
    public DadosRetornoLoginEstudante(String token, Usuario usuario, Estudante estudante){
        this(token,
                new DadosDetalhamentoUsuario(usuario),
                new DadosDetalhamentoEstudante(estudante));
    }
}
