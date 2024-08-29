package com.vocco.api.domain.estudante;

import com.vocco.api.domain.endereco.Endereco;
import com.vocco.api.domain.estudante.dto.DadosAtualizacaoEstudante;
import com.vocco.api.domain.estudante.dto.DadosCadastroEstudante;
import com.vocco.api.domain.usuario.Usuario;
import com.vocco.api.domain.usuario.UsuarioRole;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.LocalDate;
import java.util.Objects;
import java.util.function.Consumer;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
public class Estudante {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String email;
    private String senha;
    private LocalDate dataNascimento;
    private String celular;
    private Boolean ativo;

    @Enumerated(EnumType.STRING)
    private NivelEscolar nivelEscolar;

    @OneToOne(cascade = CascadeType.ALL) //estudante tem 1 usuário associado
    @JoinColumn(name = "usuario_id", referencedColumnName = "id")
    private Usuario usuario;

    public Estudante(DadosCadastroEstudante dados){
        this.nome = dados.nome();
        this.email = dados.email();
        this.senha = new BCryptPasswordEncoder().encode(dados.senha()); //ja encriptografando a senha aqui
        this.dataNascimento = dados.dataNascimento();
        this.celular = dados.celular();
        this.nivelEscolar = dados.nivelEscolar();
        this.ativo = true;
        this.usuario = new Usuario(dados.email(), this.senha, UsuarioRole.ESTUDANTE); //já cria um usuario associando ao estudante
    }
    public void editarInformacoes(DadosAtualizacaoEstudante dados){
        atribuirSeNaoForNulo(dados.nome(), this::setNome);
        atribuirSeNaoForNulo(dados.email(), this::setEmail);
        atribuirSeNaoForNulo(dados.dataNascimento(), this::setDataNascimento);
        atribuirSeNaoForNulo(dados.celular(), this::setCelular);
        atribuirSeNaoForNulo(dados.nivelEscolar(), this::setNivelEscolar);
    }

    private <T> void atribuirSeNaoForNulo(T valor, Consumer<T> setter){
        if (Objects.nonNull(valor) && !valor.toString().trim().isEmpty()) {
            setter.accept(valor);
        }
    }

    public void excluir(){
        this.ativo = false;
    }

    public boolean isAtivo() {
        return ativo;
    }


}
