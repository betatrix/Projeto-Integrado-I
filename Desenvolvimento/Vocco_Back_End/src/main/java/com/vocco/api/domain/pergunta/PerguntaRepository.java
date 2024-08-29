package com.vocco.api.domain.pergunta;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface PerguntaRepository extends JpaRepository<Pergunta, Long> {

    List<Pergunta> findAllByAtivoTrue();

    List<Pergunta> findAllByAtivoTrueAndTesteId(Long testeId);
}
