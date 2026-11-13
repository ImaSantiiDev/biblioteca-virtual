<?php

class Router
{
    private array $rutas = [];

    
    public function agregar(string $metodo, string $ruta, callable $accion): void
    {
        $this->rutas[$metodo][$ruta] = $accion;
    }

    
    public function despachar(string $metodo, string $ruta): void
    {
        
        $ruta = '/' . trim($ruta, '/');

        if (isset($this->rutas[$metodo][$ruta])) {
            ($this->rutas[$metodo][$ruta])();
            return;
        }

        Respuesta::error('Ruta no encontrada', 404);
    }
}
