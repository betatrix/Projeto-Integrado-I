package com.vocco.api.domain.instituicao.dto;

import com.vocco.api.domain.instituicao.Instituicao;

import java.math.BigDecimal;

public record DadosListagemInstituicaoEMecCurso(
        Long id,
        String nome,
        String sigla,
        String site,
        BigDecimal notaMec
) {
    public DadosListagemInstituicaoEMecCurso(Instituicao instituicao, BigDecimal notaMec){
        this(instituicao.getId(), instituicao.getNome(), instituicao.getSigla(), instituicao.getSite(), notaMec);
    }
}
