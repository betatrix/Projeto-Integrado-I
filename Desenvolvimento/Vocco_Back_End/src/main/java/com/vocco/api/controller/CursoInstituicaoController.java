package com.vocco.api.controller;

import com.vocco.api.domain.curso.dto.DadosDetalhamentoCurso;
import com.vocco.api.domain.curso_instituicao.CursoInstituicaoService;
import com.vocco.api.domain.curso_instituicao.dto.DadosAtualizacaoInstituicaoCurso;
import com.vocco.api.domain.curso_instituicao.dto.DadosCadastroCursoInstituicao;
import com.vocco.api.domain.curso_instituicao.dto.DadosDetalhamentoCursoInstituicao;
import com.vocco.api.domain.instituicao.dto.DadosDetalhamentoInstituicao;
import com.vocco.api.domain.instituicao.dto.DadosListagemInstituicaoEMecCurso;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("cursoInstituicao")
public class CursoInstituicaoController {
    @Autowired
    private CursoInstituicaoService service;

    @PostMapping
    @Transactional
    public ResponseEntity<DadosDetalhamentoCursoInstituicao> cadastrar(@RequestBody @Valid DadosCadastroCursoInstituicao dados) {
        DadosDetalhamentoCursoInstituicao CursoInstituicao = service.cadastrar(dados);
        return ResponseEntity.ok().body(CursoInstituicao);
    }

    @PutMapping
    @Transactional
    public ResponseEntity<DadosDetalhamentoCursoInstituicao> editar(@RequestBody @Valid DadosAtualizacaoInstituicaoCurso dados) {
        DadosDetalhamentoCursoInstituicao CursoInstituicao = service.editar(dados);
        return ResponseEntity.ok().body(CursoInstituicao);
    }

    @GetMapping
    public ResponseEntity<List<DadosDetalhamentoCursoInstituicao>> listar() {
        return ResponseEntity.ok().body(service.listar());
    }

    @GetMapping("/instituicao/{id}")
    public ResponseEntity<List<DadosDetalhamentoCurso>> buscarCursosPorInstituicao(@PathVariable Long id) {
        return ResponseEntity.ok().body(service.buscarCursosPorInstituicao(id));
    }

    @GetMapping("/curso/{id}")
    public ResponseEntity<List<DadosDetalhamentoInstituicao>> buscarInstituicoesPorCurso(@PathVariable Long id) {
        return ResponseEntity.ok().body(service.buscarInstituicoesPorCurso(id));
    }

    @GetMapping("/curso/mec/{id}")
    public ResponseEntity<List<DadosListagemInstituicaoEMecCurso>> buscarInstituicoesPorCursoComNotaMec(@PathVariable Long id) {
        return ResponseEntity.ok().body(service.buscarInstituicoesPorCursoComNotaMec(id));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Void> excluir(Long id) {
        service.excluir(id);
        return ResponseEntity.noContent().build();
    }

}
