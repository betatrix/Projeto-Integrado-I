package com.vocco.api.controller;

import com.vocco.api.domain.administrador.AdministradorService;
import com.vocco.api.domain.administrador.dto.DadosAtualizacaoAdministrador;
import com.vocco.api.domain.administrador.dto.DadosCadastroAdministrador;
import com.vocco.api.domain.administrador.dto.DadosDetalhamentoAdministrador;
import com.vocco.api.domain.administrador.dto.DadosListagemAdministrador;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("administrador")
public class AdministradorController {
    @Autowired
    private AdministradorService service;

    @PostMapping("/cadastro")
    @Transactional
    public ResponseEntity<DadosDetalhamentoAdministrador> cadastrar(@RequestBody @Valid DadosCadastroAdministrador dados){
        DadosDetalhamentoAdministrador administrador = service.cadastrar(dados);
        return ResponseEntity.ok().body(administrador);
    }

    @PutMapping
    @Transactional
    public ResponseEntity<DadosDetalhamentoAdministrador> editar(@RequestBody @Valid DadosAtualizacaoAdministrador dados){
        DadosDetalhamentoAdministrador administrador = service.editar(dados);
        return ResponseEntity.ok().body(administrador);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DadosDetalhamentoAdministrador> detalhar(@PathVariable Long id){
        return ResponseEntity.ok().body(service.detalhar(id));
    }

    @GetMapping
    public ResponseEntity<List<DadosListagemAdministrador>> listar(){
        return ResponseEntity.ok().body(service.listar());
    }

    @GetMapping("ativos")
    public ResponseEntity<List<DadosListagemAdministrador>> listarAtivos(){
        return ResponseEntity.ok().body(service.listarAtivos());
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        service.excluir(id);
        return ResponseEntity.noContent().build();
    }
}
