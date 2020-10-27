import {db, crearBase} from './modules/indexdb.js';
import {foto,nombre,apellido, nacionalidad, estadoCivil, documento, celular, mail, direccion, experiencia, educacion} from './modules/arrays.js';





//CARGAR IMAGEN EN BASE DE DATOS CLOUDINARY

const imageUploader = document.querySelector('#imagen');
const cloudinary_url = 'https://api.cloudinary.com/v1_1/dbo3qnf6v/image/upload';
const cloudinary_preset = 't27scigf';
const imagenPerfil = document.querySelector('img');

imageUploader.addEventListener('change', async (e) =>{

    const archivo = e.target.files[0];
    
    const formData = new FormData();
    formData.append('file',archivo);
    formData.append('upload_preset',cloudinary_preset);
    
    const resultado = await axios.post(cloudinary_url, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
            

        }

    });
    
    const mostrarImagen = imagenPerfil.src= resultado.data.secure_url;
    foto.push(mostrarImagen);
});





//obtener datos de formulario y ejecutar transaccion a base de datos 
function obtenerInformacionTexto(){
    
    
  const informacion = document.querySelector('form');

  informacion.addEventListener('submit', (e) => {

        e.preventDefault();
      
        //selectores de ubicacion
        
        const nombreValue = document.querySelector('#nombre').value;
        const apellidoValue = document.querySelector('#apellido').value;
        const nacionalidadValue = document.querySelector('#nacionalidad').value;
        const estadoCivilValue = document.querySelector('#estadocivil').value;
        const documentoValue = document.querySelector('#documento').value;
        const celularValue = document.querySelector('#celular').value;
        const mailValue = document.querySelector('#mail').value;
        const direccionValue = document.querySelector('#direccion').value;
        const experienciaValue = document.querySelector('#experiencia').value;
        const educacionValue = document.querySelector('#educacion').value;
      
      
        //agregar value a los arrays
      
         nombre.push(nombreValue);
         apellido.push(apellidoValue);
         nacionalidad.push(nacionalidadValue);
         estadoCivil.push(estadoCivilValue);
         documento.push(documentoValue);
         celular.push(celularValue);
         mail.push(mailValue);
         direccion.push(direccionValue);
         experiencia.push(experienciaValue);
         educacion.push(educacionValue);
          
          
         //se ejecuta la transaccion despues de que las listas esten con algun   
         if (nacionalidad.length && estadoCivil.length && documento.length && celular.length && mail.length && direccion.length && experiencia.length && educacion.length >= 1) {
              crearCv();
          


         }
      
  });

}





function crearCv() {
    
    let transaction = db.transaction(["cv"], "readwrite");
    
    const almacenamiento = transaction.objectStore('cv');
    
    //objeto para base de datos
    const cvNuevo = {
       foto: foto,
       nombre: nombre,
       apellido: apellido, 
       nacionalidad: nacionalidad,
       estadocivil : estadoCivil,
       documento: documento,
       celular: celular,
       mail: mail,
       direccion: direccion,
       experiencia: experiencia,
       educacion: educacion


     }
    
    const agregar = almacenamiento.add(cvNuevo);
    
}




//ejecucion del programa 
document.addEventListener('DOMContentLoaded', () =>{

    crearBase();
    obtenerInformacionTexto();

});








