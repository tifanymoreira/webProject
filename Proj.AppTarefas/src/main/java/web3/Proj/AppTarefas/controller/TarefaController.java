package web3.Proj.AppTarefas.controller;

import web3.Proj.AppTarefas.model.Tarefa;
import web3.Proj.AppTarefas.model.ListaTarefa;
import web3.Proj.AppTarefas.service.ListaTarefasService;
import web3.Proj.AppTarefas.service.TarefaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/tarefas")
public class TarefaController {

    @Autowired
    private TarefaService tarefaService;

    @Autowired
    private ListaTarefasService listaTarefasService;

    @PostMapping("/lista/{listaId}")
    public ResponseEntity<Tarefa> criarTarefa(@PathVariable Long listaId, @RequestBody Tarefa tarefa) {
        Optional<ListaTarefa> listaOpt = listaTarefasService.buscarPorId(listaId);
        if (listaOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        tarefa.setLista(listaOpt.get());
        Tarefa novaTarefa = tarefaService.salvar(tarefa);
        return ResponseEntity.ok(novaTarefa);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Tarefa> atualizarTarefa(@PathVariable Long id, @RequestBody Tarefa novaTarefa) {
        return tarefaService.atualizar(id, novaTarefa)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}/concluir")
    public ResponseEntity<Tarefa> concluirTarefa(@PathVariable Long id) {
        return tarefaService.concluir(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarTarefa(@PathVariable Long id) {
        boolean deletado = tarefaService.deletar(id);
        return deletado ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }
}
