<?php

class AuthController
{
    public function __construct(private UsuarioModel $usuarioModel) {}

    
    public function login(): void
    {
        $entrada = json_decode((string) file_get_contents('php://input'), true) ?? [];

        $email = trim((string) ($entrada['email'] ?? ''));
        $password = (string) ($entrada['password'] ?? '');

        
        if ($email === '' || $password === '') {
            Respuesta::error('Faltan el correo o la contraseña', 400);
        }

        $usuario = $this->usuarioModel->buscarPorEmail($email);

        
        if ($usuario === null || !password_verify($password, $usuario['password_hash'])) {
            Respuesta::error('Correo o contraseña incorrectos', 401);
        }

        
        session_regenerate_id(true);

        $_SESSION['id'] = (int) $usuario['id_usuario'];
        $_SESSION['nombre'] = $usuario['nombre_usuario'];
        $_SESSION['email'] = $usuario['email'];
        $_SESSION['rol'] = $usuario['nombre_rol'];

        Respuesta::ok([
            'id' => $_SESSION['id'],
            'nombre' => $_SESSION['nombre'],
            'email' => $_SESSION['email'],
            'rol' => $_SESSION['rol'],
        ], 'Ingreso correcto');
    }

    
    public function sesion(): void
    {
        if (empty($_SESSION['id'])) {
            Respuesta::error('No hay sesión activa', 401);
        }

        Respuesta::ok([
            'id' => $_SESSION['id'],
            'nombre' => $_SESSION['nombre'],
            'email' => $_SESSION['email'],
            'rol' => $_SESSION['rol'],
        ], 'Sesión activa');
    }

    
    public function logout(): void
    {
        $_SESSION = [];

        if (ini_get('session.use_cookies')) {
            $params = session_get_cookie_params();
            setcookie(session_name(), '', time() - 42000, $params['path'], $params['domain'], $params['secure'], $params['httponly']);
        }

        session_destroy();

        Respuesta::ok(null, 'Sesión cerrada');
    }

    
    
    public static function exigirAdmin(): void
    {
        if (empty($_SESSION['id'])) {
            Respuesta::error('No hay sesión activa', 401);
        }

        if (($_SESSION['rol'] ?? '') !== 'Administrador') {
            Respuesta::error('Se requiere rol Administrador', 403);
        }
    }
}
