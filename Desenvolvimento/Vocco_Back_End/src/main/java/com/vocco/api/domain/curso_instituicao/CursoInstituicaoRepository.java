package com.vocco.api.domain.curso_instituicao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CursoInstituicaoRepository extends JpaRepository<CursoInstituicao, Long> {
    List<CursoInstituicao> findAllByInstituicaoId(Long instituicaoId);

    List<CursoInstituicao> findAllByCursoId(Long cursoId);
}
