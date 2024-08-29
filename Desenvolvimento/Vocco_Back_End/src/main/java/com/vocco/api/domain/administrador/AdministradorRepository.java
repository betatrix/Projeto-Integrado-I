package com.vocco.api.domain.administrador;

import com.vocco.api.domain.estudante.Estudante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AdministradorRepository extends JpaRepository<Administrador, Long> {

    List<Administrador> findAllByAtivoTrue();

    Administrador findAllByUsuarioId(Long id);

    Administrador getReferenceByUsuarioId(Long aLong);

    boolean existsByEmail(String email);
}
