# Glosario de datos

Entidad: ROLES
Tipo entidad: Maestra
Se almacenan los roles del sistema (Administrador y Usuario), que definen los permisos de cada cuenta.
(id_rol (int ai), nombre_rol VARCHAR(30))

Entidad: USUARIOS
Tipo entidad: Subordinada (roles)
Se almacenan los datos de acceso al sistema y el rol de cada usuario.
(id_usuario (int ai), nombre_usuario VARCHAR(60), email VARCHAR(100), password_hash VARCHAR(255), fecha_alta DATETIME, id_rol (int FK ROLES:id_rol))

Entidad: GENEROS
Tipo entidad: Maestra
Se almacenan los géneros que clasifican los artículos y el público al que apuntan (infantil o adultos).
(id_genero (int ai), nombre_genero VARCHAR(50), publico ENUM('infantil','adultos'))

Entidad: AUTORES
Tipo entidad: Maestra
Se almacenan los autores de los artículos de la biblioteca.
(id_autor (int ai), nombre_autor VARCHAR(100))

Entidad: ARTICULOS
Tipo entidad: Subordinada (generos, autores)
Se almacenan los artículos de la biblioteca con su título, descripción, imagen y disponibilidad.
(id_articulo (int ai), titulo VARCHAR(150), descripcion TEXT null, imagen_url VARCHAR(255) null, disponible TINYINT(1), id_genero (int FK GENEROS:id_genero), id_autor (int FK AUTORES:id_autor))

Entidad: PRESTAMOS
Tipo entidad: Subordinada (usuarios, articulos)
Se registran los préstamos de artículos: la fecha de préstamo, la fecha de devolución y el estado de cada uno.
(id_prestamo (int ai), fecha_prestamo DATE, fecha_devolucion DATE null, estado ENUM('activo','devuelto'), id_usuario (int FK USUARIOS:id_usuario), id_articulo (int FK ARTICULOS:id_articulo))
