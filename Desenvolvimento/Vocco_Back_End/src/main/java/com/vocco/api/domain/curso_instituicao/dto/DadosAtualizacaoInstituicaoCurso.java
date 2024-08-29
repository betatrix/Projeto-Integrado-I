package com.vocco.api.domain.curso_instituicao.dto;

import java.math.BigDecimal;

public record DadosAtualizacaoInstituicaoCurso(
        Long id,
        BigDecimal notaMec
) {
}
