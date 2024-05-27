import { resolve } from "node:path";

export default{
    server:{ // opcional
        port:9999
    },
    css:{
        devSourceMap: true,
    },
    build:{
        emptyOutDir: true,
        rollupOptions:{
            input: {
                alta: resolve('views/alta.html'),
                carrito: resolve('views/carrito.html'),
                contacto: resolve('views/contacto.html'),
                nosotros: resolve('views/nosotros.html'),
                inicio: resolve('index.html') // el resolve devuelve la ruta completa
            }
        }
    }
}