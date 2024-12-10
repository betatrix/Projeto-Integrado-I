package com.vocco.api.domain.politica_instituicao;

import com.vocco.api.domain.instituicao.Instituicao;
import com.vocco.api.domain.instituicao.InstituicaoRepository;
import com.vocco.api.domain.politica.Politica;
import com.vocco.api.domain.politica.PoliticaRepository;
import com.vocco.api.domain.politica_instituicao.dto.DadosCadastroPoliticaInstituicao;
import com.vocco.api.domain.politica_instituicao.dto.DadosDetalhamentoPoliticaInstituicao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PoliticaInstituicaoService {
    @Autowired
    private PoliticaInstituicaoRepository repository;
    @Autowired
    private PoliticaRepository politicaRepository;
    @Autowired
    private InstituicaoRepository instituicaoRepository;

    public DadosDetalhamentoPoliticaInstituicao cadastrar(DadosCadastroPoliticaInstituicao dados){
        Politica politica = politicaRepository.getReferenceById(dados.politicaId());
        Instituicao instituicao = instituicaoRepository.getReferenceById(dados.instituicaoId());
        PoliticaInstituicao politicaInstituicao = new PoliticaInstituicao(politica, instituicao);
        repository.save(politicaInstituicao);
        return new DadosDetalhamentoPoliticaInstituicao(politicaInstituicao);
    }

    public List<DadosDetalhamentoPoliticaInstituicao> listar(){
        return repository.findAll().stream().map(DadosDetalhamentoPoliticaInstituicao::new).toList();
    }

    public List<DadosDetalhamentoPoliticaInstituicao> buscarPoliticasPorInstituicao(Long instituicaoId){
        return repository.findAllByInstituicaoId(instituicaoId).stream().map(DadosDetalhamentoPoliticaInstituicao::new).toList();
    }

    public List<DadosDetalhamentoPoliticaInstituicao> buscarInstituicoesPorPolitica(Long politicaId){
        return repository.findAllByPoliticaId(politicaId).stream().map(DadosDetalhamentoPoliticaInstituicao::new).toList();
    }


    public void excluir(Long id){
        repository.deleteById(id);
    }
}
