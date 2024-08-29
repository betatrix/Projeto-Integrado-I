package com.vocco.api.domain.curso_instituicao.dto;

import com.vocco.api.domain.curso.dto.DadosListagemCurso;
import com.vocco.api.domain.curso_instituicao.CursoInstituicao;
import com.vocco.api.domain.instituicao.dto.DadosListagemInstituicao;

import java.math.BigDecimal;

public record DadosDetalhamentoCursoInstituicao(
        Long id,
        BigDecimal notaMec,
        DadosListagemCurso curso,
        DadosListagemInstituicao instituicao
) {
    public DadosDetalhamentoCursoInstituicao(CursoInstituicao ci){
        this(
                ci.getId(),
                ci.getNotaMec(),
                new DadosListagemCurso(ci.getCurso()),
                new DadosListagemInstituicao(ci.getInstituicao())
        );
    }
}
