package web3.Proj.AppTarefas.repository;

import web3.Proj.AppTarefas.model.ListaTarefa;
import web3.Proj.AppTarefas.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ListaTarefaRepository extends JpaRepository<ListaTarefa, Long> {
    List<ListaTarefa> findAllByDono(Usuario dono);
}
