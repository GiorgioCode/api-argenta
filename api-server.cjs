// api-server.cjs - Servidor API JSON independiente (CommonJS)

// Manejo global de errores
process.on('uncaughtException', function (err) {
  console.error('Excepción no capturada:', err);
  process.exit(1);
});
process.on('unhandledRejection', function (reason, promise) {
  console.error('Promesa no manejada:', reason);
  process.exit(1);
});

console.log('Iniciando api-server.cjs...');

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5176;

// Habilitar CORS
app.use(cors());

// Datos argentinos básicos para el servidor API
const nombres = [
  'Agustín', 'Alberto', 'Alejandro', 'Alexander', 'Carlos', 'César', 'Daniel', 'Darío', 'David', 
  'Diego', 'Eduardo', 'Fernando', 'Francisco', 'Gabriel', 'José', 'Juan', 'Julián', 'Julio', 
  'Lucas', 'Luis', 'Manuel', 'Marcelo', 'Marcos', 'Martín', 'Mateo', 'Miguel', 'Pablo', 'Pedro',
  'Santiago', 'Sebastián', 'Tomás', 'Adriana', 'Agustina', 'Alejandra', 'Ana', 'Andrea', 'Camila',
  'Carolina', 'Catalina', 'Cecilia', 'Celeste', 'Daniela', 'Florencia', 'Gabriela', 'Julieta',
  'Laura', 'Lucía', 'María', 'Mariana', 'Martina', 'Micaela', 'Paula', 'Sofía', 'Valentina', 'Victoria'
];

const apellidos = [
  'Acosta', 'Aguirre', 'Álvarez', 'Benítez', 'Cabrera', 'Campos', 'Castro', 'Díaz', 'Domínguez',
  'Fernández', 'Flores', 'García', 'Giménez', 'Gómez', 'González', 'Gutiérrez', 'Hernández', 'Herrera',
  'López', 'Martínez', 'Medina', 'Molina', 'Morales', 'Moreno', 'Muñoz', 'Núñez', 'Ortega', 'Ortiz',
  'Pérez', 'Ramírez', 'Ramos', 'Ríos', 'Rodríguez', 'Rojas', 'Romero', 'Ruiz', 'Sánchez', 'Silva',
  'Sosa', 'Suárez', 'Torres', 'Vázquez', 'Vega', 'Vera'
];

const provincias = [
  {
    nombre: 'Buenos Aires',
    ciudades: ['La Plata', 'Mar del Plata', 'Bahía Blanca', 'Tandil', 'Olavarría'],
    partidos: ['La Plata', 'General Pueyrredón', 'Bahía Blanca', 'Tandil', 'Olavarría'],
    codigosPostales: ['B1900', 'B7600', 'B8000', 'B7000', 'B7400']
  },
  {
    nombre: 'Ciudad Autónoma de Buenos Aires',
    ciudades: ['Ciudad Autónoma de Buenos Aires'],
    partidos: ['Comuna 1', 'Comuna 2', 'Comuna 3', 'Comuna 4', 'Comuna 5'],
    codigosPostales: ['C1000', 'C1001', 'C1002', 'C1003', 'C1004']
  },
  {
    nombre: 'Córdoba',
    ciudades: ['Córdoba', 'Río Cuarto', 'Villa María', 'San Francisco', 'Río Tercero'],
    partidos: ['Capital', 'Río Cuarto', 'General San Martín', 'San Justo', 'Tercero Arriba'],
    codigosPostales: ['X5000', 'X5800', 'X5900', 'X2400', 'X5850']
  }
];

const vehiculos = [
  {
    marca: 'Volkswagen',
    modelos: ['Gol', 'Polo', 'Golf', 'Vento', 'Amarok']
  },
  {
    marca: 'Ford',
    modelos: ['Fiesta', 'Focus', 'Ka', 'Ranger', 'EcoSport']
  },
  {
    marca: 'Chevrolet',
    modelos: ['Corsa', 'Onix', 'Cruze', 'S10', 'Spin']
  },
  {
    marca: 'Fiat',
    modelos: ['Palio', 'Uno', 'Cronos', 'Argo', 'Strada']
  },
  {
    marca: 'Renault',
    modelos: ['Clio', 'Sandero', 'Logan', 'Duster', 'Kwid']
  }
];

