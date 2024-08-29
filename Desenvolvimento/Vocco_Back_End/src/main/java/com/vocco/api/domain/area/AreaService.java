package com.vocco.api.domain.area;

import com.vocco.api.domain.area.dto.DadosAtualizacaoArea;
import com.vocco.api.domain.area.dto.DadosCadastroArea;
import com.vocco.api.domain.area.dto.DadosDetalhamentoArea;
import com.vocco.api.domain.area.dto.DadosListagemArea;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AreaService {

    @Autowired
    private AreaRepository repository;

    public DadosDetalhamentoArea cadastrar(DadosCadastroArea dados){
        Area area = new Area(dados);
        repository.save(area);
        return new DadosDetalhamentoArea(area);
    }

    public DadosDetalhamentoArea editar(DadosAtualizacaoArea dados){
        Area area = repository.getReferenceById(dados.id());
        area.editarInformacoes(dados);
        repository.save(area);
        return new DadosDetalhamentoArea(area);
    }
    public DadosDetalhamentoArea detalhar(Long id){
        return new DadosDetalhamentoArea(repository.getReferenceById(id));
    }

    public List<DadosListagemArea> listar(){
        return repository.findAll().stream().map(DadosListagemArea::new).toList();
    }

    public List<DadosListagemArea> listarAtivos(){
        return repository.findAllByAtivoTrue().stream().map(DadosListagemArea::new).toList();
    }


    public void excluir(Long id){
        Area area = repository.getReferenceById(id);
        area.excluir();
        repository.save(area);
    }
}
