package com.vocco.api.controller;

import com.vocco.api.domain.resposta.RespostaService;
import com.vocco.api.domain.resposta.dto.DadosDetalhamentoResposta;
import com.vocco.api.domain.resposta.dto.DadosSubmissaoTeste;
import com.vocco.api.domain.resultado.dto.DadosDetalhamentoResultado;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("resposta")
public class RespostaController {
    @Autowired
    private RespostaService service;

    @PostMapping
    @Transactional
    public ResponseEntity<DadosDetalhamentoResultado> cadastrar(@RequestBody @Valid DadosSubmissaoTeste dados) {
        DadosDetalhamentoResultado resultado = service.cadastrar(dados);
        return ResponseEntity.ok().body(resultado);
    }

    @GetMapping("estudanteTeste/{id}")
    public ResponseEntity<List<DadosDetalhamentoResposta>> listarRespostasPorEstudanteTeste(@PathVariable Long id){
        return ResponseEntity.ok().body(service.listarRespostasPorEstudanteTeste(id));
    }

}