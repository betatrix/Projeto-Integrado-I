package com.vocco.api.controller;

import com.vocco.api.domain.resposta.dto.DadosDetalhamentoResposta;
import com.vocco.api.domain.resultado.ResultadoService;
import com.vocco.api.domain.resultado.dto.DadosDetalhamentoResultado;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("resultado")
public class ResultadoController {
    @Autowired
    private ResultadoService service;

    @GetMapping("estudanteTeste/{id}")
    public ResponseEntity<DadosDetalhamentoResultado> detalharPorEstudanteTeste(@PathVariable Long id){
        return ResponseEntity.ok().body(service.detalhar(id));
    }

}

