// api-server-standalone.js - Servidor API JSON independiente
import express from 'express';
import cors from 'cors';
import fs from 'fs';

// Importamos los datos directamente del archivo
const argentiniaDataPath = new URL('./src/utils/argentinaData-standalone.js', import.meta.url);
const argentinaData = require(argentiniaDataPath);

// Extraemos los datos
const { nombres, apellidos, provincias, vehiculos, calles } = argentinaData;

const app = express();
const PORT = process.env.PORT || 5176;

// Habilitar CORS
app.use(cors());

// Constantes y utilidades
const camposDisponibles = [
  { id: 'nombre', name: 'nombre', label: 'Nombre', selected: false },
  { id: 'apellido', name: 'apellido', label: 'Apellido', selected: false },
  { id: 'dni', name: 'dni', label: 'DNI', selected: false },
  { id: 'edad', name: 'edad', label: 'Edad', selected: false },
  { id: 'domicilio', name: 'domicilio', label: 'Domicilio', selected: false },
  { id: 'ciudad', name: 'ciudad', label: 'Ciudad', selected: false },
  { id: 'partido', name: 'partido', label: 'Partido', selected: false },
  { id: 'provincia', name: 'provincia', label: 'Provincia', selected: false },
  { id: 'codigoPostal', name: 'codigoPostal', label: 'Código Postal', selected: false },
  { id: 'marcaVehiculo', name: 'marcaVehiculo', label: 'Marca Vehículo', selected: false },
  { id: 'modeloVehiculo', name: 'modeloVehiculo', label: 'Modelo Vehículo', selected: false },
  { id: 'patente', name: 'patente', label: 'Patente', selected: false },
];

// Set para almacenar DNIs generados y evitar duplicados
const dnisGenerados = new Set();

// Funciones de utilidad
const obtenerElementoAleatorio = (array) => {
  const indice = Math.floor(Math.random() * array.length);
  return array[indice];
};

const obtenerNumeroAleatorio = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Función para generar un DNI argentino correlacionado con la edad
const generarDNI = (edad) => {
  let num;
  let intentos = 0;
  const maxIntentos = 50;
  
  do {
    if (edad !== undefined) {
      const anioNacimiento = 2025 - edad;
      let dniBase;
      
      if (anioNacimiento >= 1970) {
        // Personas nacidas desde 1970 en adelante (menores de 55 años)
        const escala = (anioNacimiento - 1970) / (2025 - 1970); 
        dniBase = 20000000 + Math.round(escala * 25000000);
      } else if (anioNacimiento >= 1950) {
        // Personas nacidas entre 1950 y 1969 (55 a 75 años)
        const escala = (anioNacimiento - 1950) / (1969 - 1950);
        dniBase = 10000000 + Math.round(escala * 10000000);
      } else {
        // Personas nacidas antes de 1950 (mayores de 75 años)
        const escala = Math.max(0, (anioNacimiento - 1900) / (1949 - 1900));
        dniBase = 5000000 + Math.round(escala * 5000000);
      }
      
      const variacion = obtenerNumeroAleatorio(-800000, 800000);
      num = dniBase + variacion;
      num = Math.max(3000000, Math.min(num, 50000000));
    } else {
      num = obtenerNumeroAleatorio(3000000, 50000000);
    }
    
    intentos++;
    
    if (intentos > maxIntentos) {
      num = obtenerNumeroAleatorio(5000000, 50000000);
      break;
    }
  } while (dnisGenerados.has(num));
  
  dnisGenerados.add(num);
  
  const parts = num.toString().match(/^(\\d{2})(\\d{3})(\\d{3})$/);
  const dniFormateado = parts ? `${parts[1]}.${parts[2]}.${parts[3]}` : num.toString();
  
  return { dni: dniFormateado, dniNumero: num };
};

// Función para generar una patente argentina
const generarPatente = () => {
  const formatoNuevo = Math.random() > 0.5;
  const letras = 'ABCDEFGHJKLMNOPQRSTUVWXYZ';
  
  const obtenerLetrasAleatorias = (cantidad) => {
    let resultado = '';
    for (let i = 0; i < cantidad; i++) {
      resultado += letras.charAt(Math.floor(Math.random() * letras.length));
    }
    return resultado;
  };
  
  if (formatoNuevo) {
    // Formato nuevo: AB 123 CD
    const letras1 = obtenerLetrasAleatorias(2);
    const numeros = obtenerNumeroAleatorio(100, 999);
    const letras2 = obtenerLetrasAleatorias(2);
    return `${letras1} ${numeros} ${letras2}`;
  } else {
    // Formato antiguo: ABC 123
    const letrasAnt = obtenerLetrasAleatorias(3);
    const numerosAnt = obtenerNumeroAleatorio(100, 999);
    return `${letrasAnt} ${numerosAnt}`;
  }
};

