<?php

class Respuesta
{
    
    public static function ok(mixed $datos = null, string $mensaje = 'OK', int $codigo = 200): void
    {
        self::enviar(['status' => 'ok', 'message' => $mensaje, 'data' => $datos], $codigo);
    }

    
    public static function error(string $mensaje = 'Error', int $codigo = 400, mixed $datos = null): void
    {
        self::enviar(['status' => 'error', 'message' => $mensaje, 'data' => $datos], $codigo);
    }

    
    private static function enviar(array $cuerpo, int $codigo): void
    {
        http_response_code($codigo);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($cuerpo, JSON_UNESCAPED_UNICODE);
        exit;
    }
}
