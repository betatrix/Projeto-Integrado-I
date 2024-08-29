package com.vocco.api.domain.estudante_perfil;

import com.vocco.api.domain.estudante.Estudante;
import com.vocco.api.domain.estudante.EstudanteRepository;
import com.vocco.api.domain.estudante_perfil.dto.DadosCadastroEstudantePerfil;
import com.vocco.api.domain.perfil.Perfil;
import com.vocco.api.domain.perfil.PerfilRepository;
import com.vocco.api.domain.perfil.dto.DadosListagemPerfil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EstudantePerfilService {
    @Autowired
    private EstudantePerfilRepository repository;
    @Autowired
    private EstudanteRepository estudanteRepository;
    @Autowired
    private PerfilRepository perfilRepository;

    public EstudantePerfil cadastrar(Long usuarioId, Perfil perfil, Integer compatbilidade){
        Estudante estudante = estudanteRepository.getReferenceByUsuarioId(usuarioId);
        EstudantePerfil estudantePerfil = new EstudantePerfil(compatbilidade, estudante, perfil);
        repository.save(estudantePerfil);
        return estudantePerfil;
    }

    public List<EstudantePerfil> listarPerfisPorEstudante(Long estudanteId){
        return repository.findAllByEstudanteId(estudanteId);
    }

    public List<DadosListagemPerfil> retornarDtoPerfisPorEstudante(Long estudanteId){
        return repository.findAllByEstudanteId(estudanteId).stream().map(DadosListagemPerfil::new).toList();
    }
}
