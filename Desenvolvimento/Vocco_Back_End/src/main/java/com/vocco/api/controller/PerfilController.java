package com.vocco.api.controller;

import com.vocco.api.domain.perfil.PerfilService;
import com.vocco.api.domain.perfil.dto.DadosListagemPerfil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("perfil")
public class PerfilController {
    @Autowired
    private PerfilService service;

    @GetMapping
    public ResponseEntity<List<DadosListagemPerfil>> listar(){
        return ResponseEntity.ok().body(service.listar());
    }

}
