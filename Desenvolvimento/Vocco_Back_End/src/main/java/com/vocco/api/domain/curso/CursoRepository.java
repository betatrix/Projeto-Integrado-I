package com.vocco.api.domain.curso;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CursoRepository extends JpaRepository<Curso, Long> {
    List<Curso> findAllByAtivoTrue();


    List<Curso> findAllByAtivoTrueAndPerfilId(Long id);
}
