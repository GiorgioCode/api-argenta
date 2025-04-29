// api/index.js - Función serverless para Vercel

import {
  camposDisponibles,
  generarMultiplesPersonas,
  nombres,
  apellidos,
  provincias,
  vehiculos,
  calles,
  dnisGenerados
} from './mockup-generator.js';

// Función principal para la API serverless de Vercel
export default (req, res) => {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Manejar preflight CORS
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Solo responder a solicitudes GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Obtener parámetros
    const { query } = req;
    const cantidad = Math.min(Math.max(parseInt(query.cantidad || query.quantity || '10', 10), 1), 1000);
    
    const fieldsParam = query.fields;
    const allFields = query.allFields === 'true' || query.allFields === '1';
    
    // Preparar los campos seleccionados
    const campos = camposDisponibles.map(campo => ({
      ...campo,
      selected: allFields || (fieldsParam && fieldsParam.split(',').includes(campo.id))
    }));
    
    // Si no hay campos seleccionados, seleccionar algunos por defecto
    if (!campos.some(c => c.selected)) {
      ['nombre', 'apellido', 'dni'].forEach(id => {
        const campo = campos.find(c => c.id === id);
        if (campo) campo.selected = true;
      });
    }
    
    // Generar datos
    dnisGenerados.clear(); // Limpiar DNIs generados para evitar colisiones
    const data = generarMultiplesPersonas(cantidad, campos);
    
    // Establecer headers para descarga si es necesario
    if (query.download === 'true' || query.download === '1') {
      res.setHeader('Content-Disposition', 'attachment; filename=mockup-data.json');
    }
    
    // Responder con JSON
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(data);
  } catch (error) {
    console.error('Error en la API:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
