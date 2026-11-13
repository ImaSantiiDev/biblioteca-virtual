<?php

declare(strict_types=1);

session_set_cookie_params([
    'lifetime' => 0,
    'path' => '/',
    'httponly' => true,
    'samesite' => 'Lax',
]);
session_start();

require __DIR__ . '/autoload.php';
require __DIR__ . '/config/database.php';

EnvLoader::cargar(dirname(__DIR__) . '/.env');

try {
    $conexion = ConexionDB::conectar();
} catch (PDOException $e) {
    error_log('DB: ' . $e->getMessage());
    Respuesta::error('No se pudo conectar con la base de datos', 500);
}

$router = new Router();
require __DIR__ . '/routes.php';

try {
    $metodo = $_SERVER['REQUEST_METHOD'];
    $ruta = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?? '/';
    $router->despachar($metodo, $ruta);
} catch (Throwable $e) {
    error_log($e->getMessage());
    Respuesta::error('Error interno del servidor', 500);
}
