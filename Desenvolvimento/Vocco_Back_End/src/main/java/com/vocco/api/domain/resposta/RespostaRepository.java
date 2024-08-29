package com.vocco.api.domain.resposta;

import com.vocco.api.domain.resposta.dto.DadosDetalhamentoResposta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RespostaRepository extends JpaRepository<Resposta, Long> {
    List<Resposta> findAllByEstudanteTesteId(Long id);
}
