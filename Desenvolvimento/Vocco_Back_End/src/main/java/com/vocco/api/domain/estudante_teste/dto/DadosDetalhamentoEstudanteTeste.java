package com.vocco.api.domain.estudante_teste.dto;

import com.vocco.api.domain.estudante.dto.DadosListagemEstudante;
import com.vocco.api.domain.estudante_teste.EstudanteTeste;
import com.vocco.api.domain.teste.dto.DadosListagemTeste;

import java.time.LocalDate;

public record DadosDetalhamentoEstudanteTeste(
        Long id,
        LocalDate data,
        DadosListagemTeste teste,
        DadosListagemEstudante estudante
) {
    public DadosDetalhamentoEstudanteTeste(EstudanteTeste estudanteTeste){
        this(estudanteTeste.getId(), estudanteTeste.getData(), new DadosListagemTeste(estudanteTeste.getTeste()), new DadosListagemEstudante(estudanteTeste.getEstudante()));
    }
}
