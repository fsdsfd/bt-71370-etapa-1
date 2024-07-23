import './SASS/main.scss'
const url = 'http://localhost:7777/productos'
const form = document.querySelector('#form')
const boton = document.querySelector('#boton')
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
form.addEventListener('submit',()=>{
    
    const fotoInput = form[0].value
    const fotoName = form[0].name
    console.log(fotoName)
    const tituloInput = form[1].value
    const tituloName = form[1].name
    const descripcionInput = form[2].value
    const descripcionName = form[2].name
    const precioInput = form[3].value
    const precioName = form[3].name

    const producto = {
        [tituloName] : tituloInput,
        [fotoName] : fotoInput,
        [descripcionName] : descripcionInput,
        [precioName] : precioInput
    }
    getProductos(producto)
})
console.log('hola')