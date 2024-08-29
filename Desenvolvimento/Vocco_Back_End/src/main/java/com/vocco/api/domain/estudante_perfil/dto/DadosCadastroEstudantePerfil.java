package com.vocco.api.domain.estudante_perfil.dto;

public record DadosCadastroEstudantePerfil(
        Long estudanteId,
        Long perfilId,
        Integer compatibilidade
) {
}
