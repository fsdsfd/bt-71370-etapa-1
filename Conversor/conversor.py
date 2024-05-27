from PIL import Image
import os

def convertir_a_webp(archivo_imagen):
    # Abre la imagen
    imagen = Image.open(archivo_imagen)
    
    # Obtiene el nombre del archivo y la extensión
    nombre, extension = os.path.splitext(archivo_imagen)
    
    # Guarda la imagen como .webp
    imagen.save(nombre + ".webp", "WEBP")
    print(f"La imagen {archivo_imagen} ha sido convertida a {nombre}.webp")

if __name__ == "__main__":
    # Ruta de la carpeta que contiene las imágenes
    carpeta_imagenes = "C:\Curso_Bootcamp_FullStack\Desafio_06\Web-retro\public"
    
    # Verifica si la ruta es válida y si la carpeta existe
    if os.path.isdir(carpeta_imagenes):
        # Recorre todos los archivos dentro de la carpeta
        for archivo in os.listdir(carpeta_imagenes):
            # Verifica si el archivo es una imagen
            if archivo.lower().endswith(('.png', '.jpg', '.jpeg', '.gif')):
                ruta_imagen = os.path.join(carpeta_imagenes, archivo)
                convertir_a_webp(ruta_imagen)
    else:
        print("La ruta especificada no es válida o la carpeta no existe.")
