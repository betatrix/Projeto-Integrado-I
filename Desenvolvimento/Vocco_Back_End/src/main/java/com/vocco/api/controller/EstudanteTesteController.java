package com.vocco.api.controller;

import com.vocco.api.domain.estudante_teste.EstudanteTesteService;
import com.vocco.api.domain.estudante_teste.dto.DadosDetalhamentoEstudanteTeste;
import com.vocco.api.domain.estudante_teste.dto.DadosListagemEstudanteTestePerfis;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("estudanteTeste")
public class EstudanteTesteController {
    @Autowired
    private EstudanteTesteService service;

//    @PostMapping
//    @Transactional
//    public ResponseEntity<DadosDetalhamentoEstudanteTeste> cadastrar(@RequestBody @Valid DadosCadastroEstudanteTeste dados){
//        DadosDetalhamentoEstudanteTeste estudanteTeste = service.cadastrar(dados);
//        return ResponseEntity.ok().body(estudanteTeste);
//    }

    @GetMapping("teste/{estudanteId}")
    public ResponseEntity<List<DadosListagemEstudanteTestePerfis>> listar(@PathVariable Long estudanteId){
        return ResponseEntity.ok().body(service.listarTestesDeEstudante(estudanteId));
    }

    @GetMapping("teste/perfis/{estudanteId}")
    public ResponseEntity<List<String>> listarPerfisMaisRecorrentes(@PathVariable Long estudanteId){
        return ResponseEntity.ok().body(service.listarPerfisMaisRecorrentesPorUsuarioId(estudanteId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<DadosDetalhamentoEstudanteTeste> detalhar(@PathVariable Long id){
        return ResponseEntity.ok().body(service.detalhar(id));
    }

    @GetMapping("contagem")
    public ResponseEntity<Integer> contar(){
        return ResponseEntity.ok().body(service.contar());
    }

    @GetMapping("contagem/{estudanteId}")
    public ResponseEntity<Integer> contarTestesPorEstudante(@PathVariable Long estudanteId){
        return ResponseEntity.ok().body(service.contarTestesPorEstudante(estudanteId));
    }

}
