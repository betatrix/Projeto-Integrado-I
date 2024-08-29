package com.vocco.api.controller;

import com.vocco.api.domain.pergunta.PerguntaService;
import com.vocco.api.domain.pergunta.dto.DadosAtualizacaoPergunta;
import com.vocco.api.domain.pergunta.dto.DadosCadastroPergunta;
import com.vocco.api.domain.pergunta.dto.DadosDetalhamentoPergunta;
import com.vocco.api.domain.pergunta.dto.DadosListagemPergunta;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("pergunta")
public class PerguntaController {

    @Autowired
    private PerguntaService service;

    @PostMapping
    @Transactional
    public ResponseEntity<List<DadosListagemPergunta>> cadastrar(@RequestBody @Valid DadosCadastroPergunta dados){
        List<DadosListagemPergunta> perguntas = service.cadastrar(dados);
        return ResponseEntity.ok().body(perguntas);
    }

    @PutMapping
    @Transactional
    public ResponseEntity<DadosDetalhamentoPergunta> editar(@RequestBody @Valid DadosAtualizacaoPergunta dados){
        DadosDetalhamentoPergunta pergunta = service.editar(dados);
        return ResponseEntity.ok().body(pergunta);
    }
    @GetMapping("/{id}")
    public ResponseEntity<DadosDetalhamentoPergunta> detalhar(@PathVariable Long id){
        return ResponseEntity.ok().body(service.detalhar(id));
    }

    @GetMapping("teste/{id}")
    public ResponseEntity<List<DadosListagemPergunta>> listar(@PathVariable Long id){
        return ResponseEntity.ok().body(service.listarPorTeste(id));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        service.excluir(id);
        return ResponseEntity.noContent().build();
    }
}
