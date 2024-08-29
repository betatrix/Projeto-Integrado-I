package com.vocco.api.domain.resposta;

import com.vocco.api.domain.estudante_teste.EstudanteTeste;
import com.vocco.api.domain.estudante_teste.EstudanteTesteService;
import com.vocco.api.domain.estudante_teste.dto.DadosCadastroEstudanteTeste;
import com.vocco.api.domain.pergunta.Pergunta;
import com.vocco.api.domain.pergunta.PerguntaRepository;
import com.vocco.api.domain.resposta.dto.DadosCadastroResposta;
import com.vocco.api.domain.resposta.dto.DadosDetalhamentoResposta;
import com.vocco.api.domain.resposta.dto.DadosSubmissaoTeste;
import com.vocco.api.domain.resultado.ResultadoService;
import com.vocco.api.domain.resultado.dto.DadosDetalhamentoResultado;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RespostaService {
    @Autowired
    private RespostaRepository repository;
    @Autowired
    private EstudanteTesteService estudanteTesteService;
    @Autowired
    private PerguntaRepository perguntaRepository;
    @Autowired
    private ResultadoService resultadoService;

    public DadosDetalhamentoResultado cadastrar(DadosSubmissaoTeste dados){
        EstudanteTeste estudanteTeste = estudanteTesteService.cadastrar(dados.estudanteTeste());
        List<DadosCadastroResposta> respostas = dados.respostas();
        respostas.forEach(resposta -> {
            Pergunta pergunta = perguntaRepository.getReferenceById(resposta.perguntaId());
            Resposta novaResposta = new Resposta(resposta, estudanteTeste, pergunta);
            repository.save(novaResposta);
        });

        return resultadoService.cadastrar(estudanteTeste, listarRespostasParaResultado(estudanteTeste.getId()));
    }

    public List<DadosDetalhamentoResposta> listarRespostasPorEstudanteTeste(Long id){
        return repository.findAllByEstudanteTesteId(id).stream().map(DadosDetalhamentoResposta::new).toList();
    }

    public List<Resposta> listarRespostasParaResultado(Long id){
        return repository.findAllByEstudanteTesteId(id);
    }
}
