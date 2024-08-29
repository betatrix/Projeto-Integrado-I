package com.vocco.api.domain.instituicao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface InstituicaoRepository extends JpaRepository<Instituicao, Long> {
    List<Instituicao> findAllByAtivoTrue();
}
