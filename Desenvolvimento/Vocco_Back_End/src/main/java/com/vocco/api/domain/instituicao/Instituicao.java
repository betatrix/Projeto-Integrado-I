package com.vocco.api.domain.instituicao;

import com.vocco.api.domain.endereco.Endereco;
import com.vocco.api.domain.instituicao.dto.DadosAtualizacaoInstituicao;
import com.vocco.api.domain.instituicao.dto.DadosCadastroInstituicao;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Objects;
import java.util.function.Consumer;

@Getter
@Setter
@NoArgsConstructor

@Entity
@Table
public class Instituicao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String site;
    private BigDecimal notaMec;
    private String sigla;
    private Boolean ativo;
    private String formaIngresso;
    @Embedded
    private Endereco endereco;

    public Instituicao(DadosCadastroInstituicao dados){
        this.nome = dados.nome();
        this.site = dados.site();
        this.notaMec = dados.notaMec();
        this.sigla = dados.sigla();
        this.formaIngresso = dados.formaIngresso();
        this.ativo = true;
        this.endereco = new Endereco(dados.endereco());
    }

    public void editarInformacoes(DadosAtualizacaoInstituicao dados){
        atribuirSeForNaoNulo(dados.nome(), this::setNome);
        atribuirSeForNaoNulo(dados.site(), this::setSite);
        atribuirSeForNaoNulo(dados.notaMec(), this::setNotaMec);
        atribuirSeForNaoNulo(dados.sigla(), this::setSigla);
        atribuirSeForNaoNulo(dados.formaIngresso(), this::setFormaIngresso);
    }

    public void excluir(){
        this.ativo = false;
    }

    private <T> void atribuirSeForNaoNulo(T valor, Consumer<T> setter) {
        if (Objects.nonNull(valor) && !valor.toString().trim().isEmpty()) {
            setter.accept(valor);
        }
    }

    public boolean isAtivo() {
        return ativo;
    }
}
