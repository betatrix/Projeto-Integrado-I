package com.vocco.api.domain.usuario;

import com.vocco.api.domain.administrador.Administrador;
import com.vocco.api.domain.administrador.AdministradorRepository;
import com.vocco.api.domain.estudante.Estudante;
import com.vocco.api.domain.estudante.EstudanteRepository;
import com.vocco.api.domain.usuario.dto.DadosAutenticacaoUsuario;
import com.vocco.api.domain.usuario.dto.DadosRetornoLoginAdministrador;
import com.vocco.api.domain.usuario.dto.DadosRetornoLoginEstudante;
import com.vocco.api.domain.usuario.recuperacaoSenha.TokenRecuperacaoSenha;
import com.vocco.api.domain.usuario.recuperacaoSenha.TokenRecuperacaoSenhaRepository;
import com.vocco.api.infra.exception.excecoesPersonalizadas.ValidacaoException;
import com.vocco.api.infra.security.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class UsuarioService implements UserDetailsService {
    @Autowired
    private UsuarioRepository repository;
    @Autowired
    private TokenService tokenService;
    @Autowired
    private EstudanteRepository estudanteRepository;
    @Autowired
    private AdministradorRepository administradorRepository;

    private final AuthenticationManager authenticationManager;
    @Autowired
    private TokenRecuperacaoSenhaRepository recuperacaoSenhaRepository;

    public UsuarioService(@Lazy AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return repository.findByLogin(username);
    }

    public DadosRetornoLoginEstudante loginEstudante (DadosAutenticacaoUsuario dados){
        Usuario usuario = repository.findByLoginUsuario(dados.login());

        if(usuario == null){
            throw new ValidacaoException("Credenciais Inválidas!");
        }

        var usernamePassword = new UsernamePasswordAuthenticationToken(dados.login(), dados.senha());
        var auth = this.authenticationManager.authenticate(usernamePassword);
        var token = tokenService.generateToken((Usuario) auth.getPrincipal());

        Estudante estudante = estudanteRepository.findAllByUsuarioId(usuario.getId());
        return new DadosRetornoLoginEstudante(token, usuario, estudante);
    }

    public DadosRetornoLoginAdministrador loginAdministrador (DadosAutenticacaoUsuario dados){
        Usuario usuario = repository.findByLoginUsuario(dados.login());

        if(usuario == null){
            throw new ValidacaoException("Credenciais Inválidas!");
        }

        var usernamePassword = new UsernamePasswordAuthenticationToken(dados.login(), dados.senha());
        var auth = this.authenticationManager.authenticate(usernamePassword);
        var token = tokenService.generateToken((Usuario) auth.getPrincipal());

        Administrador administrador = administradorRepository.findAllByUsuarioId(usuario.getId());
        return new DadosRetornoLoginAdministrador(token, usuario, administrador);
    }

    public String criarTokenRecuperacaoSenha(String email) {
        Optional<Usuario> usuario = repository.findByEmail(email);
        if (!usuario.isPresent()) {
            throw new IllegalArgumentException("Email não encontrado");
        }

        Usuario usuarioEncontrado = usuario.get();
        String token = UUID.randomUUID().toString();

        TokenRecuperacaoSenha tokenRecuperacaoSenha = new TokenRecuperacaoSenha();
        tokenRecuperacaoSenha.setToken(token);
        tokenRecuperacaoSenha.setUsuario(usuarioEncontrado);
        tokenRecuperacaoSenha.setDataExpiracao(LocalDateTime.now().plusHours(1)); // Token válido por 1 hora

        recuperacaoSenhaRepository.save(tokenRecuperacaoSenha);
        return token;
    }

    public boolean atualizarSenha(String token, String novaSenha) {
        Optional<TokenRecuperacaoSenha> tokenRecuperacaoSenha = recuperacaoSenhaRepository.findByToken(token);

        if (!tokenRecuperacaoSenha.isPresent()) {
            return false; // Token inválido
        }

        TokenRecuperacaoSenha tokenEncontrado = tokenRecuperacaoSenha.get();

        if (tokenEncontrado.getDataExpiracao().isBefore(LocalDateTime.now())) {
            return false; // Token expirado
        }

        Usuario usuario = tokenEncontrado.getUsuario();
        usuario.setSenha(new BCryptPasswordEncoder().encode(novaSenha));
        repository.save(usuario);

        recuperacaoSenhaRepository.delete(tokenEncontrado); // Invalidar o token
        return true;
    }



}
