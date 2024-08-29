package com.vocco.api.domain.resultado;

import java.util.*;
import java.util.stream.Collectors;

import com.vocco.api.domain.curso.Curso;
import com.vocco.api.domain.curso.CursoRepository;
import com.vocco.api.domain.curso.dto.DadosDetalhamentoCurso;
import com.vocco.api.domain.curso.dto.DadosRecomendacaoCursos;
import com.vocco.api.domain.estudante_perfil.EstudantePerfil;
import com.vocco.api.domain.estudante_perfil.EstudantePerfilService;
import com.vocco.api.domain.estudante_teste.EstudanteTeste;
import com.vocco.api.domain.perfil.Perfil;
import com.vocco.api.domain.resposta.Resposta;
import com.vocco.api.domain.resultado.dto.DadosDetalhamentoResultado;
import com.vocco.api.domain.resultado_curso.ResultadoCursoService;
import com.vocco.api.domain.resultado_perfil.ResultadoPerfil;
import com.vocco.api.domain.resultado_perfil.ResultadoPerfilService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ResultadoService {
    @Autowired
    private ResultadoRepository repository;
    @Autowired
    private ResultadoCursoService resultadoCursoService;
    @Autowired
    private CursoRepository cursoRepository;
    @Autowired
    private EstudantePerfilService estudantePerfilService;
    @Autowired
    private ResultadoPerfilService resultadoPerfilService;

    public DadosDetalhamentoResultado cadastrar(EstudanteTeste estudanteTeste, List<Resposta> respostasTeste) {
        List<EstudantePerfil> perfis = obterPerfis(estudanteTeste, respostasTeste);
        if (perfis.size() < 2) {
            throw new IllegalArgumentException("Resultado inconclusivo.");
        }

        String mensagem = definirMensagem(estudanteTeste, perfis);
        Resultado resultado = new Resultado(estudanteTeste, mensagem);
        repository.save(resultado);

        DadosRecomendacaoCursos cursos = recomendarCursos(respostasTeste, perfis, resultado);

        perfis.forEach(perfil -> resultadoPerfilService.cadastrar(resultado, perfil.getPerfil(), perfil.getCompatibilidade()));
        List<ResultadoPerfil> resultadoPerfis = resultadoPerfilService.listarPerfisPorResultado(resultado.getId());

        return new DadosDetalhamentoResultado(resultado, cursos, resultadoPerfis);
    }

    private String definirMensagem(EstudanteTeste estudanteTeste, List<EstudantePerfil> perfis) {

        String nomeCompleto = estudanteTeste.getEstudante().getNome();
        String primeiroNome = nomeCompleto.split(" ")[0];

        perfis.sort(Comparator.comparingInt(EstudantePerfil::getCompatibilidade).reversed());

        EstudantePerfil estudantePerfilPrimerio = perfis.get(0);
        Perfil perfilPrimario = estudantePerfilPrimerio.getPerfil();
        EstudantePerfil estudantePerfilSecundario = perfis.get(1);
        Perfil perfilSecundario = estudantePerfilSecundario.getPerfil();

        return String.format("Olá " + primeiroNome + ", que bom ter você aqui! \n" +
                "Seu perfil primário é " + perfilPrimario.getDescricao() + " " +
                "e o secundário é : " + perfilSecundario.getDescricao() +", isso não é o máximo?! \n " +
                "Isso significa que você gosta de " + perfilPrimario.getDetalhes() + " e de " + perfilSecundario.getDetalhes() + "." +
                "Abaixo listamos alguns cursos que podem te interessar, boa sorte! ");
    }

    private List<EstudantePerfil> obterPerfis(EstudanteTeste estudanteTeste, List<Resposta> respostasTeste) {
        Map<Perfil, Long> somaRespostasPorPerfil = new HashMap<>();
        Map<Perfil, Long> contagemRespostasPorPerfil = new HashMap<>();
        List<EstudantePerfil> perfis = new ArrayList<>();

        respostasTeste.forEach(resposta -> {
            Perfil perfil = resposta.getPergunta().getPerfil();
            long valorResposta = resposta.getResposta();
            somaRespostasPorPerfil.put(perfil, somaRespostasPorPerfil.getOrDefault(perfil, 0L) + valorResposta);
            contagemRespostasPorPerfil.put(perfil, contagemRespostasPorPerfil.getOrDefault(perfil, 0L) + 1);
        });

        contagemRespostasPorPerfil.forEach((perfil, contagem) -> {
            if (contagem >= 3) {
                long somaRespostas = somaRespostasPorPerfil.get(perfil);
                int mediaCompatibilidade = Math.round((float) somaRespostas / contagem);
                EstudantePerfil estudantePerfil = estudantePerfilService.cadastrar(estudanteTeste.getEstudante().getUsuario().getId(), perfil, mediaCompatibilidade);
                perfis.add(estudantePerfil);
            }
        });

        perfis.sort(Comparator.comparingInt(EstudantePerfil::getCompatibilidade).reversed());
        if (perfis.size() > 2) {
            return perfis.subList(0, 2);
        }

        return perfis.isEmpty() ? new ArrayList<>() : perfis;
    }

    private DadosRecomendacaoCursos recomendarCursos(List<Resposta> respostasTeste, List<EstudantePerfil> perfis, Resultado resultado) {
        Perfil perfilPrimario = perfis.get(0).getPerfil();
        Perfil perfilSecundario = perfis.get(1).getPerfil();

        // Adicionado tratamento para evitar IndexOutOfBoundsException
        List<Curso> cursosPerfilPrimario = cursoRepository.findAllByAtivoTrueAndPerfilId(perfilPrimario.getId());
        if (cursosPerfilPrimario.size() > 3) {
            cursosPerfilPrimario = cursosPerfilPrimario.subList(0, 3);
        }

        List<Curso> cursosPerfilSecundario = cursoRepository.findAllByAtivoTrueAndPerfilId(perfilSecundario.getId());
        if (cursosPerfilSecundario.size() > 3) {
            cursosPerfilSecundario = cursosPerfilSecundario.subList(0, 3);
        }

        resultadoCursoService.cadastrar(resultado, cursosPerfilPrimario, cursosPerfilSecundario);


        List<DadosDetalhamentoCurso> cursosPerfilPrimarioDto = cursosPerfilPrimario.stream().map(DadosDetalhamentoCurso::new).toList();
        List<DadosDetalhamentoCurso> cursosPerfilSecundarioDto = cursosPerfilSecundario.stream().map(DadosDetalhamentoCurso::new).toList();

        return new DadosRecomendacaoCursos(cursosPerfilPrimarioDto, cursosPerfilSecundarioDto);
    }

    public DadosDetalhamentoResultado detalhar(Long estudanteTesteId){
        Resultado resultado = repository.findByEstudanteTesteId(estudanteTesteId);
        if (resultado == null) {
            throw new IllegalArgumentException("Resultado não encontrado para o id do teste do estudante: " + estudanteTesteId);
        }

        List<ResultadoPerfil> perfis = resultadoPerfilService.listarPerfisPorResultado(resultado.getId());
        System.out.println(perfis);

        List<Curso> cursosPerfilPrimario = resultadoCursoService.retornarCursosPerfilPrimario(resultado.getId());
        List<Curso> cursosPerfilSecundario = resultadoCursoService.retornarCursosPerfilSecundario(resultado.getId());

        List<DadosDetalhamentoCurso> cursosPerfilPrimarioDto = cursosPerfilPrimario.stream().map(DadosDetalhamentoCurso::new).toList();
        List<DadosDetalhamentoCurso> cursosPerfilSecundarioDto = cursosPerfilSecundario.stream().map(DadosDetalhamentoCurso::new).toList();

        return new DadosDetalhamentoResultado(resultado, new DadosRecomendacaoCursos(cursosPerfilPrimarioDto, cursosPerfilSecundarioDto), perfis);
    }
}
