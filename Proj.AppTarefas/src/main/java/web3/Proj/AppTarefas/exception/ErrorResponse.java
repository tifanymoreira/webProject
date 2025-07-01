package web3.Proj.AppTarefas.exception;

import java.time.LocalDateTime;
import java.util.Map;

public record ErrorResponse(
    LocalDateTime timestamp,
    int status,
    String error,
    String message,
    String path,
    Map<String, String> details
) {
    public ErrorResponse(
            LocalDateTime timestamp,
            int status,
            String error,
            String message,
            String path) {
        this(timestamp, status, error, message, path, null);
    }
}