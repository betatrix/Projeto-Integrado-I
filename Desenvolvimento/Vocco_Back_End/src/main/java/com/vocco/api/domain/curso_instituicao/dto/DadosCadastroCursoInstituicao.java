package com.vocco.api.domain.curso_instituicao.dto;

import java.math.BigDecimal;

public record DadosCadastroCursoInstituicao(
        Long cursoId,
        Long instituicaoId,
        BigDecimal notaMec
) {
}
