package com.vocco.api.domain.perfil;

import com.vocco.api.domain.perfil.dto.DadosListagemPerfil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PerfilService {
    @Autowired
    private PerfilRepository repository;

    public List<DadosListagemPerfil> listar(){
        return repository.findAll().stream().map(DadosListagemPerfil::new).toList();
    }
}
