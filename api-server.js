// api-server.js - Servidor Express minimalista para la API JSON
import express from 'express';
import cors from 'cors';
import { camposDisponibles, generarMultiplesPersonas } from './src/utils/mockDataGenerator.js';

const app = express();
const PORT = process.env.PORT || 5176; // Puerto diferente del servidor de desarrollo de Vite

// Habilitar CORS para permitir llamadas desde cualquier origen
app.use(cors());

// Endpoint único para generar datos mockup
app.get('/mockup', (req, res) => {
  // Obtener parámetros de la consulta
  const cantidad = Math.min(Math.max(parseInt(req.query.cantidad || req.query.quantity || '10', 10), 1), 1000);
  
  const fieldsParam = req.query.fields;
  const allFields = req.query.allFields === 'true' || req.query.allFields === '1';
  
  let fieldIds = [];
  if (fieldsParam) {
    fieldIds = fieldsParam.split(',');
  }
  
  // Preparar los campos seleccionados
  const fields = camposDisponibles.map(field => ({
    ...field,
    selected: allFields || (fieldIds.length > 0 && fieldIds.includes(field.id))
  }));
  
  // Asegurarse de que al menos un campo esté seleccionado
  const tieneSeleccionados = fields.some(field => field.selected);
  if (!tieneSeleccionados) {
    const defaultFields = ['nombre', 'apellido', 'dni'];
    fields.forEach(field => {
      if (defaultFields.includes(field.id)) {
        field.selected = true;
      }
    });
  }
  
  // Generar los datos
  const data = generarMultiplesPersonas(cantidad, fields);
  
  // Verificar si se debe descargar como archivo
  const download = req.query.download === 'true' || req.query.download === '1';
  
  if (download) {
    res.setHeader('Content-Disposition', 'attachment; filename=mockup-data.json');
  }
  
  // Devolver como JSON puro
  res.setHeader('Content-Type', 'application/json');
  res.json(data);
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`API JSON ejecutándose en http://localhost:${PORT}/mockup`);
  console.log('Parámetros disponibles:');
  console.log('- cantidad o quantity: Número de registros (1-1000)');
  console.log('- fields: Lista de campos separados por comas');
  console.log('- allFields=true: Seleccionar todos los campos');
  console.log('- download=true: Descargar como archivo');
  console.log('Ejemplo: http://localhost:' + PORT + '/mockup?cantidad=5&fields=nombre,apellido,dni');
});
