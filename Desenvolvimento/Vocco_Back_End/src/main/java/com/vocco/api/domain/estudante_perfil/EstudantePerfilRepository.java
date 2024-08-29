package com.vocco.api.domain.estudante_perfil;

import com.vocco.api.domain.perfil.dto.DadosListagemPerfil;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EstudantePerfilRepository extends JpaRepository<EstudantePerfil, Long> {
    List<EstudantePerfil> findAllByEstudanteId(Long estudanteId);
}
