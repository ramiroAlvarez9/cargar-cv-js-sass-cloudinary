export let db;


export function crearBase() {

    const creacionBase = window.indexedDB.open('cv', 1);

    creacionBase.onsuccess= function () {

        console.log('OK');

        db = creacionBase.result;

    }


    creacionBase.onupgradeneeded = function(e) {

        const activacionBase = e.target.result;

        const almacenamiento = activacionBase.createObjectStore('cv', {
            keyPath: 'cv',
            autoIncrement: true




        });

        //informacion a agregar
        almacenamiento.createIndex('nombre', 'nombre',{unique: false});
        almacenamiento.createIndex('foto', 'foto',{unique: true});
        almacenamiento.createIndex('apellido', 'apellido',{unique: false});
        almacenamiento.createIndex('nacionalidad', 'nacionalidad',{unique: false}); 
        almacenamiento.createIndex('estadocivil', 'estadocivil',{unique: false});
        almacenamiento.createIndex('documento', 'documento',{unique: true});
        almacenamiento.createIndex('celular', 'celular',{unique: false}); 
        almacenamiento.createIndex('mail', 'mail',{unique: true});
        almacenamiento.createIndex('direccion', 'direccion',{unique: true});
        almacenamiento.createIndex('experiencia', 'experiencia',{unique: false});
        almacenamiento.createIndex('educacion', 'educacion',{unique: false});
        

    }

}
