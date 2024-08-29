package com.vocco.api.domain.administrador.dto;

import com.vocco.api.domain.endereco.dto.DadosCadastroEndereco;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record DadosCadastroAdministrador(

        @NotBlank
        String nome,
        @NotBlank
        String cpf,
        @NotBlank
        @Email
        String email,
        @NotBlank
        String senha,
        @NotBlank
        String cargo,
        @NotBlank
        String celular,
        @NotNull
        @Valid
        DadosCadastroEndereco endereco ) {
}
