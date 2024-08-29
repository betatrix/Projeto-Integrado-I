package com.vocco.api.domain.administrador;

import com.vocco.api.domain.administrador.dto.DadosAtualizacaoAdministrador;
import com.vocco.api.domain.administrador.dto.DadosCadastroAdministrador;
import com.vocco.api.domain.endereco.Endereco;
import com.vocco.api.domain.usuario.Usuario;
import com.vocco.api.domain.usuario.UsuarioRole;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Objects;
import java.util.function.Consumer;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
public class Administrador {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String cpf;
    private String email;
    private String senha;
    private String cargo;
    private String celular;
    @Embedded
    private Endereco endereco;
    private Boolean ativo;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "usuario_id", referencedColumnName = "id")
    private Usuario usuario;


    public Administrador(DadosCadastroAdministrador dados){
        this.nome = dados.nome();
        this.cpf = dados.cpf();
        this.email = dados.email();
        this.senha = new BCryptPasswordEncoder().encode(dados.senha());
        this.cargo = dados.cargo();
        this.celular = dados.celular();
        this.ativo = true;
        this.endereco = new Endereco(dados.endereco());
        this.usuario = new Usuario(dados.email(), this.senha, UsuarioRole.ADMIN);
    }

    public void editarInformacoes(DadosAtualizacaoAdministrador dados){
        atribuirSeNaoForNulo(dados.nome(), this::setNome);
        atribuirSeNaoForNulo(dados.cpf(), this::setCpf);
        atribuirSeNaoForNulo(dados.email(), this::setEmail);
        atribuirSeNaoForNulo(dados.cargo(), this::setCargo);
        atribuirSeNaoForNulo(dados.celular(), this::setCelular);
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
