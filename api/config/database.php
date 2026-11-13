<?php

class ConexionDB
{
    
    public static function conectar(): PDO
    {
        $host = getenv('DB_HOST') ?: 'db';
        $puerto = getenv('DB_PORT') ?: '3306';
        $base = getenv('DB_NAME') ?: 'biblioteca_virtual';
        $usuario = getenv('DB_USER') ?: 'biblioteca_user';
        $clave = getenv('DB_PASSWORD') ?: 'biblioteca_pass';

        $dsn = "mysql:host=$host;port=$puerto;dbname=$base;charset=utf8mb4";

        $opciones = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,      
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, 
        ];

        return new PDO($dsn, $usuario, $clave, $opciones);
    }
}
