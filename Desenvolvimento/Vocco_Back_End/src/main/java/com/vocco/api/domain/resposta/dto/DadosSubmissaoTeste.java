package com.vocco.api.domain.resposta.dto;

import com.vocco.api.domain.estudante_teste.dto.DadosCadastroEstudanteTeste;
import com.vocco.api.domain.instituicao.TipoInstituicaoCurso;

import java.util.List;

public record DadosSubmissaoTeste(
        TipoInstituicaoCurso tipo,
        DadosCadastroEstudanteTeste estudanteTeste,
        List<DadosCadastroResposta> respostas
) {
}
