package com.vocco.api.domain.curso.dto;

import com.vocco.api.domain.curso.NivelEmpregabilidade;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record DadosCadastroCurso(
        @NotBlank
        String descricao,
        @NotNull
        Long areaId,
        @NotNull
        Long perfilId,
        NivelEmpregabilidade empregabilidade,
        List<String> possiveisCarreiras
) {
}
