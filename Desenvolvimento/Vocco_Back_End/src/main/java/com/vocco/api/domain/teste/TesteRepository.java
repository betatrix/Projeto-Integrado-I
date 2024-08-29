package com.vocco.api.domain.teste;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TesteRepository extends JpaRepository<Teste, Long> {
    List<Teste> findAllByAtivoTrue();
}
