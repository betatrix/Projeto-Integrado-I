package com.vocco.api.domain.curso_instituicao;

import com.vocco.api.domain.area.Area;
import com.vocco.api.domain.curso.Curso;
import com.vocco.api.domain.curso.CursoRepository;
import com.vocco.api.domain.curso.NivelEmpregabilidade;
import com.vocco.api.domain.curso.dto.DadosCadastroCurso;
import com.vocco.api.domain.curso.dto.DadosDetalhamentoCurso;
import com.vocco.api.domain.curso_instituicao.dto.DadosAtualizacaoInstituicaoCurso;
import com.vocco.api.domain.curso_instituicao.dto.DadosCadastroCursoInstituicao;
import com.vocco.api.domain.curso_instituicao.dto.DadosDetalhamentoCursoInstituicao;
import com.vocco.api.domain.endereco.dto.DadosCadastroEndereco;
import com.vocco.api.domain.instituicao.Instituicao;
import com.vocco.api.domain.instituicao.InstituicaoRepository;
import com.vocco.api.domain.instituicao.dto.DadosCadastroInstituicao;
import com.vocco.api.domain.instituicao.dto.DadosDetalhamentoInstituicao;
import com.vocco.api.domain.perfil.Perfil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CursoInstituicaoServiceTest {

    @Mock
    private CursoInstituicaoRepository repository;
    @Mock
    private CursoRepository cursoRepository;
    @Mock
    private InstituicaoRepository instituicaoRepository;

    @InjectMocks
    private CursoInstituicaoService service;

    private Curso curso;
    private Instituicao instituicao;
    private CursoInstituicao cursoInstituicao;
    private DadosCadastroCursoInstituicao dadosCadastro;
    private DadosAtualizacaoInstituicaoCurso dadosAtualizacao;

    @BeforeEach
    void setUp() {
        Area area = new Area();
        area.setId(1L);
        area.setDescricao("Ciencias");

        Perfil perfil = new Perfil();
        perfil.setId(1L);
        perfil.setDescricao("Descricao Perfil");
        perfil.setDescricao("Detalhes Perfil");

        dadosCadastro = new DadosCadastroCursoInstituicao(
                1L,
                1L,
                BigDecimal.valueOf(4)
        );
        curso = new Curso(
                new DadosCadastroCurso(
                        "Descrição do curso",
                        1L,
                        1L,
                        NivelEmpregabilidade.ALTA,
                        Arrays.asList("Carreira 1", "Carreira 2")
                ),
                area,
                perfil
        );

        DadosCadastroEndereco dadosEndereco = new DadosCadastroEndereco(
                "12345-678",
                "Rua das Macieiras",
                "SP",
                "São Paulo",
                "123",
                "Bairro Teste",
                "Complemento Exemplo"
        );
        instituicao = new Instituicao(
                new DadosCadastroInstituicao(
                        "Instituição Exemplo",
                        "www.instituicao.com",
                        "IE",
                        BigDecimal.valueOf(4.5),
                        "SISU",
                        dadosEndereco
                )
        );

        cursoInstituicao = new CursoInstituicao(curso, instituicao, dadosCadastro);

        // Inicialização dos dados de atualização
        dadosAtualizacao = new DadosAtualizacaoInstituicaoCurso(
                1L,
                BigDecimal.valueOf(5)
        );
    }

    @Test
    void testCadastrar() {
        when(cursoRepository.getReferenceById(anyLong())).thenReturn(curso);
        when(instituicaoRepository.getReferenceById(anyLong())).thenReturn(instituicao);
        when(repository.save(any(CursoInstituicao.class))).thenReturn(cursoInstituicao);

        DadosDetalhamentoCursoInstituicao result = service.cadastrar(dadosCadastro);

        assertNotNull(result);
        verify(cursoRepository, times(1)).getReferenceById(anyLong());
        verify(instituicaoRepository, times(1)).getReferenceById(anyLong());
        verify(repository, times(1)).save(any(CursoInstituicao.class));
    }

    @Test
    void testEditar() {
        when(repository.getReferenceById(anyLong())).thenReturn(cursoInstituicao);
        when(repository.save(any(CursoInstituicao.class))).thenReturn(cursoInstituicao);

        DadosDetalhamentoCursoInstituicao result = service.editar(dadosAtualizacao);

        assertNotNull(result);
        verify(repository, times(1)).getReferenceById(anyLong());
        verify(repository, times(1)).save(any(CursoInstituicao.class));
    }

    @Test
    void testListar() {
        when(repository.findAll()).thenReturn(Arrays.asList(cursoInstituicao));

        List<DadosDetalhamentoCursoInstituicao> result = service.listar();

        assertFalse(result.isEmpty());
        verify(repository, times(1)).findAll();
    }

    @Test
    void testBuscarCursosPorInstituicao() {
        List<CursoInstituicao> cursosInstituicao = Arrays.asList(cursoInstituicao);
        when(repository.findAllByInstituicaoId(anyLong())).thenReturn(cursosInstituicao);

        List<DadosDetalhamentoCurso> result = service.buscarCursosPorInstituicao(1L);

        assertFalse(result.isEmpty());
        assertEquals(1, result.size());
        verify(repository, times(1)).findAllByInstituicaoId(anyLong());
    }


    @Test
    void testBuscarInstituicoesPorCurso() {
        List<CursoInstituicao> cursosInstituicao = Arrays.asList(cursoInstituicao);
        when(repository.findAllByCursoId(anyLong())).thenReturn(cursosInstituicao);

        List<DadosDetalhamentoInstituicao> result = service.buscarInstituicoesPorCurso(1L);

        assertFalse(result.isEmpty());
        assertEquals(1, result.size());
        verify(repository, times(1)).findAllByCursoId(anyLong());
    }

    @Test
    void testExcluir() {
        doNothing().when(repository).deleteById(anyLong());

        service.excluir(1L);

        verify(repository, times(1)).deleteById(anyLong());
    }
}
