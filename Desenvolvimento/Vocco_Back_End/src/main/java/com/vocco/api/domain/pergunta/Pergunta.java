package com.vocco.api.domain.pergunta;

import com.vocco.api.domain.perfil.Perfil;
import com.vocco.api.domain.pergunta.dto.DadosAtualizacaoPergunta;
import com.vocco.api.domain.pergunta.dto.DadosCadastroPergunta;
import com.vocco.api.domain.teste.Teste;
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
public class Pergunta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String texto;
    private Boolean ativo;
    @ManyToOne
    private Teste teste;
    @ManyToOne
    private Perfil perfil;

    public Pergunta(DadosCadastroPergunta dados, Teste teste, Perfil perfil){
        this.texto = dados.texto();
        this.ativo = true;
        this.teste = teste;
        this.perfil = perfil;
    }
    public void editarInformacoes(DadosAtualizacaoPergunta dados){
        atribuirSeNaoForNulo(dados.texto(), this::setTexto);
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

