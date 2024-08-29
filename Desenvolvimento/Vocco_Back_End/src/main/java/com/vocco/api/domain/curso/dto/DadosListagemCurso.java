package com.vocco.api.domain.curso.dto;

import com.vocco.api.domain.curso.Curso;
import com.vocco.api.domain.curso.NivelEmpregabilidade;
import com.vocco.api.domain.perfil.dto.DadosListagemPerfil;

import java.util.List;

public record DadosListagemCurso(
        Long id,
        String descricao,
        Boolean ativo,
        String area,
        NivelEmpregabilidade empregabilidade,
        List<String> possiveisCarreiras,
        DadosListagemPerfil perfil
) {
    public DadosListagemCurso(Curso curso){
        this(curso.getId(), curso.getDescricao(), curso.getAtivo(), curso.getArea().getDescricao(), curso.getEmpregabilidade(), curso.getPossiveisCarreiras(), new DadosListagemPerfil(curso.getPerfil()));
    }
}
