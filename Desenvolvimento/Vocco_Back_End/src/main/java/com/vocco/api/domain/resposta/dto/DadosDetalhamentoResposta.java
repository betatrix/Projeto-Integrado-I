package com.vocco.api.domain.resposta.dto;

import com.vocco.api.domain.estudante_teste.dto.DadosListagemEstudanteTeste;
import com.vocco.api.domain.pergunta.dto.DadosListagemPergunta;
import com.vocco.api.domain.resposta.Resposta;

public record DadosDetalhamentoResposta(
        DadosListagemEstudanteTeste estudanteTeste,
        DadosListagemPergunta pergunta,
        Integer resposta
) {
    public DadosDetalhamentoResposta(Resposta resposta){
        this(new DadosListagemEstudanteTeste(resposta.getEstudanteTeste()), new DadosListagemPergunta(resposta.getPergunta()), resposta.getResposta());
    }
}
