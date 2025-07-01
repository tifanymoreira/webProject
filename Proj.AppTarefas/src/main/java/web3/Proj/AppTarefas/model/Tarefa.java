package web3.Proj.AppTarefas.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Tarefa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String descricao;
    private LocalDate dataVencimento;
    private boolean concluida;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lista_id")  // nome da coluna FK no banco
    private ListaTarefa lista;

    public Tarefa() {}

    public Tarefa(String descricao, LocalDate dataVencimento) {
        this.descricao = descricao;
        this.dataVencimento = dataVencimento;
        this.concluida = false;
    }

    // --- Getters! ---
    public Long getId() {
        return id;
    }

    public String getDescricao() {
        return descricao;
    }

    public LocalDate getDataVencimento() {
        return dataVencimento;
    }

    public boolean isConcluida() {
        return concluida;
    }

    // --- Setters ! ---
    public void setId(Long id) {
        this.id = id;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public void setDataVencimento(LocalDate dataVencimento) {
        this.dataVencimento = dataVencimento;
    }

    public void setConcluida(boolean concluida) {
        this.concluida = concluida;
    }

    public ListaTarefa getLista() {
        return lista;
    }

    public void setLista(ListaTarefa lista) {
        this.lista = lista;
    }
    
}