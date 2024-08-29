package com.vocco.api.domain.estudante.dto;

import com.vocco.api.domain.endereco.Endereco;
import com.vocco.api.domain.estudante.NivelEscolar;
import java.time.LocalDate;
import com.vocco.api.domain.estudante.Estudante;

public record DadosDetalhamentoEstudante(
        Long id,
        String nome,
        String email,
        LocalDate dataNascimento,
        String celular,
        Boolean ativo,
        NivelEscolar nivelEscolar) {
    public DadosDetalhamentoEstudante(Estudante estudante){
        this(estudante.getId(), estudante.getNome(), estudante.getEmail(), estudante.getDataNascimento(), estudante.getCelular(), estudante.isAtivo(), estudante.getNivelEscolar());
    }
}
