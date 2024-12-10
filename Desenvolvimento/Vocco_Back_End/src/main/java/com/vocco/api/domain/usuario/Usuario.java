package com.vocco.api.domain.usuario;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.function.Consumer;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
@EqualsAndHashCode(of = "id")
public class Usuario implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String login;
    private String fotoDePerfil;
    private String senha;
    private UsuarioRole role;
    private Boolean ativo;

    public Usuario(String login, String senha, UsuarioRole role){
        this.login = login;
        this.senha = new BCryptPasswordEncoder().encode(senha); //ja encriptografando a senha aqui
        this.role = role;
        this.ativo = true;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() { //consulta uma entidade para saber as roles dela
        if(this.role == UsuarioRole.ADMIN) return List.of(new SimpleGrantedAuthority("admin"), new SimpleGrantedAuthority("estudante")); //admin tem permissões de admin+estudante
        else return List.of(new SimpleGrantedAuthority("estudante"));
    }

    public void editarInformacoes(String login, String senha){
        atribuirSeNaoForNulo(login, this::setLogin);
        if(senha != null && !senha.trim().isEmpty()){
            this.senha = new BCryptPasswordEncoder().encode(senha);
        }
    }

    private <T> void atribuirSeNaoForNulo(T valor, Consumer<T> setter){
        if (Objects.nonNull(valor) && !valor.toString().trim().isEmpty()) {
            setter.accept(valor);
        }
    }

    public String getUsername() {
        return login;
    }

    @Override
    public String getPassword() {
        return this.senha;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public void excluir() {
        this.ativo = false;
    }
}
