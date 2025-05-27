package com.example.webfinalproject;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.concurrent.atomic.AtomicLong;

public class Tarefa {
    private static final AtomicLong counter = new AtomicLong();
    private long id;
    private String descricao;
    private LocalDate dataVencimento;
    private boolean concluida;

    // Construtor
    public Tarefa(String descricao, LocalDate dataVencimento) {
        this.id = counter.incrementAndGet();
        this.descricao = descricao;
        this.dataVencimento = dataVencimento;
        this.concluida = false;
    }

    // --- Getters! ---
    public long getId() {
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
    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public void setDataVencimento(LocalDate dataVencimento) {
        this.dataVencimento = dataVencimento;
    }

    public void setConcluida(boolean concluida) {
        this.concluida = concluida;
    }

    public void marcarComoConcluida() {
        this.concluida = true;
    }

 // ===================================================================================================
    @Override
    public String toString() {
        String status = this.concluida ? "[CONCLUÍDA]" : "[PENDENTE]";
        String dataFormatada = (dataVencimento != null) ?
                dataVencimento.format(DateTimeFormatter.ofPattern("dd/MM/yyyy")) : "N/A";

        return String.format("ID: %d | Descrição: %s | Vencimento: %s | Status: %s",
                id, descricao, dataFormatada, status);
    }
}