package com.vocco.api.domain.resultado_perfil;

import com.vocco.api.domain.perfil.Perfil;
import com.vocco.api.domain.resultado.Resultado;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor

@Entity
@Table(name = "ResultadoPerfil")
public class ResultadoPerfil {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private Resultado resultado;
    @ManyToOne
    private Perfil perfil;
    private Integer compatibilidade;

    public ResultadoPerfil(Resultado resultado, Perfil perfil, Integer compatibilidade){
        this.resultado = resultado;
        this.perfil = perfil;
        this.compatibilidade = compatibilidade;
    }
}
