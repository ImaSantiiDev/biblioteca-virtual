<?php

class PrestamoModel
{
    public function __construct(private PDO $conexion) {}

    
    public function contarActivos(): int
    {
        $consulta = $this->conexion->prepare("SELECT COUNT(*) FROM prestamos WHERE estado = 'activo'");
        $consulta->execute();

        return (int) $consulta->fetchColumn();
    }
}
