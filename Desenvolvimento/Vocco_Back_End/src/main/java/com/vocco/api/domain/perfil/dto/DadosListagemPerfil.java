package com.vocco.api.domain.perfil.dto;

import com.vocco.api.domain.estudante_perfil.EstudantePerfil;
import com.vocco.api.domain.perfil.Perfil;
import com.vocco.api.domain.resultado_perfil.ResultadoPerfil;

public record DadosListagemPerfil(
        Long id, String descricao, String descricaoIngles, String imagem
) {
    public DadosListagemPerfil(Perfil perfil){
        this(perfil.getId(), perfil.getDescricao(), perfil.getDescricaoIngles(), perfil.getImagem());
    }

    public DadosListagemPerfil(EstudantePerfil estudantePerfil) {
        this(estudantePerfil.getPerfil().getId(), estudantePerfil.getPerfil().getDescricao(), estudantePerfil.getPerfil().getDescricaoIngles(), estudantePerfil.getPerfil().getImagem());
    }

    public DadosListagemPerfil(ResultadoPerfil resultadoPerfil) {
        this(resultadoPerfil.getPerfil().getId(), resultadoPerfil.getPerfil().getDescricao(), resultadoPerfil.getPerfil().getDescricaoIngles(), resultadoPerfil.getPerfil().getImagem());
    }
}
