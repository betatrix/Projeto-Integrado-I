package com.vocco.api.domain.usuario;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    UserDetails findByLogin(String login);

    @Query("SELECT us FROM Usuario us WHERE us.login = :login")
    Usuario findByLoginUsuario(@Param("login") String login);

    Usuario findByLoginAndSenha(String login, String senhaCriptografada);
    @Query("SELECT us FROM Usuario us WHERE us.login = :email")
    Optional<Usuario> findByEmail(String email);
}
