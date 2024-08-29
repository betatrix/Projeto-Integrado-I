package com.vocco.api.domain.estudante_teste;

import com.vocco.api.domain.estudante.Estudante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EstudanteTesteRepository extends JpaRepository<EstudanteTeste, Long> {
    List<EstudanteTeste> findByEstudanteId(Long estudanteId);
}
