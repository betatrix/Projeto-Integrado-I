package com.vocco.api.domain.curso;

import com.vocco.api.domain.area.Area;
import com.vocco.api.domain.curso.dto.DadosAtualizacaoCurso;
import com.vocco.api.domain.curso.dto.DadosCadastroCurso;
import com.vocco.api.domain.perfil.Perfil;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Objects;
import java.util.function.Consumer;


@Getter
@Setter
@NoArgsConstructor

@Entity
@Table
public class Curso {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String descricao;
    private Boolean ativo;
    @Enumerated(EnumType.STRING)
    private NivelEmpregabilidade empregabilidade; // Necessário verificar
    private List<String> possiveisCarreiras; //Talvez transformar carreira em uma entidade
    @ManyToOne
    private Area area;
    @ManyToOne
    private Perfil perfil;

    public Curso(DadosCadastroCurso dados, Area area, Perfil perfil){
        this.descricao = dados.descricao();
        this.empregabilidade = dados.empregabilidade();
        this.ativo = true;
        this.possiveisCarreiras = dados.possiveisCarreiras();
        this.area = area;
        this.perfil = perfil;
    }

    public void excluir(){
        this.ativo = false;
    }
    public void editarInformacoes(DadosAtualizacaoCurso dados){
        atribuirSeForNaoNulo(dados.descricao(), this::setDescricao);
        atribuirSeForNaoNulo(dados.empregabilidade(), this::setEmpregabilidade);
        atribuirSeForNaoNulo(dados.possiveisCarreiras(), this::setPossiveisCarreiras);
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
