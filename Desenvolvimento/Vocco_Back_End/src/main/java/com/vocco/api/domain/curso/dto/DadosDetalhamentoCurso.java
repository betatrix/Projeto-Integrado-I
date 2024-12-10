package com.vocco.api.domain.curso.dto;

import com.vocco.api.domain.curso.Curso;
import com.vocco.api.domain.curso.NivelEmpregabilidade;
import com.vocco.api.domain.instituicao.TipoInstituicaoCurso;
import com.vocco.api.domain.resultado_curso.ResultadoCurso;

import java.util.List;

public record DadosDetalhamentoCurso(
        Long id,
        String descricao,
        Boolean ativo,
        String area,
        String perfil,
        TipoInstituicaoCurso tipo,
        NivelEmpregabilidade empregabilidade,
        List<String> possiveisCarreiras
) {
    public DadosDetalhamentoCurso(Curso curso){
        this(curso.getId(), curso.getDescricao(), curso.getAtivo(), curso.getArea().getDescricao(), curso.getPerfil().getDescricao(), curso.getTipo(), curso.getEmpregabilidade(), curso.getPossiveisCarreiras());
    }

    public DadosDetalhamentoCurso(ResultadoCurso resultadoCurso) {
        this(resultadoCurso.getCurso().getId(), resultadoCurso.getCurso().getDescricao(), resultadoCurso.getCurso().getAtivo(),
                resultadoCurso.getCurso().getArea().getDescricao(), resultadoCurso.getCurso().getPerfil().getDescricao(), resultadoCurso.getCurso().getTipo(), resultadoCurso.getCurso().getEmpregabilidade(), resultadoCurso.getCurso().getPossiveisCarreiras());
    }
}
