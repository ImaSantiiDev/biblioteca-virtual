<?php

class EnvLoader
{
    public static function cargar(string $rutaArchivo): void
    {
        if (!is_file($rutaArchivo)) {
            return; 
        }

        $lineas = file($rutaArchivo, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

        foreach ($lineas as $linea) {
            $linea = trim($linea);

            
            if ($linea === '' || str_starts_with($linea, '#') || !str_contains($linea, '=')) {
                continue;
            }

            [$clave, $valor] = explode('=', $linea, 2);

            $clave = trim($clave);
            $valor = trim($valor);

            if ($clave !== '' && getenv($clave) === false) {
                putenv("$clave=$valor");
            }
        }
    }
}
