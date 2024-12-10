package com.vocco.api.domain.estudante.dto;

import com.vocco.api.domain.estudante.NivelEscolar;

import java.time.LocalDate;

public record DadosAtualizacaoEstudante(

        Long id,
        String nome,
        String email,
        String senha,
        LocalDate dataNascimento,
        String celular,
        NivelEscolar nivelEscolar) {
}
