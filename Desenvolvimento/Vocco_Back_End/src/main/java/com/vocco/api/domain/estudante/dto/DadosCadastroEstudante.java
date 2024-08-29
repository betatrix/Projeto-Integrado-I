package com.vocco.api.domain.estudante.dto;

import com.vocco.api.domain.estudante.NivelEscolar;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public record DadosCadastroEstudante(
        @NotBlank
        String nome,
        @NotBlank
        @Email
        String email,
        @NotBlank
        String senha,
        @NotNull
        LocalDate dataNascimento,
        @NotBlank
        String celular,
        @NotNull
        NivelEscolar nivelEscolar) {
}
