package com.vocco.api.controller;

import com.vocco.api.domain.area.dto.DadosListagemArea;
import com.vocco.api.domain.politica.PoliticaService;
import com.vocco.api.domain.politica.dto.DadosAtualizacaoPolitica;
import com.vocco.api.domain.politica.dto.DadosCadastroPolitica;
import com.vocco.api.domain.politica.dto.DadosDetalhamentoPolitica;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("politica")
public class PoliticaController {
    @Autowired
    private PoliticaService service;

    @PostMapping
    @Transactional
    public ResponseEntity<DadosDetalhamentoPolitica> cadastrar(@RequestBody @Valid DadosCadastroPolitica dados){
        DadosDetalhamentoPolitica Politica = service.cadastrar(dados);
        return ResponseEntity.ok().body(Politica);
    }

    @PutMapping
    @Transactional
    public ResponseEntity<DadosDetalhamentoPolitica> editar(@RequestBody @Valid DadosAtualizacaoPolitica dados){
        DadosDetalhamentoPolitica Politica = service.editar(dados);
        return ResponseEntity.ok().body(Politica);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DadosDetalhamentoPolitica> detalhar(@PathVariable Long id){
        return ResponseEntity.ok().body(service.detalhar(id));
    }

    @GetMapping
    public ResponseEntity<List<DadosDetalhamentoPolitica>> listar(){
        return ResponseEntity.ok().body(service.listar());
    }

    @GetMapping("ativos")
    public ResponseEntity<List<DadosDetalhamentoPolitica>> listarAtivos(){
        return ResponseEntity.ok().body(service.listarAtivos());
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        service.excluir(id);
        return ResponseEntity.noContent().build();
    }
}
