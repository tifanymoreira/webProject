package web3.Proj.AppTarefas.controller;

import web3.Proj.AppTarefas.model.ListaTarefa;
import web3.Proj.AppTarefas.model.Usuario;
import web3.Proj.AppTarefas.service.ListaTarefasService;
import web3.Proj.AppTarefas.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/listas")
public class ListaTarefasController {

    @Autowired
    private ListaTarefasService listaTarefasService;

    @Autowired
    private UsuarioService usuarioService;

    private Usuario getUsuarioAutenticado() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName(); // Retorna o "subject" do JWT (o e-mail)
        return usuarioService.buscarPorEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário autenticado não encontrado."));
    }

    @GetMapping
    public ResponseEntity<List<ListaTarefa>> listarListas() {
        List<ListaTarefa> listas = listaTarefasService.listarPorUsuario(getUsuarioAutenticado());
        return ResponseEntity.ok(listas);
    }

    @PostMapping
    public ResponseEntity<ListaTarefa> criarLista(@RequestBody ListaTarefa lista) {
        lista.setDono(getUsuarioAutenticado());
        ListaTarefa novaLista = listaTarefasService.criarLista(lista);
        return ResponseEntity.ok(novaLista);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ListaTarefa> atualizarLista(@PathVariable Long id, @RequestBody ListaTarefa lista) {
        return listaTarefasService.atualizarLista(id, lista)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarLista(@PathVariable Long id) {
        boolean deletado = listaTarefasService.deletarLista(id);
        return deletado ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }
}
