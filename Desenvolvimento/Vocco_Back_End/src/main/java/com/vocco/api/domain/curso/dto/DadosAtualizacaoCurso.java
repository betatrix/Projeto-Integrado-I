package com.vocco.api.domain.curso.dto;

import com.vocco.api.domain.curso.NivelEmpregabilidade;
import com.vocco.api.domain.instituicao.TipoInstituicaoCurso;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record DadosAtualizacaoCurso(
        @NotNull
        Long id,
        String descricao,
        Long areaId,
        TipoInstituicaoCurso tipo,
        NivelEmpregabilidade empregabilidade,
        List<String> possiveisCarreiras,
        Boolean ativo
) {
}
