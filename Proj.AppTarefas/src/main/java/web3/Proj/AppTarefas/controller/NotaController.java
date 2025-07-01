package web3.Proj.AppTarefas.controller;

import web3.Proj.AppTarefas.model.Nota;
import web3.Proj.AppTarefas.model.Usuario;
import web3.Proj.AppTarefas.service.NotaService;
import web3.Proj.AppTarefas.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notas")
public class NotaController {

    @Autowired
    private NotaService notaService;

    @Autowired
    private UsuarioService usuarioService;

    private Usuario getUsuarioAutenticado() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName(); // Retorna o e-mail do JWT
        return usuarioService.buscarPorEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário autenticado não encontrado."));
    }

    @GetMapping
    public ResponseEntity<List<Nota>> listarNotas() {
        return ResponseEntity.ok(notaService.listarPorUsuario(getUsuarioAutenticado()));
    }

    @PostMapping
    public ResponseEntity<Nota> criarNota(@RequestBody Nota nota) {
        nota.setDono(getUsuarioAutenticado());
        return ResponseEntity.ok(notaService.criarNota(nota));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizarNota(@PathVariable Long id, @RequestBody Nota nota) {
        return notaService.atualizarNota(id, nota)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletarNota(@PathVariable Long id) {
        return notaService.deletarNota(id)
                ? ResponseEntity.ok().build()
                : ResponseEntity.notFound().build();
    }
}
