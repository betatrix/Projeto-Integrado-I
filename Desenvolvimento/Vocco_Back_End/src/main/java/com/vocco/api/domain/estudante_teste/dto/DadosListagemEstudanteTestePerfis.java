package com.vocco.api.domain.estudante_teste.dto;

import com.vocco.api.domain.estudante_teste.EstudanteTeste;
import com.vocco.api.domain.perfil.Perfil;

import java.time.LocalDate;
import java.util.List;

public record DadosListagemEstudanteTestePerfis(
        Long id,
        String teste,
        LocalDate data,
        List<String> perfis
) {
    public DadosListagemEstudanteTestePerfis(EstudanteTeste estudanteTeste, List<Perfil> perfis){
        this(estudanteTeste.getId(), estudanteTeste.getTeste().getTitulo(), estudanteTeste.getData(), perfis.stream().map(Perfil::getDescricao).toList());
    }
}
