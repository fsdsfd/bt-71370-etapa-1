import './SASS/main.scss'
document.addEventListener('DOMContentLoaded',()=>{
    const url = 'http://localhost:7777/productos/'
    const form = document.querySelector('#form')
    const boton = document.querySelector('#boton')
    const fotoError = document.querySelector('[data-error="foto-error"]')
    const nombreError = document.querySelector('[data-error="nombre-error"]')
    const descripcionError = document.querySelector('[data-error="descripcion-error"]')
    const precioError = document.querySelector('[data-error="precio-error"]')
    const fotoInput = document.getElementById('foto')
    const tituloInput = document.getElementById('nombre')
    const descripcionInput = document.getElementById('descripcion')
    const precioInput = document.getElementById('precio')
    const contenedorProductos = document.querySelector('#contenedor-productos')
    const fotoName = form[0].name
    const tituloName = form[1].name
    const descripcionName = form[2].name
    const precioName = form[3].name
    const enviarEditBoton = document.createElement('button')
    enviarEditBoton.textContent = 'Editar'
    enviarEditBoton.style.visibility = 'hidden'
    form.appendChild(enviarEditBoton)
    function validarFoto() {
        if (fotoInput.value === '') {
            debugger
            fotoError.textContent = 'Complete este campo'
            return fotoError.textContent
        }else{
            fotoError.textContent === ''
            return fotoError.textContent
        }
    }
     function validarTitulo() {
         if (tituloInput.value.trim() === '') {
            nombreError.textContent = 'Complete este campo' 
            return nombreError.textContent
        }else{
            nombreError.textContent === ''
            return nombreError.textContent
         }
     }
     function validarDescripcion() {
        if (descripcionInput.value.trim() === '') {
            descripcionError.textContent = 'Complete este campo'
            return descripcionError.textContent
        }else{
            descripcionError.textContent === ''
            return descripcionError.textContent
        }
     }
     function validarPrecio() {
        if (precioInput.value.trim() === '') {
            
            precioError.textContent = 'Complete este campo'
            return precioError.textContent
        }else{
            
            precioError.textContent === ''
            return precioError.textContent
        }
     }

    async function createProductos(input) {
        try {
            const options = {
                method : 'POST',
                headers : {'content-type' : 'application/json'},
                body : JSON.stringify(input)
            }
           const respuesta = await fetch(url, options)
           if (!respuesta.ok) {
            throw new Error('Error al enviar la url', respuesta.status)
           }
           const data = await respuesta.json()
           console.log(data)
        } catch (error) {
            console.log('getProductos', error)
        }
    }
    const editarProducto = async (id, productoEditar)=>{
        try {
        const options = {
            method : 'PUT',
            headers : {'content-type' : 'application/json'},
            body : JSON.stringify(productoEditar)
        }
            const urlEditar = url + id
            const respuesta = await fetch(urlEditar, options)
            
            if (!respuesta.ok) {
                throw new Error('Error al mandar el producto')
            }
            const data = await respuesta.json()
            console.log(data)
        } catch (error) {
            console.log('editarProducto', error)
        }

    }
    const eliminarProducto = async (id)=> {
        try {
            const options = {
                method : 'DELETE'
            }
            const productoDelete = url + id
            const respuesta = await fetch(productoDelete, options)
            if (!respuesta.ok) {
                throw new Error('El producto no se pudo enviar a eliminar', respuesta.status)
            }
            const data = await respuesta.json()
            console.log(data.id)
        } catch (error) {
            console.log('eliminarProducto', error)
        }


    }
    const getAllProducts = async ()=>{
        try {
            const respuesta = await fetch(url)
            if (!respuesta) {
                throw new Error('Error al enviar los productos', respuesta.status)
            }
            const data = await respuesta.json()
            console.log(data)
            data.forEach(producto => {
                const h3 = document.createElement('h3')
                h3.textContent = producto.nombre
                contenedorProductos.appendChild(h3)
                h3.classList.add('h3-productos')
                const divBotones = document.createElement('div')
                divBotones.classList.add('container-botones')
                const deleteBoton = document.createElement('button')
                const editarBoton = document.createElement('button')
                deleteBoton.textContent = 'Eliminar'
                deleteBoton.addEventListener('click',()=>{
                    eliminarProducto(producto.id)
                    debugger
                    console.log(producto.id)
                })
                editarBoton.textContent = 'Editar'
                editarBoton.classList.add('container-botones__boton')
                deleteBoton.classList.add('container-botones__boton')
                editarBoton.addEventListener('click',()=>{
                    tituloInput.value = producto.nombre
                    descripcionInput.value = producto.descripcion
                    precioInput.value = producto.precio
                    enviarEditBoton.style.visibility = 'visible'
                    enviarEditBoton.addEventListener('click',()=>{
                        const resultadoEditado = validarTitulo() === '' && validarDescripcion() === '' && validarPrecio() === ''
                        console.log(producto.id)
                        if (resultadoEditado) {
                            console.log()
                            console.log('Los inputs tienen información, se puede enviar la data')
                            const productoEditado = {
                                [fotoName] : fotoInput.value.trim(),
                                [tituloName] : tituloInput.value.trim(),
                                [descripcionName] : descripcionInput.value.trim(),
                                [precioName] : precioInput.value.trim()
                            }
                        editarProducto(producto.id, productoEditado)
                        debugger
                        
                    }else{
                            console.log('Los inputs no tienen información')
                        }
                    })
                })

                contenedorProductos.appendChild(divBotones)
                divBotones.appendChild(deleteBoton)
                divBotones.appendChild(editarBoton)
                
            });

        } catch (error) {
            console.log('GetAllProducts', error)
        }
    }
    getAllProducts()
    boton.addEventListener('click',()=>{
        console.log(fotoInput.value)
        console.log(descripcionInput.value)
        console.log(precioInput.value)    
        const resultado = validarTitulo() === '' && validarDescripcion() === '' && validarPrecio() === ''
        if (resultado) {
            debugger
            console.log()
            console.log('Los inputs tienen información, se puede enviar la data')
            const producto = {
                [tituloName] : tituloInput.value.trim(),
                [fotoName] : fotoInput.value.trim(),
                [descripcionName] : descripcionInput.value.trim(),
                [precioName] : precioInput.value.trim()
            }
            createProductos(producto)
            const h3 = document.createElement('h3')
            h3.textContent = tituloInput.value.trim() 
        }else{
            debugger
            console.log('Los inputs no tienen información')
        }

    
    })
    tituloInput.addEventListener('input',()=>validarTitulo())
    descripcionInput.addEventListener('input', ()=> validarDescripcion())
    precioInput.addEventListener('input', ()=> validarPrecio())
    fotoInput.addEventListener('input', ()=> validarFoto())

})
