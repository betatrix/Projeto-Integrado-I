package com.vocco.api.domain.curso_instituicao;

import com.vocco.api.domain.curso.Curso;
import com.vocco.api.domain.curso.CursoRepository;
import com.vocco.api.domain.curso.dto.DadosDetalhamentoCurso;
import com.vocco.api.domain.curso_instituicao.dto.DadosAtualizacaoInstituicaoCurso;
import com.vocco.api.domain.curso_instituicao.dto.DadosCadastroCursoInstituicao;
import com.vocco.api.domain.curso_instituicao.dto.DadosDetalhamentoCursoInstituicao;
import com.vocco.api.domain.instituicao.Instituicao;
import com.vocco.api.domain.instituicao.InstituicaoRepository;
import com.vocco.api.domain.instituicao.dto.DadosDetalhamentoInstituicao;
import com.vocco.api.domain.instituicao.dto.DadosListagemInstituicaoEMecCurso;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CursoInstituicaoService {
    @Autowired
    private CursoInstituicaoRepository repository;
    @Autowired
    private CursoRepository cursoRepository;
    @Autowired
    private InstituicaoRepository instituicaoRepository;


    public DadosDetalhamentoCursoInstituicao cadastrar(DadosCadastroCursoInstituicao dados){
        Curso curso = cursoRepository.getReferenceById(dados.cursoId());
        Instituicao instituicao = instituicaoRepository.getReferenceById(dados.instituicaoId());
        CursoInstituicao cursoInstituicao = new CursoInstituicao(curso, instituicao, dados);
        repository.save(cursoInstituicao);
        return new DadosDetalhamentoCursoInstituicao(cursoInstituicao);
    }

    public DadosDetalhamentoCursoInstituicao editar(DadosAtualizacaoInstituicaoCurso dados){
        CursoInstituicao cursoInstituicao = repository.getReferenceById(dados.id());
        cursoInstituicao.editarInformacoes(dados);
        repository.save(cursoInstituicao);
        return new DadosDetalhamentoCursoInstituicao(cursoInstituicao);
    }

    public List<DadosDetalhamentoCursoInstituicao> listar(){
        return repository.findAll().stream().map(DadosDetalhamentoCursoInstituicao::new).toList();
    }

    public List<DadosListagemInstituicaoEMecCurso> buscarInstituicoesPorCursoComNotaMec(Long cursoId){
        return repository.findAllByCursoId(cursoId)
                .stream()
                .filter(ci -> ci.getInstituicao().isAtivo())
                .map(ci -> new DadosListagemInstituicaoEMecCurso(ci.getInstituicao(), ci.getNotaMec()))
                .collect(Collectors.toList());
    }

    public List<DadosDetalhamentoCurso> buscarCursosPorInstituicao(Long instituicaoId){
        return repository.findAllByInstituicaoId(instituicaoId)
                .stream()
                .filter(ci -> ci.getCurso().isAtivo())
                .map(ci -> new DadosDetalhamentoCurso(ci.getCurso()))
                .collect(Collectors.toList());
    }

    public List<DadosDetalhamentoInstituicao> buscarInstituicoesPorCurso(Long cursoId){
        return repository.findAllByCursoId(cursoId)
                .stream()
                .filter(ci -> ci.getInstituicao().isAtivo())
                .map(ci -> new DadosDetalhamentoInstituicao(ci.getInstituicao()))
                .collect(Collectors.toList());
    }


    public void excluir(Long id){
        repository.deleteById(id);
    }


}
