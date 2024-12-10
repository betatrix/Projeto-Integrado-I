package com.vocco.api.domain.instituicao.dto;

import com.vocco.api.domain.endereco.dto.DadosDetalhamentoEndereco;
import com.vocco.api.domain.instituicao.Instituicao;
import com.vocco.api.domain.instituicao.TipoInstituicaoCurso;

import java.math.BigDecimal;

public record DadosDetalhamentoInstituicao(
        Long id,
        String nome,
        String sigla,
        String site,
        BigDecimal notaMec,
        Boolean ativo,
        String formaIngresso,
        TipoInstituicaoCurso tipo,
        DadosDetalhamentoEndereco endereco
) {
    public DadosDetalhamentoInstituicao(Instituicao instituicao){
        this(instituicao.getId(), instituicao.getNome(), instituicao.getSigla(),
                instituicao.getSite(), instituicao.getNotaMec(), instituicao.getAtivo(), instituicao.getFormaIngresso(),
                instituicao.getTipo(),
                new DadosDetalhamentoEndereco(instituicao.getEndereco()));
    }
}
