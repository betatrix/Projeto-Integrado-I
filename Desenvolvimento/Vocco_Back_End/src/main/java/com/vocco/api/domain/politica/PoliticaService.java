package com.vocco.api.domain.politica;

import com.vocco.api.domain.politica.dto.DadosAtualizacaoPolitica;
import com.vocco.api.domain.politica.dto.DadosCadastroPolitica;
import com.vocco.api.domain.politica.dto.DadosDetalhamentoPolitica;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PoliticaService {
    @Autowired
    private PoliticaRepository repository;

    public DadosDetalhamentoPolitica cadastrar(DadosCadastroPolitica dados){
        Politica politica = new Politica(dados);
        repository.save(politica);
        return new DadosDetalhamentoPolitica(politica);
    }

    public DadosDetalhamentoPolitica editar(DadosAtualizacaoPolitica dados){
        Politica politica = repository.getReferenceById(dados.id());
        politica.editarInformacoes(dados);
        repository.save(politica);
        return new DadosDetalhamentoPolitica(politica);
    }

    public DadosDetalhamentoPolitica detalhar(Long id){
        return new DadosDetalhamentoPolitica(repository.getReferenceById(id));
    }

    public List<DadosDetalhamentoPolitica> listar(){
        return repository.findAll().stream().map(DadosDetalhamentoPolitica::new).toList();
    }

    public List<DadosDetalhamentoPolitica> listarAtivos(){
        return repository.findAllByAtivoTrue().stream().map(DadosDetalhamentoPolitica::new).toList();
    }

    public void excluir(Long id){
        Politica politica = repository.getReferenceById(id);
        politica.excluir();
        repository.save(politica);
    }
}
