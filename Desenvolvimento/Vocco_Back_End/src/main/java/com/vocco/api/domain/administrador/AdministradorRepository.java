package com.vocco.api.domain.administrador;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdministradorRepository extends JpaRepository<Administrador, Long> {

    List<Administrador> findAllByAtivoTrue();

    Administrador findAllByUsuarioId(Long id);

    Administrador getReferenceByUsuarioId(Long aLong);

    @Query("SELECT COUNT(adm) > 0 FROM Administrador adm WHERE adm.usuario.login = :email")
    boolean existsByEmail(String email);

    @Query("SELECT COUNT(adm) > 0 FROM Administrador adm WHERE adm.usuario.login = :email AND adm.ativo = true")
    boolean existsByEmailAndAtivoTrue(@NotBlank @Email String email);
}
