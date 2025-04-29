// server.js - Servidor Express para servir la aplicación React y la API JSON
const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

// Cargar los módulos ESM de forma dinámica (necesario porque utilizamos import/export en nuestros archivos TS)
async function createServer() {
  // Importar nuestros generadores de datos
  const { camposDisponibles, generarMultiplesPersonas } = await import('./dist/utils/mockDataGenerator.js');
  
  const app = express();
  const PORT = process.env.PORT || 3000;

  // Habilitar CORS
  app.use(cors());

  // Servir archivos estáticos de la aplicación de React
  app.use(express.static(path.join(__dirname, 'dist')));

  // API Endpoint para generar mockup data
  app.get('/api', (req, res) => {
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

  // Para cualquier otra ruta, servir la aplicación React
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });

  // Iniciar el servidor
  app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    console.log(`API disponible en http://localhost:${PORT}/api`);
  });
}

// Ejecutar la función asíncrona principal
createServer().catch(err => {
  console.error('Error al iniciar el servidor:', err);
});
