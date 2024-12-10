package com.vocco.api.domain.estudante_teste.dto;

import com.vocco.api.domain.resultado_perfil.dto.DadosCompatibilidadeEstudantePerfil;
import com.vocco.api.domain.estudante_teste.EstudanteTeste;
import com.vocco.api.domain.resultado_perfil.ResultadoPerfil;

import java.time.LocalDate;
import java.util.List;

public record DadosListagemEstudanteTestePerfis(
        Long id,
        String teste,
        LocalDate data,
        List<DadosCompatibilidadeEstudantePerfil> perfis
) {
    public DadosListagemEstudanteTestePerfis(EstudanteTeste estudanteTeste, List<ResultadoPerfil> perfis){
        this(estudanteTeste.getId(), estudanteTeste.getTeste().getTitulo(), estudanteTeste.getData(),
                perfis.stream().map(DadosCompatibilidadeEstudantePerfil::new).toList()
        );
    }
}
