package web3.Proj.AppTarefas.service;

import web3.Proj.AppTarefas.model.Nota;
import web3.Proj.AppTarefas.model.Usuario;
import web3.Proj.AppTarefas.repository.NotaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class NotaService {

    @Autowired
    private NotaRepository notaRepository;

    public List<Nota> listarPorUsuario(Usuario usuario) {
        return notaRepository.findAllByDono(usuario);
    }

    @Transactional
    public Nota criarNota(Nota nota) {
        return notaRepository.save(nota);
    }

    public Optional<Nota> buscarPorId(Long id) {
        return notaRepository.findById(id);
    }

    @Transactional
    public Optional<Nota> atualizarNota(Long id, Nota notaAtualizada) {
        return notaRepository.findById(id).map(nota -> {
            nota.setTitulo(notaAtualizada.getTitulo());
            nota.setConteudo(notaAtualizada.getConteudo());
            nota.setPosX(notaAtualizada.getPosX());
            nota.setPosY(notaAtualizada.getPosY());
            return notaRepository.save(nota);
        });
    }

    @Transactional
    public boolean deletarNota(Long id) {
        return notaRepository.findById(id).map(nota -> {
            notaRepository.delete(nota);
            return true;
        }).orElse(false);
    }
}
