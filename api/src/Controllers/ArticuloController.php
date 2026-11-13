<?php

class ArticuloController
{
    public function __construct(private ArticuloModel $articuloModel) {}

    
    public function listar(): void
    {
        $articulos = $this->articuloModel->listar();

        Respuesta::ok($articulos, 'Catálogo cargado');
    }
}
