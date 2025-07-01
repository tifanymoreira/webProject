package web3.Proj.AppTarefas.service;

import web3.Proj.AppTarefas.model.Bloco;
import web3.Proj.AppTarefas.model.Usuario;
import web3.Proj.AppTarefas.repository.BlocoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class BlocoService {

    @Autowired
    private BlocoRepository blocoRepository;

    public List<Bloco> listarPorUsuario(Usuario usuario) {
        return blocoRepository.findAllByDono(usuario);
    }

    @Transactional
    public Bloco salvar(Bloco bloco) {
        return blocoRepository.save(bloco);
    }

    public Optional<Bloco> buscarPorId(Long id) {
        return blocoRepository.findById(id);
    }

    @Transactional
    public Optional<Bloco> atualizar(Long id, Bloco blocoAtualizado) {
        return blocoRepository.findById(id).map(bloco -> {
            bloco.setPosX(blocoAtualizado.getPosX());
            bloco.setPosY(blocoAtualizado.getPosY());
            // Como Bloco é abstrato, não podemos atualizar campos específicos aqui
            return blocoRepository.save(bloco);
        });
    }

    @Transactional
    public boolean deletar(Long id) {
        return blocoRepository.findById(id).map(bloco -> {
            blocoRepository.delete(bloco);
            return true;
        }).orElse(false);
    }
}
