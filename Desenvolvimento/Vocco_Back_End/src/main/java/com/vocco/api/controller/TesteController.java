package com.vocco.api.controller;

import com.vocco.api.domain.teste.TesteService;
import com.vocco.api.domain.teste.dto.DadosAtualizacaoTeste;
import com.vocco.api.domain.teste.dto.DadosCadastroTeste;
import com.vocco.api.domain.teste.dto.DadosDetalhamentoTeste;
import com.vocco.api.domain.teste.dto.DadosListagemTeste;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("teste")
public class TesteController {

    @Autowired
    private TesteService service;

    @PostMapping
    @Transactional
    public ResponseEntity<DadosDetalhamentoTeste> cadastrar(@RequestBody @Valid DadosCadastroTeste dados){
        DadosDetalhamentoTeste area = service.cadastrar(dados);
        return ResponseEntity.ok().body(area);
    }
    @PutMapping
    @Transactional
    public ResponseEntity<DadosDetalhamentoTeste> editar(@RequestBody @Valid DadosAtualizacaoTeste dados){
        DadosDetalhamentoTeste teste = service.editar(dados);
        return ResponseEntity.ok().body(teste);
    }

    @GetMapping("{id}")
    public ResponseEntity<DadosDetalhamentoTeste> detalhar(@PathVariable Long id){
        return ResponseEntity.ok().body(service.detalhar(id));
    }

    @GetMapping
    public ResponseEntity<List<DadosListagemTeste>> listar(){
        return ResponseEntity.ok().body(service.listar());
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        service.excluir(id);
        return ResponseEntity.noContent().build();
    }
}
