package web3.Proj.AppTarefas.security;

import web3.Proj.AppTarefas.model.Usuario;
import web3.Proj.AppTarefas.repository.UsuarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado com email: " + email));

        return new User(
                usuario.getEmail(),
                usuario.getSenha(),
                Collections.emptyList() // ou roles, se tiver
        );
    }
}
