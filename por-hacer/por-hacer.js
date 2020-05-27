const fs = require('fs');


let listadiPorHacer = [];

const guardarDB = () => {
  let data = JSON.stringify( listadiPorHacer );
  fs.writeFile(`db/data.json`, data, ( err ) => {
    if( err ) throw new Error('No se pudo grabar', err);
  })
}

const cargarDB = () => {
  try {
    listadiPorHacer = require('../db/data.json');
  } catch (error) {
    listadiPorHacer = [];
  }
}

const crear = (descripcion) => {

  cargarDB();

  let porHacer = {
    descripcion,
    completado: false
  }

  listadiPorHacer.push( porHacer );
  guardarDB();
  return porHacer;
}

const getListado = () => {
  cargarDB();
  return listadiPorHacer;
}

const actulizar = ( descripcion, completado = true ) => {
 cargarDB();
 let index = listadiPorHacer.findIndex( tarea => tarea.descripcion === descripcion );

 if ( index >= 0 ) {
    listadiPorHacer[index].completado = completado;
    guardarDB();
    return true;
 } else {
   return false;
 }
}

const borrar = ( descripcion ) => {
  cargarDB();
  let nuevoListado = listadiPorHacer.filter( tarea => tarea.descripcion !== descripcion);

  if ( listadiPorHacer.length === nuevoListado ) {
    return false;
  } else {
    listadiPorHacer = nuevoListado;
    guardarDB();
    return true;
  }
}

module.exports = {
  crear,
  getListado,
  actulizar,
  borrar
}