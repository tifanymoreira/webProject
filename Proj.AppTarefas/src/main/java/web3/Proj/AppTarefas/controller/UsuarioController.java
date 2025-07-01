package web3.Proj.AppTarefas.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import web3.Proj.AppTarefas.exception.UserNotFoundException;
import web3.Proj.AppTarefas.model.Usuario;
import web3.Proj.AppTarefas.service.UsuarioService;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping("/login")
    public ResponseEntity<TokenResponse> login(@RequestBody Usuario usuario) {
        Usuario user = usuarioService.buscarPorEmail(usuario.getEmail())
                .orElseThrow(() -> new UserNotFoundException("Credenciais inválidas"));

        if (!usuarioService.validarSenha(usuario.getSenha(), user.getSenha())) {
            throw new UserNotFoundException("Credenciais inválidas");
        }

        String token = usuarioService.gerarToken(user.getEmail());
        return ResponseEntity.ok(new TokenResponse(token));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> buscarPorId(@PathVariable Long id) {
        Usuario usuario = usuarioService.buscarPorId(id);
        return ResponseEntity.ok(usuario);
    }

    private static class TokenResponse {
        private String token;

        public TokenResponse(String token) {
            this.token = token;
        }

        public String getToken() {
            return token;
        }
    }
}