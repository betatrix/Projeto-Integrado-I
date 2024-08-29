package com.vocco.api.controller;

import com.vocco.api.domain.instituicao.InstituicaoService;
import com.vocco.api.domain.instituicao.dto.DadosAtualizacaoInstituicao;
import com.vocco.api.domain.instituicao.dto.DadosCadastroInstituicao;
import com.vocco.api.domain.instituicao.dto.DadosDetalhamentoInstituicao;
import com.vocco.api.domain.instituicao.dto.DadosListagemInstituicao;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("instituicao")
public class InstituicaoController {
    @Autowired
    private InstituicaoService service;

    @PostMapping
    @Transactional
    public ResponseEntity<DadosDetalhamentoInstituicao> cadastrar(@RequestBody @Valid DadosCadastroInstituicao dados){
        DadosDetalhamentoInstituicao instituicao = service.cadastrar(dados);
        return ResponseEntity.ok().body(instituicao);
    }

    @PutMapping
    @Transactional
    public ResponseEntity<DadosDetalhamentoInstituicao> editar(@RequestBody @Valid DadosAtualizacaoInstituicao dados){
        DadosDetalhamentoInstituicao instituicao = service.editar(dados);
        return ResponseEntity.ok().body(instituicao);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DadosDetalhamentoInstituicao> detalhar(@PathVariable Long id){
        return ResponseEntity.ok().body(service.detalhar(id));
    }

    @GetMapping
    public ResponseEntity<List<DadosListagemInstituicao>> listar(){
        return ResponseEntity.ok().body(service.listar());
    }

    @GetMapping("ativos")
    public ResponseEntity<List<DadosListagemInstituicao>> listarAtivos(){
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
