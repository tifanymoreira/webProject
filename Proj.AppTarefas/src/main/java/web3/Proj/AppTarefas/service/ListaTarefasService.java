package web3.Proj.AppTarefas.service;

import web3.Proj.AppTarefas.model.ListaTarefa;
import web3.Proj.AppTarefas.model.Usuario;
import web3.Proj.AppTarefas.repository.ListaTarefaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ListaTarefasService {

    @Autowired
    private ListaTarefaRepository listaTarefasRepository;

    public List<ListaTarefa> listarPorUsuario(Usuario usuario) {
        return listaTarefasRepository.findAllByDono(usuario);
    }

    @Transactional
    public ListaTarefa criarLista(ListaTarefa lista) {
        return listaTarefasRepository.save(lista);
    }

    public Optional<ListaTarefa> buscarPorId(Long id) {
        return listaTarefasRepository.findById(id);
    }

    @Transactional
    public Optional<ListaTarefa> atualizarLista(Long id, ListaTarefa listaAtualizada) {
        return listaTarefasRepository.findById(id).map(lista -> {
            lista.setTitulo(listaAtualizada.getTitulo());
            lista.setPosX(listaAtualizada.getPosX());
            lista.setPosY(listaAtualizada.getPosY());
            return listaTarefasRepository.save(lista);
        });
    }

    @Transactional
    public boolean deletarLista(Long id) {
        return listaTarefasRepository.findById(id).map(lista -> {
            listaTarefasRepository.delete(lista);
            return true;
        }).orElse(false);
    }
}
