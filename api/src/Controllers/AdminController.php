<?php

class AdminController
{
    public function __construct(
        private ArticuloModel $articuloModel,
        private UsuarioModel $usuarioModel,
        private PrestamoModel $prestamoModel
    ) {}

    
    public function resumen(): void
    {
        AuthController::exigirAdmin();

        Respuesta::ok([
            'articulos' => $this->articuloModel->contar(),
            'usuarios' => $this->usuarioModel->contar(),
            'prestamos_activos' => $this->prestamoModel->contarActivos(),
        ], 'Resumen del panel');
    }

    
    public function articulos(): void
    {
        AuthController::exigirAdmin();

        $articulos = $this->articuloModel->listar();

        Respuesta::ok($articulos, 'Artículos del panel');
    }
}
