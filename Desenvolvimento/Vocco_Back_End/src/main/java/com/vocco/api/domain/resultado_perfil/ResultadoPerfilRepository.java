package com.vocco.api.domain.resultado_perfil;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResultadoPerfilRepository extends JpaRepository<ResultadoPerfil, Long> {
    List<ResultadoPerfil> findAllByResultadoId(Long resultadoId);

}
