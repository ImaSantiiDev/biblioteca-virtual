

document.addEventListener('DOMContentLoaded', async () => {
    
    const respuesta = await API.get('/sesion');

    if (!respuesta.ok) {
        location.href = '../login.html';
        return;
    }

    const sesion = respuesta.datos;

    
    if (sesion.rol === 'Administrador') {
        location.href = '../admin/dashboard.html';
        return;
    }

    
    document.getElementById('contenidoUsuario').classList.remove('d-none');
    document.getElementById('nombreUsuario').textContent = sesion.nombre;

    
    const cargando = document.querySelector('body > div.d-flex');
    if (cargando) {
        cargando.remove();
    }

    document.getElementById('btnSalir').addEventListener('click', cerrarSesion);
});

async function cerrarSesion() {
    await API.post('/logout');
    location.href = '../login.html';
}
