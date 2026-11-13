<?php

class UsuarioModel
{
    public function __construct(private PDO $conexion) {}

    
    public function buscarPorEmail(string $email): ?array
    {
        $sql = 'SELECT u.id_usuario, u.nombre_usuario, u.email, u.password_hash, r.nombre_rol
                FROM usuarios u
                INNER JOIN roles r ON r.id_rol = u.id_rol
                WHERE u.email = ?
                LIMIT 1';

        $consulta = $this->conexion->prepare($sql);
        $consulta->execute([$email]);
        $usuario = $consulta->fetch();

        return $usuario === false ? null : $usuario;
    }

    
    public function contar(): int
    {
        $consulta = $this->conexion->prepare('SELECT COUNT(*) FROM usuarios');
        $consulta->execute();

        return (int) $consulta->fetchColumn();
    }
}
