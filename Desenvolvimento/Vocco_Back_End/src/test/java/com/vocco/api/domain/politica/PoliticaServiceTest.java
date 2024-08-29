package com.vocco.api.domain.politica;

import com.vocco.api.domain.politica.dto.DadosAtualizacaoPolitica;
import com.vocco.api.domain.politica.dto.DadosCadastroPolitica;
import com.vocco.api.domain.politica.dto.DadosDetalhamentoPolitica;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PoliticaServiceTest {

    @Mock
    private PoliticaRepository repository;
    @InjectMocks
    private PoliticaService service;
    private Politica politica;
    private DadosCadastroPolitica dadosCadastro;
    private DadosAtualizacaoPolitica dadosAtualizacao;

    @BeforeEach
    void setUp() {
        dadosCadastro = new DadosCadastroPolitica(
                TipoPolitica.POLITICA_ENTRADA,
                "50 vagas reservadas para PPI"
        );

        politica = new Politica(dadosCadastro);

        dadosAtualizacao = new DadosAtualizacaoPolitica(
                1L,
                TipoPolitica.POLITICA_PERMANENCIA,
                "Bolsa auxílio de 600 reais"
        );
    }

    @Test
    void testCadastrar() {
        when(repository.save(any(Politica.class))).thenReturn(politica);

        DadosDetalhamentoPolitica result = service.cadastrar(dadosCadastro);

        assertNotNull(result);

        verify(repository, times(1)).save(any(Politica.class));
    }

    @Test
    void testEditar() {
        when(repository.getReferenceById(anyLong())).thenReturn(politica);

        DadosDetalhamentoPolitica result = service.editar(dadosAtualizacao);

        assertNotNull(result);
        verify(repository, times(1)).getReferenceById(anyLong());
        verify(repository, times(1)).save(any(Politica.class));
    }

    @Test
    void testDetalhar() {
        when(repository.getReferenceById(anyLong())).thenReturn(politica);

        DadosDetalhamentoPolitica result = service.detalhar(1L);

        assertNotNull(result);
        verify(repository, times(1)).getReferenceById(anyLong());
    }

    @Test
    void testListar() {
        when(repository.findAll()).thenReturn(Arrays.asList(politica));

        List<DadosDetalhamentoPolitica> result = service.listar();

        assertFalse(result.isEmpty());
        verify(repository, times(1)).findAll();
    }

    @Test
    void testListarAtivos() {
        when(repository.findAllByAtivoTrue()).thenReturn(Arrays.asList(politica));
        List<DadosDetalhamentoPolitica> result = service.listarAtivos();

        assertFalse(result.isEmpty());
        verify(repository, times(1)).findAllByAtivoTrue();
    }

    @Test
    void testExcluir() {
        when(repository.getReferenceById(anyLong())).thenReturn(politica);

        service.excluir(1L);

        verify(repository, times(1)).getReferenceById(anyLong());
        verify(repository, times(1)).save(any(Politica.class));
    }
}
