package com.vocco.api.domain.area;

import com.vocco.api.domain.area.dto.DadosAtualizacaoArea;
import com.vocco.api.domain.area.dto.DadosCadastroArea;
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
public class Area {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String descricao;
    private Boolean ativo;

    public Area (DadosCadastroArea dados){
        this.descricao = dados.descricao();
        this.ativo = true;
    }

    public void editarInformacoes(DadosAtualizacaoArea dados){
        atribuirSeNaoForNulo(dados.desricao(), this::setDescricao);
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
