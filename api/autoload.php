<?php

spl_autoload_register(function (string $clase): void {
    $carpetas = ['Controllers', 'Models', 'Utils'];

    foreach ($carpetas as $carpeta) {
        $archivo = __DIR__ . '/src/' . $carpeta . '/' . $clase . '.php';

        if (file_exists($archivo)) {
            require $archivo;
            return;
        }
    }
});
