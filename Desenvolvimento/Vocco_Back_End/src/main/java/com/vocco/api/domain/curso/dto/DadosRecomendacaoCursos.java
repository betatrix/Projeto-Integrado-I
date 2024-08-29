package com.vocco.api.domain.curso.dto;

import com.vocco.api.domain.curso.Curso;
import com.vocco.api.domain.resultado.dto.DadosDetalhamentoResultado;

import java.util.List;
import java.util.stream.Collectors;

public record DadosRecomendacaoCursos(
        List<DadosDetalhamentoCurso> cursosPerfilPrimario,
        List<DadosDetalhamentoCurso> cursosPerfilSecundario
) {
}
