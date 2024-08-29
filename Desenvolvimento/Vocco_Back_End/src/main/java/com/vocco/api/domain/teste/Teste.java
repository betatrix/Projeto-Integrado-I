package com.vocco.api.domain.teste;

import com.vocco.api.domain.teste.dto.DadosAtualizacaoTeste;
import com.vocco.api.domain.teste.dto.DadosCadastroTeste;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Objects;
import java.util.function.Consumer;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
public class Teste {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String titulo;
    private String descricao;
    private Boolean ativo;

    public Teste (DadosCadastroTeste dados){
        this.titulo = dados.titulo();
        this.descricao = dados.descricao();
        this.ativo = true;
    }
    public void editarInformacoes(DadosAtualizacaoTeste dados){
        atribuirSeNaoForNulo(dados.titulo(), this::setTitulo);
        atribuirSeNaoForNulo(dados.descricao(), this::setDescricao);
    }

    private <T> void atribuirSeNaoForNulo(T valor, Consumer<T> setter){
        if (Objects.nonNull(valor) && !valor.toString().trim().isEmpty()) {
            setter.accept(valor);
        }
    }
    public void excluir(){
        this.ativo = false;
    }

    public boolean isAtivo() {
        return ativo;
    }
}
