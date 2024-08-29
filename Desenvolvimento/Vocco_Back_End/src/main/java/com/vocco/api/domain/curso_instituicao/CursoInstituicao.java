package com.vocco.api.domain.curso_instituicao;

import com.vocco.api.domain.curso.Curso;
import com.vocco.api.domain.curso_instituicao.dto.DadosAtualizacaoInstituicaoCurso;
import com.vocco.api.domain.curso_instituicao.dto.DadosCadastroCursoInstituicao;
import com.vocco.api.domain.instituicao.Instituicao;
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
public class CursoInstituicao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private Curso curso;
    @ManyToOne
    private Instituicao instituicao;
    private BigDecimal notaMec;

    public CursoInstituicao(Curso curso, Instituicao instituicao, DadosCadastroCursoInstituicao dados){
        this.curso = curso;
        this.instituicao = instituicao;
        this.notaMec = dados.notaMec();
    }

    public void editarInformacoes(DadosAtualizacaoInstituicaoCurso dados){
        atribuirSeForNaoNulo(dados.notaMec(), this::setNotaMec);
    }
    private <T> void atribuirSeForNaoNulo(T valor, Consumer<T> setter) {
        if (Objects.nonNull(valor) && !valor.toString().trim().isEmpty()) {
            setter.accept(valor);
        }
    }
}
