package web3.Proj.AppTarefas.model;

/*Criação de notas adesivas - post it virtual :3*/

import jakarta.persistence.*;

@Entity
public class Nota extends Bloco {

    private String titulo;

    @Lob
    private String conteudo;

    public Nota() {}

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getConteudo() {
        return conteudo;
    }

    public void setConteudo(String conteudo) {
        this.conteudo = conteudo;
    }
}