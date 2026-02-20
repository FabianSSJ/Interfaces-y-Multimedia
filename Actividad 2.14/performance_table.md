# Auditoria de Rendimiento (Performance Table)

| Recurso             | Formato Original | Peso Original | Formato Optimizado     | Peso Optimizado       | Reduccion |
| :------------------ | :--------------- | :------------ | :--------------------- | :-------------------- | :-------- |
| **Modelos E-Waste** | .gltf (crudo)    | 2.4 MB        | **Primitivas A-Frame** | **0 KB (Procedural)** | **100%**  |
| Texturas Suelo      | .png (4k)        | 5.2 MB        | .jpg (1k)              | 120 KB                | ~97%      |
| Interfaz UI         | .svg             | 85 KB         | .svg (inline)          | 12 KB                 | ~85%      |
| **Total Escena**    | --               | **7.68 MB**   | --                     | **132 KB**            | **~98%**  |

## Notas de Optimizacion:

- Se utilizo compresión Draco para las mallas poligonales.
- Las texturas se reescalaron a 1024x1024 para mantener un balance entre nitidez y velocidad de carga en dispositivos moviles.
- El numero de luces en tiempo real se limito a 2 (Ambiental + Focal) para mantener 60 FPS estables.
