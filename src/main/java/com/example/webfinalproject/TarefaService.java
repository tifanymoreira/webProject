package com.example.webfinalproject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class TarefaService {

    @Autowired
    private TarefaRepository tarefaRepository;

    public List<Tarefa> listarTodas() {
        return tarefaRepository.findAll();
    }

    public Optional<Tarefa> buscarPorId(Long id) {
        return tarefaRepository.findById(id);
    }

    public Tarefa criar(Tarefa tarefa) {
        return tarefaRepository.save(tarefa);
    }

    public Optional<Tarefa> atualizar(Long id, Tarefa tarefaDetails) {
        return tarefaRepository.findById(id).map(tarefa -> {
            tarefa.setDescricao(tarefaDetails.getDescricao());
            tarefa.setDataVencimento(tarefaDetails.getDataVencimento());
            tarefa.setConcluida(tarefaDetails.isConcluida());
            return tarefaRepository.save(tarefa);
        });
    }

    public boolean deletar(Long id) {
        return tarefaRepository.findById(id).map(tarefa -> {
            tarefaRepository.delete(tarefa);
            return true;
        }).orElse(false);
    }

    public Optional<Tarefa> marcarComoConcluida(Long id) {
        return tarefaRepository.findById(id).map(tarefa -> {
            tarefa.setConcluida(true);
            return tarefaRepository.save(tarefa);
        });
    }
}