package com.vocco.api.controller;

import com.vocco.api.domain.usuario.Usuario;
import com.vocco.api.domain.usuario.UsuarioRepository;
import com.vocco.api.domain.usuario.UsuarioService;
import com.vocco.api.domain.usuario.dto.DadosAutenticacaoUsuario;
import com.vocco.api.domain.usuario.dto.DadosRetornoLoginAdministrador;
import com.vocco.api.domain.usuario.dto.DadosRetornoLoginEstudante;
import com.vocco.api.domain.usuario.dto.DadosRegistroUsuario;
import com.vocco.api.infra.email.EmailService;
import com.vocco.api.infra.security.TokenService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("auth")
public class AutenticacaoController {
    @Autowired
    private UsuarioRepository repository;
    @Autowired
    private TokenService tokenService;
    @Autowired
    private UsuarioService service;
    @Autowired
    EmailService emailService;
    private final AuthenticationManager authenticationManager;

    public AutenticacaoController(@Lazy AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

//    @PostMapping("/login")
//    public ResponseEntity login(@RequestBody @Valid AuthenticationDTO dados){
//        try {
//            var usernamePassword = new UsernamePasswordAuthenticationToken(dados.login(), dados.senha());
//            var auth = this.authenticationManager.authenticate(usernamePassword);
//            var token = tokenService.generateToken((Usuario) auth.getPrincipal());
//
//            return ResponseEntity.ok(new LoginResponseDTO(token));
//
//        } catch (Exception e) {
//            return ResponseEntity.status(401).body("Credenciais inválidas");
//        }
//    }

    @PostMapping("/estudante/login")
    public ResponseEntity<DadosRetornoLoginEstudante> loginEstudante(@RequestBody @Valid DadosAutenticacaoUsuario dados){
       return  ResponseEntity.ok().body(service.loginEstudante(dados));
    }

    @PostMapping("/administrador/login")
    public ResponseEntity<DadosRetornoLoginAdministrador> loginAdministrador(@RequestBody @Valid DadosAutenticacaoUsuario dados){
        return  ResponseEntity.ok().body(service.loginAdministrador(dados));
    }

    @PostMapping("/cadastro") //cadastro de um usuario sem ter uma entidade (admin ou estudante) associada
    public ResponseEntity cadastrar(@RequestBody @Valid DadosRegistroUsuario dados){
        if(this.repository.findByLogin(dados.login()) != null) return ResponseEntity.badRequest().body("Usuário já existente"); //verifica se ja não existe

        var encryptedPassword = new BCryptPasswordEncoder().encode(dados.senha());
        Usuario novoUsuario = new Usuario(dados.login(), encryptedPassword, dados.role());

        this.repository.save(novoUsuario);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/esqueceuSenha")
    public ResponseEntity<?> esqueceuSenha(@RequestParam String email) {
        String token = service.criarTokenRecuperacaoSenha(email);
        String url = "https://vocco.vercel.app/nova-senha?token=" + token;
        emailService.enviarEmailRecuperacaoSenha(email, url);
        return ResponseEntity.ok("Acesse o link gerado em seu email para gerar uma nova senha.");
    }

    @PostMapping("/redefinirSenha")
    public ResponseEntity<?> redefinirSenha(@RequestParam String token, @RequestParam String novaSenha) {
        boolean isReset = service.atualizarSenha(token, novaSenha);
        if (isReset) {
            return ResponseEntity.ok("Senha atualizada com sucesso.");
        } else {
            return ResponseEntity.badRequest().body("tokenInvalido.");
        }
    }
}
