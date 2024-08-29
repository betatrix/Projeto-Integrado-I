package com.vocco.api.controller;

import com.vocco.api.domain.area.AreaService;
import com.vocco.api.domain.area.dto.DadosAtualizacaoArea;
import com.vocco.api.domain.area.dto.DadosCadastroArea;
import com.vocco.api.domain.area.dto.DadosDetalhamentoArea;
import com.vocco.api.domain.area.dto.DadosListagemArea;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("area")
public class AreaController {

    @Autowired
    private AreaService service;

    @PostMapping
    @Transactional
    public ResponseEntity<DadosDetalhamentoArea> cadastrar(@RequestBody @Valid DadosCadastroArea dados){
        DadosDetalhamentoArea area = service.cadastrar(dados);
        return ResponseEntity.ok().body(area);
    }

    @PutMapping
    @Transactional
    public ResponseEntity<DadosDetalhamentoArea> editar(@RequestBody @Valid DadosAtualizacaoArea dados){
        DadosDetalhamentoArea area = service.editar(dados);
        return ResponseEntity.ok().body(area);
    }

    @GetMapping("{id}")
    public ResponseEntity<DadosDetalhamentoArea> detalhar(@PathVariable Long id){
        return ResponseEntity.ok().body(service.detalhar(id));
    }
    @GetMapping
    public ResponseEntity<List<DadosListagemArea>> listar(){
        return ResponseEntity.ok().body(service.listar());
    }

    @GetMapping("ativos")
    public ResponseEntity<List<DadosListagemArea>> listarAtivos(){
        return ResponseEntity.ok().body(service.listarAtivos());
    }


    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        service.excluir(id);
        return ResponseEntity.noContent().build();
    }
}
