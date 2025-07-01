package web3.Proj.AppTarefas.repository;

import web3.Proj.AppTarefas.model.Nota;
import web3.Proj.AppTarefas.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotaRepository extends JpaRepository<Nota, Long> {
    List<Nota> findAllByDono(Usuario dono);
}
