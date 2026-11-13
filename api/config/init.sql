

SET NAMES utf8mb4;

CREATE DATABASE IF NOT EXISTS biblioteca_virtual
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE biblioteca_virtual;

CREATE TABLE roles (
  id_rol INT NOT NULL AUTO_INCREMENT,
  nombre_rol VARCHAR(30) NOT NULL,
  PRIMARY KEY (id_rol),
  UNIQUE KEY uq_rol_nombre (nombre_rol)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE usuarios (
  id_usuario INT NOT NULL AUTO_INCREMENT,
  nombre_usuario VARCHAR(60) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  fecha_alta DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  id_rol INT NOT NULL,
  PRIMARY KEY (id_usuario),
  UNIQUE KEY uq_usuario_email (email),
  CONSTRAINT fk_usuario_rol FOREIGN KEY (id_rol) REFERENCES roles (id_rol)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE generos (
  id_genero INT NOT NULL AUTO_INCREMENT,
  nombre_genero VARCHAR(50) NOT NULL,
  publico ENUM('infantil','adultos') NOT NULL,
  PRIMARY KEY (id_genero),
  UNIQUE KEY uq_genero_nombre (nombre_genero)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE autores (
  id_autor INT NOT NULL AUTO_INCREMENT,
  nombre_autor VARCHAR(100) NOT NULL,
  PRIMARY KEY (id_autor)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE articulos (
  id_articulo INT NOT NULL AUTO_INCREMENT,
  titulo VARCHAR(150) NOT NULL,
  descripcion TEXT NULL,
  imagen_url VARCHAR(255) NULL,
  disponible TINYINT(1) NOT NULL DEFAULT 1,
  id_genero INT NOT NULL,
  id_autor INT NOT NULL,
  PRIMARY KEY (id_articulo),
  CONSTRAINT fk_articulo_genero FOREIGN KEY (id_genero) REFERENCES generos (id_genero),
  CONSTRAINT fk_articulo_autor FOREIGN KEY (id_autor) REFERENCES autores (id_autor)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE prestamos (
  id_prestamo INT NOT NULL AUTO_INCREMENT,
  fecha_prestamo DATE NOT NULL,
  fecha_devolucion DATE NULL,
  estado ENUM('activo','devuelto') NOT NULL DEFAULT 'activo',
  id_usuario INT NOT NULL,
  id_articulo INT NOT NULL,
  PRIMARY KEY (id_prestamo),
  CONSTRAINT fk_prestamo_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario),
  CONSTRAINT fk_prestamo_articulo FOREIGN KEY (id_articulo) REFERENCES articulos (id_articulo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO roles (id_rol, nombre_rol) VALUES
(1, 'Administrador'),
(2, 'Usuario');

INSERT INTO usuarios (id_usuario, nombre_usuario, email, password_hash, id_rol) VALUES
(1, 'Santiago Fiore', 'admin@biblioteca.com', '$2y$12$bnLBWyi6Mw.mYdK81wq6ROATZPte9a6WJN3LABHJ3ze92UiS9z3sC', 1),
(2, 'Usuario de Prueba', 'usuario@biblioteca.com', '$2y$12$/o/ltzpEaBvjIcnI2/u8XOqRHefDtSVkmL1AuEbPvxABXW/KUlexa', 2);

INSERT INTO generos (id_genero, nombre_genero, publico) VALUES
(1, 'Infantil', 'infantil'),
(2, 'Finanzas', 'adultos'),
(3, 'Novela', 'adultos'),
(4, 'Fantasía', 'adultos'),
(5, 'Ciencia Ficción', 'adultos');

INSERT INTO autores (id_autor, nombre_autor) VALUES
(1, 'Antoine de Saint-Exupéry'),
(2, 'Carlo Collodi'),
(3, 'Robert Kiyosaki'),
(4, 'Gabriel García Márquez'),
(5, 'J. R. R. Tolkien'),
(6, 'George Orwell');

INSERT INTO articulos (id_articulo, titulo, descripcion, imagen_url, disponible, id_genero, id_autor) VALUES
(1, 'El Principito', 'Un aviador perdido en el desierto conoce a un pequeño príncipe que viene de otro planeta.', 'https://http2.mlstatic.com/D_NQ_NP_796748-MLA84578398119_052025-O.webp', 1, 1, 1),
(2, 'Pinocho', 'Las aventuras de un muñeco de madera que sueña con convertirse en un niño de verdad.', 'https://http2.mlstatic.com/D_NQ_NP_924418-MLA79664655017_092024-O.webp', 1, 1, 2),
(3, 'Padre rico Padre pobre', 'Lecciones de educación financiera a través de dos formas distintas de ver el dinero.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvU-pNZ6dUr6kqdk9u2vV85u4k5wOKkXZfairXNs7u8A&s=10', 1, 2, 3),
(4, 'Cien años de soledad', 'La historia de la familia Buendía a lo largo de siete generaciones en Macondo.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbp_vu9zXRCDMiWx8OIzwaerH97vyL0QnXjPF_64_MHaMfcJHoKg52Zswf&s=10', 0, 3, 4),
(5, 'El Señor de los Anillos', 'Frodo emprende un viaje para destruir el Anillo Único y salvar la Tierra Media.', 'https://m.media-amazon.com/images/I/71hf29TU8LL._AC_UF894,1000_QL80_.jpg', 1, 4, 5),
(6, '1984', 'Winston Smith lucha por conservar su libertad en un Estado que lo controla todo.', 'https://m.media-amazon.com/images/I/61kjuGfZyML._AC_UF1000,1000_QL80_.jpg', 0, 5, 6);

INSERT INTO prestamos (fecha_prestamo, fecha_devolucion, estado, id_usuario, id_articulo) VALUES
('2026-10-05', '2026-10-26', 'devuelto', 2, 1),
('2026-10-30', NULL, 'activo', 2, 6),
('2026-11-08', NULL, 'activo', 2, 4);
