# Pasaje a tablas

```
ROLES( id_rol (PK), nombre_rol VARCHAR(30))
USUARIOS( id_usuario (PK), nombre_usuario VARCHAR(60), email VARCHAR(100), password_hash VARCHAR(255), fecha_alta DATETIME, id_rol (FK))
GENEROS( id_genero (PK), nombre_genero VARCHAR(50), publico ENUM('infantil','adultos'))
AUTORES( id_autor (PK), nombre_autor VARCHAR(100))
ARTICULOS( id_articulo (PK), titulo VARCHAR(150), descripcion TEXT, imagen_url VARCHAR(255), disponible TINYINT(1), id_genero (FK), id_autor (FK))
PRESTAMOS( id_prestamo (PK), fecha_prestamo DATE, fecha_devolucion DATE, estado ENUM('activo','devuelto'), id_usuario (FK), id_articulo (FK))
```
