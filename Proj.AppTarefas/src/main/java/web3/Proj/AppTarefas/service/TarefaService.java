package web3.Proj.AppTarefas.service;

import web3.Proj.AppTarefas.model.Tarefa;
import web3.Proj.AppTarefas.repository.TarefaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class TarefaService {

    @Autowired
    private TarefaRepository tarefaRepository;

    @Transactional
    public Tarefa salvar(Tarefa tarefa) {
        return tarefaRepository.save(tarefa);
    }

    public Optional<Tarefa> buscarPorId(Long id) {
        return tarefaRepository.findById(id);
    }

    @Transactional
    public Optional<Tarefa> atualizar(Long id, Tarefa novaTarefa) {
        return tarefaRepository.findById(id).map(tarefa -> {
            tarefa.setDescricao(novaTarefa.getDescricao());
            tarefa.setConcluida(novaTarefa.isConcluida());
            tarefa.setDataVencimento(novaTarefa.getDataVencimento());
            return tarefaRepository.save(tarefa);
        });
    }

    @Transactional
    public Optional<Tarefa> concluir(Long id) {
        return tarefaRepository.findById(id).map(tarefa -> {
            tarefa.setConcluida(true);
            return tarefaRepository.save(tarefa);
        });
    }

    @Transactional
    public boolean deletar(Long id) {
        return tarefaRepository.findById(id).map(tarefa -> {
            tarefaRepository.delete(tarefa);
            return true;
        }).orElse(false);
    }
}
