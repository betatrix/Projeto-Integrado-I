package com.vocco.api.domain.endereco;

import com.vocco.api.domain.endereco.dto.DadosAtualizacaoEndereco;
import com.vocco.api.domain.endereco.dto.DadosCadastroEndereco;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Objects;
import java.util.function.Consumer;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class Endereco {

    private String cep;
    private String logradouro;
    private String estado;
    private String cidade;
    private String numero;
    private String complemento;
    private String bairro;

    public Endereco(DadosCadastroEndereco dados){
        this.cep = dados.cep();
        this.logradouro = dados.logradouro();
        this.estado = dados.estado();
        this.cidade = dados.cidade();
        this.numero = dados.numero();
        this.complemento = dados.complemento();
        this.bairro = dados.bairro();
    }

    public void editarInformacoes(DadosAtualizacaoEndereco dados){
        atribuirSeNaoForNulo(dados.cep(), this::setCep);
        atribuirSeNaoForNulo(dados.logradouro(), this::setLogradouro);
        atribuirSeNaoForNulo(dados.estado(), this::setEstado);
        atribuirSeNaoForNulo(dados.cidade(), this::setCidade);
        atribuirSeNaoForNulo(dados.numero(), this::setNumero);
        atribuirSeNaoForNulo(dados.complemento(), this::setComplemento);
        atribuirSeNaoForNulo(dados.bairro(), this::setBairro);
    }

    private <T> void atribuirSeNaoForNulo(T valor, Consumer<T> setter){
        if (Objects.nonNull(valor) && !valor.toString().trim().isEmpty()) {
            setter.accept(valor);
        }
    }

}
