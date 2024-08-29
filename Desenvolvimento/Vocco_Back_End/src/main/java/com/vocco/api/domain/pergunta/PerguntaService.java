package com.vocco.api.domain.pergunta;

import com.vocco.api.domain.perfil.Perfil;
import com.vocco.api.domain.perfil.PerfilRepository;
import com.vocco.api.domain.pergunta.dto.DadosAtualizacaoPergunta;
import com.vocco.api.domain.pergunta.dto.DadosCadastroPergunta;
import com.vocco.api.domain.pergunta.dto.DadosDetalhamentoPergunta;
import com.vocco.api.domain.pergunta.dto.DadosListagemPergunta;
import com.vocco.api.domain.teste.Teste;
import com.vocco.api.domain.teste.TesteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PerguntaService {

    @Autowired
    private PerguntaRepository repository;
    @Autowired
    private TesteRepository testeRepository;
    @Autowired
    private PerfilRepository perfilRepository;


    public List<DadosListagemPergunta> cadastrar(DadosCadastroPergunta dados){
        Teste teste = testeRepository.getReferenceById(dados.testeId());
        Perfil perfil = perfilRepository.getReferenceById(dados.perfilId());
        Pergunta pergunta = new Pergunta(dados, teste, perfil);
        repository.save(pergunta);
        return listarPorTeste(teste.getId());
    }

    public DadosDetalhamentoPergunta editar(DadosAtualizacaoPergunta dados){
        Pergunta pergunta = repository.getReferenceById(dados.id());
        pergunta.editarInformacoes(dados);
        repository.save(pergunta);
        return new DadosDetalhamentoPergunta(pergunta);
    }
    public DadosDetalhamentoPergunta detalhar(Long id){
        return new DadosDetalhamentoPergunta(repository.getReferenceById(id));
    }

    public List<DadosListagemPergunta> listarPorTeste(Long testeId){
        return repository.findAllByAtivoTrueAndTesteId(testeId).stream().map(DadosListagemPergunta::new).toList();
    }
    public void excluir(Long id){
        Pergunta pergunta = repository.getReferenceById(id);
        pergunta.excluir();
        repository.save(pergunta);
    }
}
