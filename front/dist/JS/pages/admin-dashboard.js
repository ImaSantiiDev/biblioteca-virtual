

document.addEventListener('DOMContentLoaded', async () => {
    
    const respuesta = await API.get('/sesion');

    
    if (!respuesta.ok) {
        location.href = '../login.html';
        return;
    }

    
    const sesion = respuesta.datos;
    if (sesion.rol !== 'Administrador') {
        location.href = '../usuario/inicio.html';
        return;
    }

    
    document.getElementById('cargando').classList.add('d-none');
    document.getElementById('panelCompleto').classList.remove('d-none');
    document.getElementById('nombreUsuario').textContent = sesion.nombre;

    armarEventos();
    await cargarResumen();
    await cargarArticulos();
});

async function cargarResumen() {
    const respuesta = await API.get('/admin/resumen');

    if (!respuesta.ok) {
        mostrarAlerta(respuesta.mensaje);
        return;
    }

    document.getElementById('totalArticulos').textContent = respuesta.datos.articulos;
    document.getElementById('totalUsuarios').textContent = respuesta.datos.usuarios;
    document.getElementById('totalPrestamosActivos').textContent = respuesta.datos.prestamos_activos;
}

async function cargarArticulos() {
    const tabla = document.getElementById('tablaArticulos');
    const respuesta = await API.get('/admin/articulos');

    if (!respuesta.ok) {
        mostrarAlerta(respuesta.mensaje);
        return;
    }

    tabla.innerHTML = '';

    respuesta.datos.forEach(articulo => tabla.appendChild(crearFila(articulo)));
}

function crearFila(articulo) {
    const fila = document.createElement('tr');

    const celdaTitulo = document.createElement('td');
    celdaTitulo.className = 'fw-semibold';
    celdaTitulo.textContent = articulo.titulo;

    const celdaAutor = document.createElement('td');
    celdaAutor.textContent = articulo.nombre_autor;

    const celdaGenero = document.createElement('td');
    celdaGenero.textContent = articulo.nombre_genero;

    const disponible = Number(articulo.disponible) === 1;

    const celdaDisponibilidad = document.createElement('td');
    const etiqueta = document.createElement('span');
    etiqueta.className = disponible ? 'badge text-bg-success' : 'badge text-bg-secondary';
    etiqueta.textContent = disponible ? 'Disponible' : 'Prestado';
    celdaDisponibilidad.appendChild(etiqueta);

    fila.appendChild(celdaTitulo);
    fila.appendChild(celdaAutor);
    fila.appendChild(celdaGenero);
    fila.appendChild(celdaDisponibilidad);

    return fila;
}

function armarEventos() {
    const opciones = [
        { enlace: document.getElementById('navResumen'), seccion: document.getElementById('seccionResumen') },
        { enlace: document.getElementById('navArticulos'), seccion: document.getElementById('seccionArticulos') }
    ];

    opciones.forEach(opcion => {
        opcion.enlace.addEventListener('click', (evento) => {
            evento.preventDefault();

            opciones.forEach(otra => {
                otra.seccion.classList.add('d-none');
                otra.enlace.classList.remove('activo');
            });

            opcion.seccion.classList.remove('d-none');
            opcion.enlace.classList.add('activo');

            
            const menu = bootstrap.Offcanvas.getInstance(document.getElementById('menuLateral'));
            if (menu) {
                menu.hide();
            }
        });
    });

    
    document.getElementById('navSalir').addEventListener('click', cerrarSesion);
    document.getElementById('btnSalir').addEventListener('click', cerrarSesion);
}

async function cerrarSesion() {
    await API.post('/logout');
    location.href = '../login.html';
}

function mostrarAlerta(texto) {
    const alerta = document.getElementById('alertaPanel');
    alerta.textContent = texto || 'Error al comunicarse con la API';
    alerta.classList.remove('d-none');
}
