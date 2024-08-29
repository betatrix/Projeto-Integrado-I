package com.vocco.api.domain.resultado_perfil;

import com.vocco.api.domain.perfil.Perfil;
import com.vocco.api.domain.perfil.dto.DadosListagemPerfil;
import com.vocco.api.domain.resultado.Resultado;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResultadoPerfilService {
    @Autowired
    private ResultadoPerfilRepository repository;

    public void cadastrar(Resultado resultado, Perfil perfil, Integer compatibilidade){
        ResultadoPerfil resultadoPerfil = new ResultadoPerfil(resultado, perfil, compatibilidade);
        repository.save(resultadoPerfil);
    }

    public List<ResultadoPerfil> listarPerfisPorResultado(Long id) {
        return repository.findAllByResultadoId(id);
    }


//    public List<DadosListagemPerfil> detalharPerfis
}
