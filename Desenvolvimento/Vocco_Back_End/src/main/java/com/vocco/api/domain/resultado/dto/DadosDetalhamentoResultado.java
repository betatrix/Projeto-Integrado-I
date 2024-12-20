package com.vocco.api.domain.resultado.dto;


import com.vocco.api.domain.curso.dto.DadosRecomendacaoCursos;
import com.vocco.api.domain.perfil.dto.DadosListagemPerfil;
import com.vocco.api.domain.resultado.Resultado;
import com.vocco.api.domain.resultado_perfil.ResultadoPerfil;

import java.util.List;

public record DadosDetalhamentoResultado(
        Long id,
        String mensagem,
        String mensagemIngles,
        DadosRecomendacaoCursos cursos,
        List<DadosListagemPerfil> perfis
) {

    public DadosDetalhamentoResultado(Resultado resultado, DadosRecomendacaoCursos cursos, List<ResultadoPerfil> perfis) {
        this(resultado.getId(),
                resultado.getMensagem(),
                resultado.getMensagemIngles(),
                cursos,
                perfis.stream().map(DadosListagemPerfil::new).toList());
    }
}
