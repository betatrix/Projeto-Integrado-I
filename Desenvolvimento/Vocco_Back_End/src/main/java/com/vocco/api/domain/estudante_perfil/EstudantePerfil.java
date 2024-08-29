package com.vocco.api.domain.estudante_perfil;

import com.vocco.api.domain.estudante.Estudante;
import com.vocco.api.domain.estudante_perfil.dto.DadosCadastroEstudantePerfil;
import com.vocco.api.domain.perfil.Perfil;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor

@Entity
@Table(name = "EstudantePerfil")
public class EstudantePerfil {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private Estudante estudante;
    @ManyToOne
    private Perfil perfil;
    private Integer compatibilidade;

    public EstudantePerfil(Integer compatibilidade, Estudante estudante, Perfil perfil){
        this.estudante = estudante;
        this.perfil = perfil;
        this.compatibilidade = compatibilidade;
    }
}
