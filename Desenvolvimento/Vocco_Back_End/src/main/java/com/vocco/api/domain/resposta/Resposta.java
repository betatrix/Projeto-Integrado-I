package com.vocco.api.domain.resposta;

import com.vocco.api.domain.estudante_teste.EstudanteTeste;
import com.vocco.api.domain.pergunta.Pergunta;
import com.vocco.api.domain.resposta.dto.DadosCadastroResposta;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor

@Entity
@Table(name = "Resposta")
public class Resposta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private EstudanteTeste estudanteTeste;
    @ManyToOne
    private Pergunta pergunta;
    private Integer resposta;

    public Resposta(DadosCadastroResposta dados, EstudanteTeste estudanteTeste, Pergunta pergunta){
        this.estudanteTeste = estudanteTeste;
        this.pergunta = pergunta;
        this.resposta = dados.resposta();
    }
}
