package com.vocco.api.domain.estudante;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EstudanteRepository extends JpaRepository<Estudante, Long> {
    List<Estudante> findAllByAtivoTrue();

    Estudante findAllByUsuarioId(Long id);

    Estudante getReferenceByUsuarioId(Long aLong);

    @Query("SELECT COUNT(est) > 0 FROM Estudante est WHERE est.usuario.login = :email")
    boolean existsByEmail(String email);

    @Query("SELECT COUNT(est) > 0 FROM Estudante est WHERE est.usuario.login = :email AND est.ativo = true")
    boolean existsByEmailAndAtivoTrue(@NotBlank @Email String email);
}