// Funciones para obtener datos
const obtenerNombre = () => obtenerElementoAleatorio(nombres);
const obtenerApellido = () => obtenerElementoAleatorio(apellidos);
const obtenerDatosProvincia = () => obtenerElementoAleatorio(provincias);
const obtenerDatosVehiculo = () => {
  const marcaIndex = obtenerNumeroAleatorio(0, vehiculos.length - 1);
  const marca = vehiculos[marcaIndex].marca;
  const modelos = vehiculos[marcaIndex].modelos;
  const modelo = obtenerElementoAleatorio(modelos);
  return { marca, modelo };
};

const generarDomicilio = () => {
  const calle = obtenerElementoAleatorio(calles);
  const numero = obtenerNumeroAleatorio(100, 9999);
  return `${calle} ${numero}`;
};

// Función para generar una persona con los campos seleccionados
const generarPersona = (camposSeleccionados) => {
  const persona = {};
  const provinciaData = obtenerDatosProvincia();
  const vehiculoData = obtenerDatosVehiculo();
  let edad;
  let dniInfo;
  
  // Extraer campos relacionados que necesitan correlacionarse
  const tieneDNI = camposSeleccionados.some(campo => campo.id === 'dni' && campo.selected);
  const tieneEdad = camposSeleccionados.some(campo => campo.id === 'edad' && campo.selected);
  
  // Si tienen ambos campos, establecemos la correlación
  if (tieneDNI && tieneEdad) {
    edad = obtenerNumeroAleatorio(18, 90);
    dniInfo = generarDNI(edad);
  }
  
  camposSeleccionados.forEach(campo => {
    if (campo.selected) {
      switch(campo.id) {
        case 'nombre':
          persona[campo.name] = obtenerNombre();
          break;
        case 'apellido':
          persona[campo.name] = obtenerApellido();
          break;
        case 'dni':
          persona[campo.name] = dniInfo ? dniInfo.dni : generarDNI().dni;
          break;
        case 'edad':
          persona[campo.name] = edad !== undefined ? edad : obtenerNumeroAleatorio(18, 90);
          break;
        case 'domicilio':
          persona[campo.name] = generarDomicilio();
          break;
        case 'ciudad':
          if (provinciaData.ciudades && provinciaData.ciudades.length > 0) {
            persona[campo.name] = obtenerElementoAleatorio(provinciaData.ciudades);
          } else {
            persona[campo.name] = 'Ciudad sin especificar';
          }
          break;
        case 'partido':
          if (provinciaData.partidos && provinciaData.partidos.length > 0) {
            persona[campo.name] = obtenerElementoAleatorio(provinciaData.partidos);
          } else {
            persona[campo.name] = 'Partido sin especificar';
          }
          break;
        case 'provincia':
          persona[campo.name] = provinciaData.nombre || 'Provincia sin especificar';
          break;
        case 'codigoPostal':
          if (provinciaData.codigosPostales && provinciaData.codigosPostales.length > 0) {
            persona[campo.name] = obtenerElementoAleatorio(provinciaData.codigosPostales);
          } else {
            const letras = ['A', 'B', 'C', 'X', 'Y', 'Z'];
            const letra = letras[Math.floor(Math.random() * letras.length)];
            const numero = obtenerNumeroAleatorio(1000, 9999);
            persona[campo.name] = `${letra}${numero}`;
          }
          break;
        case 'marcaVehiculo':
          persona[campo.name] = vehiculoData.marca;
          break;
        case 'modeloVehiculo':
          persona[campo.name] = vehiculoData.modelo;
          break;
        case 'patente':
          persona[campo.name] = generarPatente();
          break;
      }
    }
  });
  
  return persona;
};

// Función para generar múltiples personas
const generarMultiplesPersonas = (cantidad, campos) => {
  dnisGenerados.clear();
  
  const personas = [];
  for (let i = 0; i < cantidad; i++) {
    personas.push(generarPersona(campos));
  }
  
  return personas;
};

// Endpoint de la API
app.get('/api', (req, res) => {
  // Obtener parámetros
  const cantidad = Math.min(Math.max(parseInt(req.query.cantidad || req.query.quantity || '10', 10), 1), 1000);
  
  const fieldsParam = req.query.fields;
  const allFields = req.query.allFields === 'true' || req.query.allFields === '1';
  
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
  const data = generarMultiplesPersonas(cantidad, campos);
  
  // Establecer headers para descarga si es necesario
  if (req.query.download === 'true' || req.query.download === '1') {
    res.setHeader('Content-Disposition', 'attachment; filename=mockup-data.json');
  }
  
  // Responder con JSON puro
  res.setHeader('Content-Type', 'application/json');
  res.json(data);
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`API JSON (Standalone) ejecutándose en http://localhost:${PORT}/api`);
  console.log('Parámetros disponibles:');
  console.log('- cantidad o quantity: Número de registros (1-1000)');
  console.log('- fields: Lista de campos separados por comas');
  console.log('- allFields=true: Seleccionar todos los campos');
  console.log('- download=true: Descargar como archivo');
  console.log('Ejemplo: http://localhost:' + PORT + '/api?cantidad=5&fields=nombre,apellido,dni');
});
