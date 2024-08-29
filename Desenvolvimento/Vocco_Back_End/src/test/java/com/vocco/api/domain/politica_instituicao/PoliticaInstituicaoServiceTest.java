package com.vocco.api.domain.politica_instituicao;

import com.vocco.api.domain.endereco.dto.DadosCadastroEndereco;
import com.vocco.api.domain.instituicao.Instituicao;
import com.vocco.api.domain.instituicao.InstituicaoRepository;
import com.vocco.api.domain.instituicao.dto.DadosCadastroInstituicao;
import com.vocco.api.domain.instituicao.dto.DadosListagemInstituicao;
import com.vocco.api.domain.politica.Politica;
import com.vocco.api.domain.politica.PoliticaRepository;
import com.vocco.api.domain.politica.TipoPolitica;
import com.vocco.api.domain.politica.dto.DadosCadastroPolitica;
import com.vocco.api.domain.politica.dto.DadosDetalhamentoPolitica;
import com.vocco.api.domain.politica_instituicao.dto.DadosCadastroPoliticaInstituicao;
import com.vocco.api.domain.politica_instituicao.dto.DadosDetalhamentoPoliticaInstituicao;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PoliticaInstituicaoServiceTest {

    @InjectMocks
    private PoliticaInstituicaoService service;

    @Mock
    private PoliticaInstituicaoRepository repository;

    @Mock
    private PoliticaRepository politicaRepository;

    @Mock
    private InstituicaoRepository instituicaoRepository;

    private Politica politica;
    private Instituicao instituicao;
    private PoliticaInstituicao politicaInstituicao;
    private DadosCadastroPoliticaInstituicao dadosCadastro;
    private DadosDetalhamentoPoliticaInstituicao dadosDetalhamento;

    @BeforeEach
    void setup() {
        DadosCadastroPolitica dadosCadastroPolitica = new DadosCadastroPolitica(
                TipoPolitica.POLITICA_ENTRADA,
                "50 vagas reservadas para PPI"
        );

        politica = new Politica(dadosCadastroPolitica);

        DadosCadastroEndereco dadosCadastroEndereco = new DadosCadastroEndereco(
                "12345-678",
                "Rua das macieiras",
                "SP",
                "São Paulo",
                "123",
                "Bairro teste",
                "Complemento Exemplo"
        );

        DadosCadastroInstituicao dadosCadastroInstituicao = new DadosCadastroInstituicao(
                "UNIVERSIDADE FEDERAL",
                "www.uf.com",
                "UF",
                BigDecimal.valueOf(4.5),
                "SISU",
                dadosCadastroEndereco
        );

        instituicao = new Instituicao(dadosCadastroInstituicao);

        politicaInstituicao = new PoliticaInstituicao(politica, instituicao);
        dadosCadastro = new DadosCadastroPoliticaInstituicao(1L, 1L);
        dadosDetalhamento = new DadosDetalhamentoPoliticaInstituicao(politicaInstituicao);
    }

    @Test
    void testCadastrar() {
        when(politicaRepository.getReferenceById(anyLong())).thenReturn(politica);
        when(instituicaoRepository.getReferenceById(anyLong())).thenReturn(instituicao);
        when(repository.save(any(PoliticaInstituicao.class))).thenReturn(politicaInstituicao);

        DadosDetalhamentoPoliticaInstituicao result = service.cadastrar(dadosCadastro);

        assertEquals(dadosDetalhamento, result);
        verify(repository, times(1)).save(any(PoliticaInstituicao.class));
    }

    @Test
    void testListar() {
        when(repository.findAll()).thenReturn(Arrays.asList(politicaInstituicao));

        List<DadosDetalhamentoPoliticaInstituicao> result = service.listar();

        assertEquals(1, result.size());
        assertEquals(dadosDetalhamento, result.get(0));
    }

    @Test
    void testBuscarPoliticasPorInstituicao() {
        when(repository.findAllByInstituicaoId(anyLong())).thenReturn(Arrays.asList(politicaInstituicao));

        List<DadosDetalhamentoPolitica> result = service.buscarPoliticasPorInstituicao(1L);

        assertEquals(1, result.size());
        assertEquals(new DadosDetalhamentoPolitica(politica), result.get(0));
    }

    @Test
    void testBuscarInstituicoesPorPolitica() {
        when(repository.findAllByPoliticaId(anyLong())).thenReturn(Arrays.asList(politicaInstituicao));

        List<DadosListagemInstituicao> result = service.buscarInstituicoesPorPolitica(1L);

        assertEquals(1, result.size());
        assertEquals(new DadosListagemInstituicao(instituicao), result.get(0));
    }

    @Test
    void testExcluir() {
        doNothing().when(repository).deleteById(anyLong());

        service.excluir(1L);

        verify(repository, times(1)).deleteById(anyLong());
    }
}
