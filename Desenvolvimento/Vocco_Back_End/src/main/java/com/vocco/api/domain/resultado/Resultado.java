package com.vocco.api.domain.resultado;

import com.vocco.api.domain.estudante_teste.EstudanteTeste;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor

@Entity
@Table(name = "Resultado")
public class Resultado {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length = 1000)
    private String mensagem;
    @Column(length = 1000)
    private String mensagemIngles;
    @OneToOne
    private EstudanteTeste estudanteTeste;

    public Resultado(EstudanteTeste estudanteTeste, String mensagem, String mensagemIngles){
        this.estudanteTeste = estudanteTeste;
        this.mensagem = mensagem;
        this.mensagemIngles = mensagemIngles;
    }
}
