package web3.Proj.AppTarefas.repository;

import web3.Proj.AppTarefas.model.Bloco;
import web3.Proj.AppTarefas.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BlocoRepository extends JpaRepository<Bloco, Long> {
    List<Bloco> findAllByDono(Usuario dono);
}
