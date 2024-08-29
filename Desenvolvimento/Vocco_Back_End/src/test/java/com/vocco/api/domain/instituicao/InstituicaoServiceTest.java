package com.vocco.api.domain.instituicao;

import com.vocco.api.domain.endereco.dto.DadosAtualizacaoEndereco;
import com.vocco.api.domain.endereco.dto.DadosCadastroEndereco;
import com.vocco.api.domain.instituicao.dto.*;
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
class InstituicaoServiceTest {

    @Mock
    private InstituicaoRepository repository;
    @InjectMocks
    private InstituicaoService service;
    private Instituicao instituicao;
    private DadosCadastroInstituicao dadosCadastro;
    private DadosAtualizacaoInstituicao dadosAtualizacao;

    @BeforeEach
    void setUp() {
        DadosCadastroEndereco dadosCadastroEndereco = new DadosCadastroEndereco(
                "12345-678",
                "Rua das macieiras",
                "SP",
                "São Paulo",
                "123",
                "Bairro teste",
                "Complemento Exemplo"
        );

        dadosCadastro = new DadosCadastroInstituicao(
                "UNIVERSIDADE FEDERAL",
                "www.uf.com",
                "UF",
                BigDecimal.valueOf(4.5),
                "SISU",
                dadosCadastroEndereco
        );

        instituicao = new Instituicao(dadosCadastro);

        DadosAtualizacaoEndereco dadosAtualizacaoEndereco = new DadosAtualizacaoEndereco(
                "87654-321",
                "Avenida Exemplo",
                "RJ",
                "Rio de Janeiro",
                "321",
                "Bairro Atualizado",
                "Complemento Atualizado"
        );

        dadosAtualizacao = new DadosAtualizacaoInstituicao(
                1L,
                "NOME ATUALIZADO",
                "www.atualizado.com",
                BigDecimal.valueOf(4.7),
                "NA",
                "SISU",
                dadosAtualizacaoEndereco
        );

        DadosDetalhamentoInstituicao dadosDetalhamento = new DadosDetalhamentoInstituicao(instituicao);
    }

    @Test
    void testCadastrar() {
        when(repository.save(any(Instituicao.class))).thenReturn(instituicao);

        DadosDetalhamentoInstituicao result = service.cadastrar(dadosCadastro);

        assertNotNull(result);
        verify(repository, times(1)).save(any(Instituicao.class));
    }

    @Test
    void testEditar() {
        when(repository.getReferenceById(anyLong())).thenReturn(instituicao);

        DadosDetalhamentoInstituicao result = service.editar(dadosAtualizacao);

        assertNotNull(result);
        verify(repository, times(1)).getReferenceById(anyLong());
        verify(repository, times(1)).save(any(Instituicao.class));
    }

    @Test
    void testDetalhar() {
        when(repository.getReferenceById(anyLong())).thenReturn(instituicao);

        DadosDetalhamentoInstituicao result = service.detalhar(1L);

        assertNotNull(result);
        verify(repository, times(1)).getReferenceById(anyLong());
    }

    @Test
    void testListar() {
        when(repository.findAll()).thenReturn(Arrays.asList(instituicao));

        List<DadosListagemInstituicao> result = service.listar();

        assertFalse(result.isEmpty());
        verify(repository, times(1)).findAll();
    }

    @Test
    void testListarAtivos() {
        when(repository.findAllByAtivoTrue()).thenReturn(Arrays.asList(instituicao));

        List<DadosListagemInstituicao> result = service.listarAtivos();

        assertFalse(result.isEmpty());
        verify(repository, times(1)).findAllByAtivoTrue();
    }

    @Test
    void testContarAtivos() {
        when(repository.findAllByAtivoTrue()).thenReturn(Arrays.asList(instituicao));

        Integer result = service.contarAtivos();

        assertEquals(1, result);
        verify(repository, times(1)).findAllByAtivoTrue();
    }

    @Test
    void testExcluir() {
        when(repository.getReferenceById(anyLong())).thenReturn(instituicao);

        service.excluir(1L);

        verify(repository, times(1)).getReferenceById(anyLong());
        verify(repository, times(1)).save(any(Instituicao.class));
    }
}
