package com.vocco.api.domain.estudante.dto;

import com.vocco.api.domain.estudante.Estudante;
import com.vocco.api.domain.estudante.NivelEscolar;
import java.time.LocalDate;

public record DadosListagemEstudante(
        Long id,
        String nome,
        String email,
        LocalDate dataNascimento,
        String celular,
        NivelEscolar nivelEscolar
) {
    public DadosListagemEstudante(Estudante estudante){
        this(estudante.getId(), estudante.getNome(), estudante.getEmail(), estudante.getDataNascimento(), estudante.getCelular(), estudante.getNivelEscolar());
    }
}
