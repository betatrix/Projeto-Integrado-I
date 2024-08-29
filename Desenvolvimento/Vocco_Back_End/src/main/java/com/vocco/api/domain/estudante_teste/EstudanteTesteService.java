package com.vocco.api.domain.estudante_teste;

import com.vocco.api.domain.estudante.Estudante;
import com.vocco.api.domain.estudante.EstudanteRepository;
import com.vocco.api.domain.estudante_teste.dto.DadosCadastroEstudanteTeste;
import com.vocco.api.domain.estudante_teste.dto.DadosDetalhamentoEstudanteTeste;
import com.vocco.api.domain.estudante_teste.dto.DadosListagemEstudanteTestePerfis;
import com.vocco.api.domain.perfil.Perfil;
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
            List<Perfil> perfis = resultadoPerfis.stream().map(ResultadoPerfil::getPerfil).toList();
            return new DadosListagemEstudanteTestePerfis(estudanteTeste, perfis);
        }).toList();
    }

    public List<String> listarPerfisMaisRecorrentesPorUsuarioId(Long usuarioId){
        Estudante estudante = estudanteRepository.getReferenceByUsuarioId(usuarioId);
        List<EstudanteTeste> registrosDeTestes = repository.findByEstudanteId(estudante.getId());

        Map<String, Long> perfilFrequencia = new HashMap<>();
        for (EstudanteTeste estudanteTeste : registrosDeTestes) {
            Resultado resultado = resultadoRepository.findByEstudanteTesteId(estudanteTeste.getId());
            List<ResultadoPerfil> resultadoPerfis = resultadoPerfilRepository.findAllByResultadoId(resultado.getId());

            for (ResultadoPerfil resultadoPerfil : resultadoPerfis) {
                String perfil = resultadoPerfil.getPerfil().getDescricao();
                perfilFrequencia.put(perfil, perfilFrequencia.getOrDefault(perfil, 0L) + 1);
            }
        }

        return perfilFrequencia.entrySet().stream()
                .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
                .limit(2)
                .map(Map.Entry::getKey)
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
