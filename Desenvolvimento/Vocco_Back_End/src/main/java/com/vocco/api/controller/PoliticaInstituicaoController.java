package com.vocco.api.controller;


import com.vocco.api.domain.instituicao.dto.DadosListagemInstituicao;
import com.vocco.api.domain.politica.dto.DadosDetalhamentoPolitica;
import com.vocco.api.domain.politica_instituicao.PoliticaInstituicaoService;
import com.vocco.api.domain.politica_instituicao.dto.DadosCadastroPoliticaInstituicao;
import com.vocco.api.domain.politica_instituicao.dto.DadosDetalhamentoPoliticaInstituicao;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("politicaInstituicao")
public class PoliticaInstituicaoController {
    @Autowired
    private PoliticaInstituicaoService service;

    @PostMapping
    @Transactional
    public ResponseEntity<DadosDetalhamentoPoliticaInstituicao> cadastrar(@RequestBody @Valid DadosCadastroPoliticaInstituicao dados) {
        DadosDetalhamentoPoliticaInstituicao PoliticaInstituicao = service.cadastrar(dados);
        return ResponseEntity.ok().body(PoliticaInstituicao);
    }

    @GetMapping
    public ResponseEntity<List<DadosDetalhamentoPoliticaInstituicao>> listar() {
        return ResponseEntity.ok().body(service.listar());
    }

    @GetMapping("/instituicao/{id}")
    public ResponseEntity<List<DadosDetalhamentoPolitica>> buscarPoliticasPorInstituicao(@PathVariable Long id) {
        return ResponseEntity.ok().body(service.buscarPoliticasPorInstituicao(id));
    }

    @GetMapping("/politica/{id}")
    public ResponseEntity<List<DadosListagemInstituicao>> buscarInstituicoesPorPolitica(@PathVariable Long id) {
        return ResponseEntity.ok().body(service.buscarInstituicoesPorPolitica(id));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        service.excluir(id);
        return ResponseEntity.noContent().build();
    }
}
