package com.vocco.api.domain.politica;

import com.vocco.api.domain.politica.dto.DadosAtualizacaoPolitica;
import com.vocco.api.domain.politica.dto.DadosCadastroPolitica;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Objects;
import java.util.function.Consumer;

@Getter
@Setter
@NoArgsConstructor

@Entity
@Table
public class Politica {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Enumerated(EnumType.STRING)
    private TipoPolitica tipo;
    private String descricao;
    private Boolean ativo;

    public Politica(DadosCadastroPolitica dados){
        this.tipo = dados.tipo();
        this.descricao = dados.descricao();
        this.ativo = true;
    }

    public void excluir(){
        this.ativo = false;
    }

    public void editarInformacoes(DadosAtualizacaoPolitica dados){
        atribuirSeNaoForNulo(dados.descricao(), this::setDescricao);
        atribuirSeNaoForNulo(dados.tipo(), this::setTipo);
    }

    private <T> void atribuirSeNaoForNulo(T valor, Consumer<T> setter){
        if (Objects.nonNull(valor) && !valor.toString().trim().isEmpty()) {
            setter.accept(valor);
        }
    }

    public boolean isAtivo() {
        return ativo;
    }
}
