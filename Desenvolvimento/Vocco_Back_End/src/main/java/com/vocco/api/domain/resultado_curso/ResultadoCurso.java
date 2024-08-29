package com.vocco.api.domain.resultado_curso;

import com.vocco.api.domain.curso.Curso;
import com.vocco.api.domain.resultado.Resultado;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor

@Entity
@Table(name = "ResultadoCurso")
public class ResultadoCurso {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private Curso curso;
    @ManyToOne
    private Resultado resultado;
    private Boolean perfilPrimario;

    public ResultadoCurso(Resultado resultado, Curso curso, Boolean perfilPrimario){
        this.curso = curso;
        this.resultado = resultado;
        this.perfilPrimario = perfilPrimario;
    }
}
