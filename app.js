// const argv = require('yargs').argv;
const argv = require( './config/yargs' ).argv;
var colors = require( 'colors' );

const porHacer = require('./por-hacer/por-hacer');

let comando = argv._[0];

switch ( comando) {
  case 'crear':
    let tarea = porHacer.crear( argv.descripcion );
    break;

  case 'listar':
    let listado =  porHacer.getListado();

    for( let tarea of listado ) {
      console.log('=========== Por Hacer ========='.green);
      console.log( tarea.descripcion );
      console.log( 'Estado:', tarea.completado );
      console.log( '==============================='.green);
    }
    break;

  case 'actualizar':
    let actualizado = porHacer.actulizar( argv.descripcion, argv.completado );
    console.log( actualizado );
    break;

  case 'borrar':
    let borrado = porHacer.borrar( argv.descripcion );
    console.log(borrado);
    break;

  default:
    console.log( 'Comando no es reconocido' );
    break;
}