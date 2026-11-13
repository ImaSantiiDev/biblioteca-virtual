<?php

class ArticuloModel
{
    public function __construct(private PDO $conexion) {}

    
    public function listar(): array
    {
        $sql = 'SELECT a.id_articulo, a.titulo, a.descripcion, a.imagen_url, a.disponible,
                       g.id_genero, g.nombre_genero, g.publico,
                       au.id_autor, au.nombre_autor
                FROM articulos a
                INNER JOIN generos g ON g.id_genero = a.id_genero
                INNER JOIN autores au ON au.id_autor = a.id_autor
                ORDER BY a.id_articulo';

        $consulta = $this->conexion->prepare($sql);
        $consulta->execute();

        return $consulta->fetchAll();
    }

    
    public function contar(): int
    {
        $consulta = $this->conexion->prepare('SELECT COUNT(*) FROM articulos');
        $consulta->execute();

        return (int) $consulta->fetchColumn();
    }
}
