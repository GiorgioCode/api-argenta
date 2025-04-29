// api.js - Endpoint de API para el generador de mockups
import { camposDisponibles, generarMultiplesPersonas } from '../src/utils/mockDataGenerator.js';

// Obtener los parámetros de la URL
const url = new URL(window.location.href);
const params = url.searchParams;

// Cantidad de registros (por defecto: 10, máximo: 1000)
let cantidad = parseInt(params.get('cantidad') || params.get('quantity') || '10', 10);
cantidad = Math.min(Math.max(cantidad, 1), 1000);

// Determinar los campos a incluir
let fieldIds = [];
const fieldsParam = params.get('fields');
const allFields = params.get('allFields') === 'true' || params.get('allFields') === '1';

if (fieldsParam) {
  fieldIds = fieldsParam.split(',');
}

// Preparar los campos seleccionados
const fields = camposDisponibles.map(field => ({
  ...field,
  selected: allFields || fieldIds.includes(field.id)
}));

// Asegurarnos de que al menos un campo esté seleccionado
const tieneSeleccionados = fields.some(field => field.selected);
if (!tieneSeleccionados) {
  // Si no hay campos seleccionados, seleccionar algunos por defecto
  fields.forEach(field => {
    if (['nombre', 'apellido', 'dni'].includes(field.id)) {
      field.selected = true;
    }
  });
}

// Generar los datos
const data = generarMultiplesPersonas(cantidad, fields);

// Establecer las cabeceras para JSON
document.body.style.display = 'none';

// Devolver el JSON
const jsonResponse = JSON.stringify(data, null, 2);
document.write(jsonResponse);
document.contentType = 'application/json';

// Establecer headers para JSON
const meta = document.createElement('meta');
meta.httpEquiv = 'Content-Type';
meta.content = 'application/json; charset=utf-8';
document.head.appendChild(meta);
