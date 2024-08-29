package com.vocco.api.domain.usuario.recuperacaoSenha;

import com.vocco.api.domain.usuario.Usuario;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table
public class TokenRecuperacaoSenha {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String token;
    @ManyToOne
    @JoinColumn(nullable = false)
    private Usuario usuario;
    private LocalDateTime dataExpiracao;
}
