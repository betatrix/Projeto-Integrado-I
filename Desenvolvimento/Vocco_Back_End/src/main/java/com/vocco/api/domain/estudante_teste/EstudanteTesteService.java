package com.vocco.api.domain.estudante_teste;

import com.vocco.api.domain.estudante.Estudante;
import com.vocco.api.domain.estudante.EstudanteRepository;
import com.vocco.api.domain.estudante_perfil.dto.DadosPerfilRecorrente;
import com.vocco.api.domain.estudante_teste.dto.DadosCadastroEstudanteTeste;
import com.vocco.api.domain.estudante_teste.dto.DadosDetalhamentoEstudanteTeste;
import com.vocco.api.domain.estudante_teste.dto.DadosListagemEstudanteTestePerfis;
import com.vocco.api.domain.resultado.Resultado;
import com.vocco.api.domain.resultado.ResultadoRepository;
import com.vocco.api.domain.resultado_perfil.ResultadoPerfil;
import com.vocco.api.domain.resultado_perfil.ResultadoPerfilRepository;
import com.vocco.api.domain.teste.Teste;
import com.vocco.api.domain.teste.TesteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class EstudanteTesteService {
    @Autowired
    private EstudanteTesteRepository repository;
    @Autowired
    private EstudanteRepository estudanteRepository;
    @Autowired
    private TesteRepository testeRepository;
    @Autowired
    private ResultadoRepository resultadoRepository;
    @Autowired
    private ResultadoPerfilRepository resultadoPerfilRepository;

    public EstudanteTeste cadastrar(DadosCadastroEstudanteTeste dados){
        Teste teste = testeRepository.getReferenceById(dados.testeId());
        Estudante estudante = estudanteRepository.getReferenceByUsuarioId(dados.usuarioId());
        EstudanteTeste estudanteTeste = new EstudanteTeste(teste, estudante);
        repository.save(estudanteTeste);
        return estudanteTeste;
    }

    public List<DadosListagemEstudanteTestePerfis> listarTestesDeEstudante(Long usuarioId){
        Estudante estudante = estudanteRepository.getReferenceByUsuarioId(usuarioId);
        List<EstudanteTeste> registrosDeTestes = repository.findByEstudanteId(estudante.getId());

        return registrosDeTestes.stream().map(estudanteTeste -> {
            Resultado resultado = resultadoRepository.findByEstudanteTesteId(estudanteTeste.getId());
            List<ResultadoPerfil> resultadoPerfis = resultadoPerfilRepository.findAllByResultadoId(resultado.getId());
//            List<Perfil> perfis = resultadoPerfis.stream().map(ResultadoPerfil::getPerfil).toList();
            return new DadosListagemEstudanteTestePerfis(estudanteTeste, resultadoPerfis);
        }).toList();
    }

    public List<DadosPerfilRecorrente> listarPerfisMaisRecorrentesPorUsuarioId(Long usuarioId) {
        Estudante estudante = estudanteRepository.getReferenceByUsuarioId(usuarioId);
        List<EstudanteTeste> registrosDeTestes = repository.findByEstudanteId(estudante.getId());

        Map<String, Long> perfilFrequencia = new HashMap<>();
        Map<String, String> perfilImagem = new HashMap<>();

        for (EstudanteTeste estudanteTeste : registrosDeTestes) {
            Resultado resultado = resultadoRepository.findByEstudanteTesteId(estudanteTeste.getId());
            List<ResultadoPerfil> resultadoPerfis = resultadoPerfilRepository.findAllByResultadoId(resultado.getId());

            for (ResultadoPerfil resultadoPerfil : resultadoPerfis) {
                String descricao = resultadoPerfil.getPerfil().getDescricao();
                String imagem = resultadoPerfil.getPerfil().getImagem();

                perfilFrequencia.put(descricao, perfilFrequencia.getOrDefault(descricao, 0L) + 1);
                perfilImagem.putIfAbsent(descricao, imagem);
            }
        }

        return perfilFrequencia.entrySet().stream()
                .sorted((e1, e2) -> Long.compare(e2.getValue(), e1.getValue()))
                .limit(2)
                .map(entry -> new DadosPerfilRecorrente(entry.getKey(), perfilImagem.get(entry.getKey())))
                .collect(Collectors.toList());
    }

    public Integer contar(){
        return repository.findAll().size();
    }

    public Integer contarTestesPorEstudante(Long usuarioId){
        Estudante estudante = estudanteRepository.getReferenceByUsuarioId(usuarioId);
        return repository.findByEstudanteId(estudante.getId()).size();
    }

    public DadosDetalhamentoEstudanteTeste detalhar(Long id){
        return new DadosDetalhamentoEstudanteTeste(repository.getReferenceById(id));
    }


}
