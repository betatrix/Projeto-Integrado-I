package com.vocco.api.domain.curso.dto;

import com.vocco.api.domain.curso.NivelEmpregabilidade;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record DadosAtualizacaoCurso(
        @NotNull
        Long id,
        String descricao,
        Long areaId,
        NivelEmpregabilidade empregabilidade,
        List<String> possiveisCarreiras
) {
}
