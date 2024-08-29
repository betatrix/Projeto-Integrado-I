package com.vocco.api.domain.resultado;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResultadoRepository extends JpaRepository<Resultado, Long> {
    Resultado findByEstudanteTesteId(Long estudanteTesteId);
}
