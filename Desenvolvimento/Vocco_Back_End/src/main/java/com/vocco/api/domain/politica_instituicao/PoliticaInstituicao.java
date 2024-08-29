package com.vocco.api.domain.politica_instituicao;

import com.vocco.api.domain.instituicao.Instituicao;
import com.vocco.api.domain.politica.Politica;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.bind.annotation.GetMapping;

@Getter
@Setter
@NoArgsConstructor

@Entity
@Table
public class PoliticaInstituicao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private Politica politica;
    @ManyToOne
    private Instituicao instituicao;

    public PoliticaInstituicao(Politica politica, Instituicao instituicao){
        this.instituicao = instituicao;
        this.politica = politica;
    }


}
