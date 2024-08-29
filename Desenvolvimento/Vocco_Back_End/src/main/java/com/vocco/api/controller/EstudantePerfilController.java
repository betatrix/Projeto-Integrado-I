package com.vocco.api.controller;

import com.vocco.api.domain.estudante_perfil.EstudantePerfilRepository;
import com.vocco.api.domain.estudante_perfil.EstudantePerfilService;
import com.vocco.api.domain.perfil.dto.DadosListagemPerfil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("estudantePerfil")
public class EstudantePerfilController {
    @Autowired
    private EstudantePerfilService service;

    @GetMapping("/estudante/{id}")
    public ResponseEntity<List<DadosListagemPerfil>> buscarPerfisPorEstudante(@PathVariable Long id) {
        return ResponseEntity.ok().body(service.retornarDtoPerfisPorEstudante((id)));
    }
}
