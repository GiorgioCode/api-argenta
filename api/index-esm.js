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
    const hayCamposSeleccionados = campos.some(c => c.selected);
    if (!hayCamposSeleccionados) {
      campos.forEach(campo => {
        if (['nombre', 'apellido', 'dni'].includes(campo.id)) {
          campo.selected = true;
        }
      });
    }

    // Generar los datos
    const data = generarMultiplesPersonas(cantidad, campos);
    
    // Enviar respuesta
    res.status(200).json({
      ok: true,
      data
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      error: 'Internal server error'
    });
  }
};

const PORT = process.env.PORT || 5174;
app.listen(PORT, () => {
  console.log(`API JSON ejecutándose en: https://api-argenta.vercel.app/`);
});
