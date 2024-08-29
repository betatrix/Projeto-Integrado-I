package com.vocco.api.domain.estudante_teste;

import com.vocco.api.domain.estudante.Estudante;
import com.vocco.api.domain.teste.Teste;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor

@Entity
@Table(name = "EstudanteTeste")
public class EstudanteTeste {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private Teste teste;
    @ManyToOne
    private Estudante estudante;
    private LocalDate data;

    public EstudanteTeste(Teste teste, Estudante estudante){
        this.teste = teste;
        this.estudante = estudante;
        this.data = LocalDate.now();
    }

}
