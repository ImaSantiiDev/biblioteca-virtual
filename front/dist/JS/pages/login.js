

document.addEventListener('DOMContentLoaded', async () => {
    
    const previa = await API.get('/sesion');
    if (previa.ok) {
        redirigirPorRol(previa.datos.rol);
        return;
    }

    const form = document.getElementById('formLogin');
    const mensaje = document.getElementById('mensajeError');

    form.addEventListener('submit', async (evento) => {
        evento.preventDefault();
        ocultarError();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        
        if (email === '' || password === '') {
            mostrarError('Completá el correo y la contraseña');
            return;
        }

        const boton = document.getElementById('btnIngresar');
        boton.disabled = true;
        boton.textContent = 'Ingresando...';

        const respuesta = await API.post('/login', { email: email, password: password });

        boton.disabled = false;
        boton.textContent = 'Ingresar';

        if (!respuesta.ok) {
            mostrarError(respuesta.mensaje || 'Correo o contraseña incorrectos');
            return;
        }

        redirigirPorRol(respuesta.datos.rol);
    });

    
    function mostrarError(texto) {
        mensaje.textContent = texto;
        mensaje.classList.remove('d-none');
    }

    function ocultarError() {
        mensaje.classList.add('d-none');
    }
});

function redirigirPorRol(rol) {
    location.href = rol === 'Administrador'
        ? 'admin/dashboard.html'
        : 'usuario/inicio.html';
}
