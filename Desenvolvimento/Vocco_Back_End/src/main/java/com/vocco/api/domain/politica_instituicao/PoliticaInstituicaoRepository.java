package com.vocco.api.domain.politica_instituicao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface PoliticaInstituicaoRepository extends JpaRepository<PoliticaInstituicao, Long> {
    List<PoliticaInstituicao> findAllByInstituicaoId(Long instituicaoId);

    List<PoliticaInstituicao> findAllByPoliticaId(Long politicaId);
}
