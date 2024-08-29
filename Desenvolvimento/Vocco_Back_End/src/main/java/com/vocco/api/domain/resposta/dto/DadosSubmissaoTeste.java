package com.vocco.api.domain.resposta.dto;

import com.vocco.api.domain.estudante_teste.dto.DadosCadastroEstudanteTeste;

import java.util.List;

public record DadosSubmissaoTeste(
        DadosCadastroEstudanteTeste estudanteTeste,
        List<DadosCadastroResposta> respostas
) {
}
