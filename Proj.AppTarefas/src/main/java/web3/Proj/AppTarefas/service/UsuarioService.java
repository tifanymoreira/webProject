package web3.Proj.AppTarefas.service;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import web3.Proj.AppTarefas.exception.EmailAlreadyExistsException;
import web3.Proj.AppTarefas.exception.UserNotFoundException;
import web3.Proj.AppTarefas.model.Usuario;
import web3.Proj.AppTarefas.repository.UsuarioRepository;
import web3.Proj.AppTarefas.security.JWTUtil;

import java.util.Optional;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JWTUtil jwtUtil;

    public UsuarioService(UsuarioRepository usuarioRepository,
                        PasswordEncoder passwordEncoder,
                        JWTUtil jwtUtil) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    /*@Transactional
    public Usuario salvar(Usuario usuario) throws EmailAlreadyExistsException {
        if (usuarioRepository.existsByEmail(usuario.getEmail())) {
            throw new EmailAlreadyExistsException("Email já está em uso");
        }
        
        try {
            usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
            return usuarioRepository.save(usuario);
        } catch (DataIntegrityViolationException e) {
            throw new EmailAlreadyExistsException("Email já está em uso", e);
        }
    }*/

    public Optional<Usuario> buscarPorEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }

    public Usuario buscarPorId(Long id) throws UserNotFoundException {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("Usuário não encontrado"));
    }

    public String gerarToken(String email) {
        return jwtUtil.generateToken(email);
    }

    public boolean validarSenha(String senhaDigitada, String senhaArmazenada) {
        return passwordEncoder.matches(senhaDigitada, senhaArmazenada);
    }
    /*
    @Transactional(readOnly = true)
    public boolean existePorEmail(String email) {
        return usuarioRepository.existsByEmail(email);
    }*/
}