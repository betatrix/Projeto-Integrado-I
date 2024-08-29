package com.vocco.api.domain.resultado_curso;

import com.vocco.api.domain.curso.Curso;
import com.vocco.api.domain.curso.dto.DadosDetalhamentoCurso;
import com.vocco.api.domain.resultado.Resultado;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResultadoCursoService {
    @Autowired
    private ResultadoCursoRepository repository;

    public void cadastrar(Resultado resultado, List<Curso> cursosPerfilPrimario, List<Curso> cursosPerfilSecundario) {
        cursosPerfilPrimario.forEach(cursoPerfilPrimario -> {
            ResultadoCurso resultadoCurso =  new ResultadoCurso(resultado, cursoPerfilPrimario, true);
            repository.save(resultadoCurso);
        });
        cursosPerfilSecundario.forEach(cursoPerfilSecundario -> {
            ResultadoCurso resultadoCurso =  new ResultadoCurso(resultado, cursoPerfilSecundario, false);
            repository.save(resultadoCurso);
        });
    }

    public List<Curso> retornarCursosPerfilPrimario(Long resultadoId){
        List<ResultadoCurso> resultadoCursos = repository.findAllByPerfilPrimarioTrueAndResultadoId(resultadoId);
        return resultadoCursos.stream().map(ResultadoCurso::getCurso).toList();
    }

    public List<Curso> retornarCursosPerfilSecundario(Long resultadoId){
        List<ResultadoCurso> resultadoCursos = repository.findAllByPerfilPrimarioFalseAndResultadoId(resultadoId);
        return resultadoCursos.stream().map(ResultadoCurso::getCurso).toList();
    }

    public List<DadosDetalhamentoCurso> detalharCursosRecomendados(Long resultadoId){
        return repository.findByResultadoId(resultadoId).stream().map(DadosDetalhamentoCurso::new).toList();
    }

}
