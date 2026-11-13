<?php

$usuarioModel = new UsuarioModel($conexion);
$articuloModel = new ArticuloModel($conexion);
$prestamoModel = new PrestamoModel($conexion);

$auth = new AuthController($usuarioModel);
$articulos = new ArticuloController($articuloModel);
$admin = new AdminController($articuloModel, $usuarioModel, $prestamoModel);

$router->agregar('GET', '/api/estado', function () {
    Respuesta::ok(['aplicacion' => 'Biblioteca Virtual', 'hora' => date('Y-m-d H:i:s')], 'API en línea');
});

$router->agregar('POST', '/api/login', [$auth, 'login']);
$router->agregar('GET', '/api/sesion', [$auth, 'sesion']);
$router->agregar('POST', '/api/logout', [$auth, 'logout']);

$router->agregar('GET', '/api/articulos', [$articulos, 'listar']);

$router->agregar('GET', '/api/admin/resumen', [$admin, 'resumen']);
$router->agregar('GET', '/api/admin/articulos', [$admin, 'articulos']);
