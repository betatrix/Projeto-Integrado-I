package com.vocco.api.domain.politica_instituicao.dto;

import com.vocco.api.domain.instituicao.dto.DadosListagemInstituicao;
import com.vocco.api.domain.politica.dto.DadosDetalhamentoPolitica;
import com.vocco.api.domain.politica_instituicao.PoliticaInstituicao;

public record DadosDetalhamentoPoliticaInstituicao(
        Long id,
        DadosListagemInstituicao instituicao,
        DadosDetalhamentoPolitica politica
) {
    public DadosDetalhamentoPoliticaInstituicao(PoliticaInstituicao pi){
        this(pi.getId(),
             new DadosListagemInstituicao(pi.getInstituicao()),
             new DadosDetalhamentoPolitica(pi.getPolitica()));
    }
}
