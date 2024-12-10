package com.vocco.api.domain.administrador;

import com.vocco.api.domain.administrador.dto.DadosAtualizacaoAdministrador;
import com.vocco.api.domain.administrador.dto.DadosCadastroAdministrador;
import com.vocco.api.domain.administrador.dto.DadosDetalhamentoAdministrador;
import com.vocco.api.domain.administrador.dto.DadosListagemAdministrador;
import com.vocco.api.domain.usuario.Usuario;
import com.vocco.api.domain.usuario.UsuarioRepository;
import com.vocco.api.infra.aws.FilesProfileService;
import com.vocco.api.infra.exception.excecoesPersonalizadas.ValidacaoException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class AdministradorService {
    @Autowired
    private AdministradorRepository repository;
    @Autowired
    private FilesProfileService filesProfileService;
    @Autowired
    private UsuarioRepository usuarioRepository;

    public DadosDetalhamentoAdministrador cadastrar(DadosCadastroAdministrador dados){
        if(repository.existsByEmail(dados.email())){
            throw new ValidacaoException("Já existe uma conta cadastrada com esse email!");
        }
        Administrador administrador = new Administrador(dados);
        repository.save(administrador);
        return new DadosDetalhamentoAdministrador(administrador);
    }

    public DadosDetalhamentoAdministrador adicionarFoto(Long id, MultipartFile arquivo){
        Administrador administrador = repository.getReferenceByUsuarioId(id);
        Usuario usuario = administrador.getUsuario();
        if(arquivo != null){
            usuario.setFotoDePerfil(filesProfileService.salvarFotoDePerfil(arquivo, id));
        } else{
            throw new ValidacaoException("Insira uma imagem válida.");
        }
        usuarioRepository.save(usuario);
        return new DadosDetalhamentoAdministrador(administrador);
    }

    public DadosDetalhamentoAdministrador editar(DadosAtualizacaoAdministrador dados){
        Administrador administrador = repository.getReferenceById(dados.id());
        administrador.editarInformacoes(dados);
        if (dados.endereco() != null){
            administrador.getEndereco().editarInformacoes(dados.endereco());
        }
        repository.save(administrador);
        return new DadosDetalhamentoAdministrador(administrador);
    }

    public DadosDetalhamentoAdministrador detalhar(Long id){
        return new DadosDetalhamentoAdministrador(repository.getReferenceById(id));
    }

    public List<DadosListagemAdministrador> listar(){
        return repository.findAll().stream().map(DadosListagemAdministrador::new).toList();
    }

    public List<DadosListagemAdministrador> listarAtivos() {
        return repository.findAllByAtivoTrue().stream().map(DadosListagemAdministrador::new).toList();
    }

    public void excluir(Long id){
        Administrador administrador = repository.getReferenceById(id);
        administrador.excluir();
        administrador.getUsuario().excluir();
        repository.save(administrador);
    }


}
