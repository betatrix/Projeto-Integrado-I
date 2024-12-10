package com.vocco.api.domain.resultado_perfil.dto;

import com.vocco.api.domain.resultado_perfil.ResultadoPerfil;

public record DadosCompatibilidadeEstudantePerfil(String perfil, Integer compatibilidade) {
    public DadosCompatibilidadeEstudantePerfil(ResultadoPerfil resultadoPerfil){
        this(resultadoPerfil.getPerfil().getDescricao(), resultadoPerfil.getCompatibilidade());
    }
}
