package com.vocco.api.domain.estudante;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EstudanteRepository extends JpaRepository<Estudante, Long> {
    List<Estudante> findAllByAtivoTrue();

    Estudante findAllByUsuarioId(Long id);

    Estudante getReferenceByUsuarioId(Long aLong);

    boolean existsByEmail(String email);
}
