

document.addEventListener('DOMContentLoaded', () => {
    armarSesion();
    cargarCatalogo();
    armarFiltros();
    armarBotonLeer();
});

let articulos = []; 

async function cargarCatalogo() {
    const catalogo = document.getElementById('catalogoLibros');
    const respuesta = await API.get('/articulos');

    
    if (!respuesta.ok) {
        catalogo.innerHTML = '';
        catalogo.appendChild(crearAvisoCatalogo());
        return;
    }

    articulos = respuesta.datos;
    dibujarTarjetas(articulos);
}

function crearAvisoCatalogo() {
    const columna = document.createElement('div');
    columna.className = 'col-12';

    const aviso = document.createElement('div');
    aviso.className = 'alert alert-warning text-center mb-0';
    aviso.textContent = 'No pudimos cargar el catálogo en este momento. Probá de nuevo en unos minutos.';

    columna.appendChild(aviso);
    return columna;
}

function dibujarTarjetas(lista) {
    const catalogo = document.getElementById('catalogoLibros');
    catalogo.innerHTML = '';

    lista.forEach(articulo => catalogo.appendChild(crearTarjeta(articulo)));
}

function crearTarjeta(articulo) {
    const columna = document.createElement('div');
    columna.className = 'col-md-4 mb-4 tarjeta-col';
    columna.setAttribute('data-genero', articulo.publico);

    const tarjeta = document.createElement('div');
    tarjeta.className = 'tarjeta-libro';

    const contenedorFoto = document.createElement('div');
    contenedorFoto.className = 'contenedor-foto';

    const foto = document.createElement('img');
    foto.src = articulo.imagen_url || '';
    foto.alt = articulo.titulo;
    contenedorFoto.appendChild(foto);

    const info = document.createElement('div');
    info.className = 'info-libro';

    const titulo = document.createElement('h3');
    titulo.textContent = articulo.titulo;

    const genero = document.createElement('p');
    genero.textContent = articulo.nombre_genero;

    const botonLeer = document.createElement('button');
    botonLeer.className = 'btn-leer';
    botonLeer.textContent = 'Leer Ahora';

    info.appendChild(titulo);
    info.appendChild(genero);
    info.appendChild(botonLeer);

    tarjeta.appendChild(contenedorFoto);
    tarjeta.appendChild(info);
    columna.appendChild(tarjeta);

    return columna;
}

function armarFiltros() {
    const botones = document.querySelectorAll('.btn-filtro');

    botones.forEach(boton => {
        boton.addEventListener('click', () => {
            botones.forEach(otro => otro.classList.remove('active'));
            boton.classList.add('active');

            const filtro = boton.getAttribute('data-filtro');

            document.querySelectorAll('#catalogoLibros .tarjeta-col').forEach(tarjeta => {
                const generoTarjeta = tarjeta.getAttribute('data-genero');

                if (filtro === 'todos' || filtro === generoTarjeta) {
                    tarjeta.style.display = 'block';
                } else {
                    tarjeta.style.display = 'none';
                }
            });
        });
    });
}

function armarBotonLeer() {
    document.getElementById('catalogoLibros').addEventListener('click', evento => {
        if (evento.target.classList.contains('btn-leer')) {
            alert('Todavía no funciona esto, tranqui, próximamente');
        }
    });
}

async function armarSesion() {
    const zona = document.getElementById('zonaSesion');
    const respuesta = await API.get('/sesion');

    zona.innerHTML = '';

    
    if (!respuesta.ok) {
        const enlace = document.createElement('a');
        enlace.className = 'nav-link fw-bold';
        enlace.href = 'paginas/login.html';
        enlace.textContent = 'Ingresar';

        zona.appendChild(enlace);
        return;
    }

    const sesion = respuesta.datos;

    const saludo = document.createElement('span');
    saludo.className = 'nav-link d-inline';
    saludo.textContent = 'Hola, ' + sesion.nombre;

    const enlacePanel = document.createElement('a');
    enlacePanel.className = 'nav-link d-inline';
    enlacePanel.href = sesion.rol === 'Administrador'
        ? 'paginas/admin/dashboard.html'
        : 'paginas/usuario/inicio.html';
    enlacePanel.textContent = 'Mi panel';

    const botonSalir = document.createElement('button');
    botonSalir.className = 'btn btn-sm btn-outline-light';
    botonSalir.textContent = 'Cerrar sesión';
    botonSalir.addEventListener('click', cerrarSesion);

    zona.appendChild(saludo);
    zona.appendChild(enlacePanel);
    zona.appendChild(botonSalir);
}

async function cerrarSesion() {
    await API.post('/logout');
    armarSesion();
}
