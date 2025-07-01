package web3.Proj.AppTarefas.controller;

import web3.Proj.AppTarefas.model.Bloco;
import web3.Proj.AppTarefas.model.Usuario;
import web3.Proj.AppTarefas.service.BlocoService;
import web3.Proj.AppTarefas.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/blocos")
public class BlocoController {

    @Autowired
    private BlocoService blocoService;

    @Autowired
    private UsuarioService usuarioService;

    /**
     * Obtém o usuário logado com base no e-mail presente no token JWT.
     */
    private Usuario getUsuarioAutenticado() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName(); // `name` é o username, que usamos como email
        return usuarioService.buscarPorEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário autenticado não encontrado."));
    }

    @GetMapping
    public ResponseEntity<List<Bloco>> listarBlocos() {
        List<Bloco> blocos = blocoService.listarPorUsuario(getUsuarioAutenticado());
        return ResponseEntity.ok(blocos);
    }

    @PostMapping
    public ResponseEntity<Bloco> criarBloco(@RequestBody Bloco bloco) {
        bloco.setDono(getUsuarioAutenticado());
        Bloco novoBloco = blocoService.salvar(bloco);
        return ResponseEntity.ok(novoBloco);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Bloco> atualizarBloco(@PathVariable Long id, @RequestBody Bloco bloco) {
        return blocoService.atualizar(id, bloco)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarBloco(@PathVariable Long id) {
        boolean deletado = blocoService.deletar(id);
        return deletado ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }
}
