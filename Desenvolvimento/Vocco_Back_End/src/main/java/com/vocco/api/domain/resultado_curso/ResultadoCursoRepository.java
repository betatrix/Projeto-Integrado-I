package com.vocco.api.domain.resultado_curso;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResultadoCursoRepository extends JpaRepository<ResultadoCurso, Long> {
    List<ResultadoCurso> findByResultadoId(Long resultadoId);

    List<ResultadoCurso> findAllByPerfilPrimarioTrueAndResultadoId(Long resultadoId);

    List<ResultadoCurso> findAllByPerfilPrimarioFalseAndResultadoId(Long resultadoId);
}
