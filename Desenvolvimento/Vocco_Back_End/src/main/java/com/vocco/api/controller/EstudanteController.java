package com.vocco.api.controller;

import com.vocco.api.domain.estudante.EstudanteService;
import com.vocco.api.domain.estudante.dto.DadosAtualizacaoEstudante;
import com.vocco.api.domain.estudante.dto.DadosCadastroEstudante;
import com.vocco.api.domain.estudante.dto.DadosDetalhamentoEstudante;
import com.vocco.api.domain.estudante.dto.DadosListagemEstudante;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("estudante")
public class EstudanteController {
    @Autowired
    private EstudanteService service;

    @PostMapping("/adicionarFoto")
    public DadosDetalhamentoEstudante adicionarFoto(@RequestParam Long id, @Valid MultipartFile arquivo){
        return service.adicionarFoto(id, arquivo);
    }

    @PostMapping("/cadastro")
    @Transactional
    public ResponseEntity<DadosDetalhamentoEstudante> cadastrar(@RequestBody @Valid DadosCadastroEstudante dados){
        DadosDetalhamentoEstudante estudante = service.cadastrar(dados);
        return ResponseEntity.ok().body(estudante);
    }

    @PutMapping
    @Transactional
    public ResponseEntity<DadosDetalhamentoEstudante> editar(@RequestBody @Valid DadosAtualizacaoEstudante dados){
        DadosDetalhamentoEstudante estudante = service.editar(dados);
        return ResponseEntity.ok().body(estudante);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DadosDetalhamentoEstudante> detalhar(@PathVariable Long id){
        return ResponseEntity.ok().body(service.detalhar(id));
    }

    @GetMapping
    public ResponseEntity<List<DadosListagemEstudante>> listar(){
        return ResponseEntity.ok().body(service.listar());
    }

    @GetMapping("ativos")
    public ResponseEntity<List<DadosListagemEstudante>> listarAtivos(){
        return ResponseEntity.ok().body(service.listarAtivos());
    }

    @GetMapping("ativos/contagem")
    public ResponseEntity<Integer> contarAtivos(){
        return ResponseEntity.ok().body(service.contarAtivos());
    }


    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        service.excluir(id);
        return ResponseEntity.noContent().build();
    }
}
