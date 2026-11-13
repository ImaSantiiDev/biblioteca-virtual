

const API = {
    
    urlBase: '/api',

    
    async pedir(ruta, opciones = {}) {
        try {
            const respuesta = await fetch(this.urlBase + ruta, opciones);

            let cuerpo = null;
            try {
                cuerpo = await respuesta.json();
            } catch (e) {
                cuerpo = null; 
            }

            if (!respuesta.ok || !cuerpo || cuerpo.status === 'error') {
                return {
                    ok: false,
                    codigo: respuesta.status,
                    mensaje: (cuerpo && cuerpo.message) ? cuerpo.message : 'No se pudo conectar con la API',
                    datos: cuerpo ? cuerpo.data : null
                };
            }

            return {
                ok: true,
                codigo: respuesta.status,
                mensaje: cuerpo.message,
                datos: cuerpo.data
            };
        } catch (e) {
            
            return { ok: false, codigo: 0, mensaje: 'No se pudo conectar con la API', datos: null };
        }
    },

    
    async get(ruta) {
        return this.pedir(ruta);
    },

    
    async post(ruta, cuerpo = {}) {
        return this.pedir(ruta, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cuerpo)
        });
    }
};
