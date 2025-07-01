/*Código para criar um bloco de anotações
 para complementar com a lista de tarefas.*/

package web3.Proj.AppTarefas.model;

import jakarta.persistence.*;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Bloco {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int posX;
    private int posY;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario dono;

    public Bloco() {}

    public Long getId() {
        return id;
    }

    public int getPosX() {
        return posX;
    }

    public void setPosX(int posX) {
        this.posX = posX;
    }

    public int getPosY() {
        return posY;
    }

    public void setPosY(int posY) {
        this.posY = posY;
    }

    public Usuario getDono() {
        return dono;
    }

    public void setDono(Usuario dono) {
        this.dono = dono;
    }
}
