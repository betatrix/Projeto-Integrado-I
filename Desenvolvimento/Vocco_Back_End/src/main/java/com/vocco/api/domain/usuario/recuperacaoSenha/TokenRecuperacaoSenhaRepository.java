package com.vocco.api.domain.usuario.recuperacaoSenha;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TokenRecuperacaoSenhaRepository extends JpaRepository<TokenRecuperacaoSenha, Long> {
    Optional<TokenRecuperacaoSenha> findByToken(String token);
}
