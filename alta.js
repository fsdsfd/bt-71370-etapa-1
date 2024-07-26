import './SASS/main.scss'
document.addEventListener('DOMContentLoaded',()=>{
    const url = 'http://localhost:7777/productos'
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

    async function getProductos(input) {
        try {
            const options = {
                method : 'POST',
                headers : {'content-type' : 'application/json '},
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
    form.addEventListener('submit',(e)=>{
        e.preventDefault()
        console.log(fotoInput.value)
        console.log(descripcionInput.value)
        console.log(precioInput.value)    
        const fotoName = form[0].name
        console.log(fotoName)
        const tituloName = form[1].name
        const descripcionName = form[2].name
        const precioName = form[3].name
        const resultado = validarFoto() === '' && validarTitulo() === '' && validarDescripcion() === '' && validarPrecio() === ''
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
            getProductos(producto)
        
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
