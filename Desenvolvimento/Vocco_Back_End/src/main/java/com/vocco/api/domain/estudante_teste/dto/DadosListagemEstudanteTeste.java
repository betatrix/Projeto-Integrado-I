package com.vocco.api.domain.estudante_teste.dto;

import com.vocco.api.domain.estudante_teste.EstudanteTeste;
import com.vocco.api.domain.estudante_teste.EstudanteTesteService;

import java.time.LocalDate;

public record DadosListagemEstudanteTeste(
        Long id,
        String teste,
        LocalDate data
) {
    public DadosListagemEstudanteTeste(EstudanteTeste estudanteTeste){
        this(estudanteTeste.getId(), estudanteTeste.getTeste().getTitulo(), estudanteTeste.getData());
    }
}