const calles = [
  'Rivadavia', 'San Martín', 'Belgrano', 'Mitre', 'Sarmiento', 'Urquiza', 'Moreno', 'Perón', 'Brown', 'Roca',
  'Alberdi', 'Avellaneda', 'Colón', 'Independencia', 'Lavalle', 'Mayo', 'Necochea', 'Pellegrini', 'Rondeau', 'Yrigoyen'
];

// Set para almacenar DNIs generados y evitar duplicados
const dnisGenerados = new Set();

// Campos disponibles
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
  
  const numStr = num.toString();
  let dniFormateado = numStr;
  
  if (numStr.length === 8) {
    dniFormateado = `${numStr.substring(0, 2)}.${numStr.substring(2, 5)}.${numStr.substring(5, 8)}`;
  }
  
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

const generarDomicilio = () => {
  const calle = obtenerElementoAleatorio(calles);
  const numero = obtenerNumeroAleatorio(100, 9999);
  return `${calle} ${numero}`;
};

// Función para generar una persona con los campos seleccionados
const generarPersona = (camposSeleccionados) => {
  const persona = {};
  const provinciaData = obtenerElementoAleatorio(provincias);
  const vehiculoData = obtenerElementoAleatorio(vehiculos);
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
          persona[campo.name] = obtenerElementoAleatorio(nombres);
          break;
        case 'apellido':
          persona[campo.name] = obtenerElementoAleatorio(apellidos);
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
          persona[campo.name] = obtenerElementoAleatorio(vehiculoData.modelos);
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

// Endpoint de API principal
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

// Página de inicio con instrucciones
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Mockup JSON API</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          h1 {
            color: #4361ee;
          }
          code {
            background-color: #f4f4f4;
            padding: 2px 5px;
            border-radius: 3px;
          }
          pre {
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: 5px;
            overflow-x: auto;
          }
          .example {
            margin-bottom: 20px;
          }
          a {
            color: #4361ee;
          }
        </style>
      </head>
      <body>
        <h1>Mockup JSON API para datos Argentinos</h1>
        <p>Esta API genera datos de personas ficticias en Argentina.</p>
        
        <h2>Parámetros disponibles:</h2>
        <ul>
          <li><code>cantidad</code> o <code>quantity</code>: Número de registros (1-1000)</li>
          <li><code>fields</code>: Lista de campos separados por comas</li>
          <li><code>allFields=true</code>: Seleccionar todos los campos</li>
          <li><code>download=true</code>: Descargar como archivo</li>
        </ul>
        
        <h2>Ejemplos de uso:</h2>
        
        <div class="example">
          <h3>Generar 5 personas con todos los campos:</h3>
          <pre><a href="/api?cantidad=5&allFields=true" target="_blank">/api?cantidad=5&allFields=true</a></pre>
        </div>
        
        <div class="example">
          <h3>Generar 10 personas solo con nombre, apellido y DNI:</h3>
          <pre><a href="/api?cantidad=10&fields=nombre,apellido,dni" target="_blank">/api?cantidad=10&fields=nombre,apellido,dni</a></pre>
        </div>
        
        <div class="example">
          <h3>Generar y descargar 50 personas:</h3>
          <pre><a href="/api?cantidad=50&allFields=true&download=true" target="_blank">/api?cantidad=50&allFields=true&download=true</a></pre>
        </div>
        
        <h2>Campos disponibles:</h2>
        <pre>${camposDisponibles.map(c => c.id).join(', ')}</pre>
      </body>
    </html>
  `);
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`API JSON ejecutándose en http://localhost:${PORT}/api`);
  console.log(`Documentación en http://localhost:${PORT}/`);
});
