import { FieldType, MockupPerson } from '../types';
import { nombres, apellidos, provincias, vehiculos, calles, codigosAreaPorProvincia, codigosAreaPorCiudad } from './argentinaData';

// Funciones utilitarias para obtener elementos aleatorios
const obtenerElementoAleatorio = <T>(array: T[]): T => {
  const indice = Math.floor(Math.random() * array.length);
  return array[indice];
};

// Función para generar un número aleatorio entre un rango
const obtenerNumeroAleatorio = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Mantener un conjunto de DNIs ya generados para evitar repeticiones
const dnisGenerados = new Set<number>();

// Función para generar un DNI argentino formateado (XX.XXX.XXX) basado en la edad o aleatorio
const generarDNI = (edad?: number): { dni: string, dniNumero: number } => {
  let num: number;
  let intentos = 0;
  const maxIntentos = 50; // Límite de intentos para evitar bucles infinitos
  
  do {
    if (edad !== undefined) {
      // Si tenemos la edad, generamos un DNI acorde a la correlación DNI-edad adecuada
      
      // Función corregida para respetar la correlación en todo el rango de edades:
      // - Para personas nacidas después de 1970 (menores de 55 años en 2025): DNIs más recientes (>20M)
      // - Para personas nacidas entre 1950-1970 (55-75 años): DNIs medios (10M-20M)
      // - Para personas nacidas antes de 1950 (más de 75 años): DNIs antiguos (5M-10M)
      
      const anioNacimiento = 2025 - edad;
      let dniBase: number;
      
      if (anioNacimiento >= 1970) {
        // Personas nacidas desde 1970 en adelante (menores de 55 años)
        const escala = (anioNacimiento - 1970) / (2025 - 1970); // Normaliza entre 0 y 1
        dniBase = 20000000 + Math.round(escala * 25000000); // 20M a 45M
      } else if (anioNacimiento >= 1950) {
        // Personas nacidas entre 1950 y 1969 (55 a 75 años)
        const escala = (anioNacimiento - 1950) / (1969 - 1950); // Normaliza entre 0 y 1
        dniBase = 10000000 + Math.round(escala * 10000000); // 10M a 20M
      } else {
        // Personas nacidas antes de 1950 (mayores de 75 años)
        const escala = Math.max(0, (anioNacimiento - 1900) / (1949 - 1900)); // Normaliza entre 0 y 1
        dniBase = 5000000 + Math.round(escala * 5000000); // 5M a 10M
      }
      
      // Agregamos variación para que no todas las personas de la misma edad tengan DNIs similares
      // y para evitar colisiones de DNI (variación proporcional al rango)
      const variacion = obtenerNumeroAleatorio(-800000, 800000);
      num = dniBase + variacion;
      
      // Aseguramos que esté en un rango válido, pero respetando la correlación edad-DNI
      num = Math.max(3000000, Math.min(num, 50000000));
    } else {
      // Si no tenemos edad, generamos uno aleatorio
      num = obtenerNumeroAleatorio(3000000, 50000000);
    }
    
    intentos++;
    
    // Si después de varios intentos no podemos encontrar un DNI único, generamos uno aleatorio
    // con un rango más amplio para reducir las probabilidades de colisión
    if (intentos > maxIntentos) {
      num = obtenerNumeroAleatorio(5000000, 50000000);
      break;
    }
  } while (dnisGenerados.has(num)); // Repetir mientras el DNI ya exista
  
  // Agregar el DNI al conjunto de generados
  dnisGenerados.add(num);
  
  const parts = num.toString().match(/^(\d{2})(\d{3})(\d{3})$/);
  const dniFormateado = parts ? `${parts[1]}.${parts[2]}.${parts[3]}` : num.toString();
  
  return { dni: dniFormateado, dniNumero: num };
};

// Función para limpiar el conjunto de DNIs generados (útil cuando se genera un nuevo conjunto de datos)
const limpiarDNIsGenerados = (): void => {
  dnisGenerados.clear();
};

// Función para generar una patente argentina (formato nuevo o antiguo)
const generarPatente = (): string => {
  const formatoNuevo = Math.random() > 0.5;
  const letras = 'ABCDEFGHJKLMNOPQRSTUVWXYZ';
  
  const obtenerLetrasAleatorias = (cantidad: number): string => {
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

// Función para obtener un nombre aleatorio
const obtenerNombre = (): string => {
  return obtenerElementoAleatorio(nombres);
};

// Función para obtener un apellido aleatorio
const obtenerApellido = (): string => {
  return obtenerElementoAleatorio(apellidos);
};

// Función para obtener datos de una provincia aleatoria
const obtenerDatosProvincia = () => {
  const provincia = obtenerElementoAleatorio(provincias);
  return provincia;
};

// Función para obtener datos de un vehículo aleatorio
const obtenerDatosVehiculo = () => {
  const vehiculo = obtenerElementoAleatorio(vehiculos);
  const modelo = obtenerElementoAleatorio(vehiculo.modelos);
  
  return {
    marca: vehiculo.marca,
    modelo: modelo
  };
};

// Función para generar un domicilio aleatorio
const generarDomicilio = (): string => {
  const calle = obtenerElementoAleatorio(calles);
  const numero = obtenerNumeroAleatorio(100, 9999);
  return `${calle} ${numero}`;
};

// Función para generar un número telefónico basado en la ubicación
const generarTelefono = (provinciaName: string, ciudadName: string, esCelular: boolean = false): string => {
  // Obtener código de área según la ciudad primero (más específico)
  let codigoDeArea = '11'; // Por defecto, Capital Federal
  
  // Primero buscar por ciudad (más específico)
  if (ciudadName && ciudadName in codigosAreaPorCiudad) {
    codigoDeArea = codigosAreaPorCiudad[ciudadName];
  }
  // Si no se encuentra por ciudad, buscar por provincia
  else if (provinciaName && provinciaName in codigosAreaPorProvincia) {
    codigoDeArea = codigosAreaPorProvincia[provinciaName];
  }
  
  // Generar el resto del número
  let digitosCelular = '';
  if (esCelular) {
    // Para celulares en Argentina: +54 (código área) 15 xxxx-xxxx
    digitosCelular = '15';
  }
  
  // Generar los últimos 8 dígitos (4-4 formato)
  const primeraParte = obtenerNumeroAleatorio(1000, 9999);
  const segundaParte = obtenerNumeroAleatorio(1000, 9999);
  
  return `(${codigoDeArea}) ${digitosCelular}${primeraParte}-${segundaParte}`;
};

// Función principal para generar una persona con datos completos
export const generarPersona = (camposSeleccionados: FieldType[]): MockupPerson => {
  const persona: MockupPerson = {};
  const nombrePersona = obtenerNombre();
  const apellidoPersona = obtenerApellido();
  const provinciaData = obtenerDatosProvincia();
  const vehiculoData = obtenerDatosVehiculo();
  
  // Verificamos primero si se van a generar tanto DNI como edad
  // para poder correlacionarlos correctamente
  const incluirDni = camposSeleccionados.some(campo => campo.selected && campo.id === 'dni');
  const incluirEdad = camposSeleccionados.some(campo => campo.selected && campo.id === 'edad');
  
  // Generamos datos coordinados para DNI y edad
  let edad: number | undefined;
  let dniInfo: { dni: string, dniNumero: number } | undefined;
  
  if (incluirDni && incluirEdad) {
    // Si se incluyen ambos campos, calculamos primero la edad
    edad = obtenerNumeroAleatorio(18, 90);
    dniInfo = generarDNI(edad);
  } else if (incluirDni) {
    // Si sólo se incluye DNI, lo generamos aleatoriamente
    dniInfo = generarDNI();
    
    // Y calculamos la edad que correspondería a ese DNI
    const anioNacimientoAprox = 1942.5 + dniInfo.dniNumero / 736470;
    const anioActual = 2025;
    edad = Math.round(anioActual - anioNacimientoAprox);
    // Aseguramos que la edad esté en un rango razonable
    edad = Math.max(18, Math.min(edad, 90));
  } else if (incluirEdad) {
    // Si sólo se incluye edad, la calculamos aleatoriamente
    edad = obtenerNumeroAleatorio(18, 90);
  }
  
  // Añadir los campos seleccionados
  camposSeleccionados.forEach(campo => {
    if (campo.selected) {
      switch (campo.id) {
        case 'nombre':
          persona[campo.name] = nombrePersona;
          break;
        case 'apellido':
          persona[campo.name] = apellidoPersona;
          break;
        case 'dni':
          // Usamos el DNI ya generado que estará correlacionado con la edad si ambos se seleccionaron
          persona[campo.name] = dniInfo ? dniInfo.dni : generarDNI().dni;
          break;
        case 'edad':
          // Usamos la edad ya generada que estará correlacionada con el DNI si ambos se seleccionaron
          persona[campo.name] = edad !== undefined ? edad : obtenerNumeroAleatorio(18, 90);
          break;
        case 'domicilio':
          persona[campo.name] = generarDomicilio();
          break;
        case 'ciudad':
          if (provinciaData.ciudades && provinciaData.ciudades.length > 0) {
            const ciudadIndex = Math.floor(Math.random() * provinciaData.ciudades.length);
            persona[campo.name] = provinciaData.ciudades[ciudadIndex];
          } else {
            persona[campo.name] = 'Ciudad sin especificar';
          }
          break;
        case 'partido':
          if (provinciaData.partidos && provinciaData.partidos.length > 0) {
            const partidoIndex = Math.floor(Math.random() * provinciaData.partidos.length);
            persona[campo.name] = provinciaData.partidos[partidoIndex];
          } else {
            persona[campo.name] = 'Partido sin especificar';
          }
          break;
        case 'provincia':
          persona[campo.name] = provinciaData.nombre || 'Provincia sin especificar';
          break;
        case 'codigoPostal':
          if (provinciaData.codigosPostales && provinciaData.codigosPostales.length > 0) {
            const cpIndex = Math.floor(Math.random() * provinciaData.codigosPostales.length);
            persona[campo.name] = provinciaData.codigosPostales[cpIndex];
          } else {
            // Generar un código postal genérico si no hay disponible
            const letras = ['A', 'B', 'C', 'X', 'Y', 'Z'];
            const letra = letras[Math.floor(Math.random() * letras.length)];
            const numero = obtenerNumeroAleatorio(1000, 9999);
            persona[campo.name] = `${letra}${numero}`;
          }
          break;
        case 'telefono':
          // Obtener la ciudad para generar el teléfono con código de área correcto
          let ciudadTel = '';
          if (provinciaData.ciudades && provinciaData.ciudades.length > 0) {
            ciudadTel = provinciaData.ciudades[Math.floor(Math.random() * provinciaData.ciudades.length)];
          }
          persona[campo.name] = generarTelefono(provinciaData.nombre, ciudadTel, false);
          break;
        case 'celular':
          // Obtener la ciudad para generar el celular con código de área correcto
          let ciudadCel = '';
          if (provinciaData.ciudades && provinciaData.ciudades.length > 0) {
            ciudadCel = provinciaData.ciudades[Math.floor(Math.random() * provinciaData.ciudades.length)];
          }
          persona[campo.name] = generarTelefono(provinciaData.nombre, ciudadCel, true);
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
        default:
          break;
      }
    }
  });
  
  return persona;
};

// Función para generar múltiples personas
export const generarMultiplesPersonas = (
  cantidad: number, 
  camposSeleccionados: FieldType[]
): MockupPerson[] => {
  // Limpiar el conjunto de DNIs generados al iniciar una nueva generación
  // para que no se mantengan entre diferentes llamadas
  limpiarDNIsGenerados();
  
  const personas: MockupPerson[] = [];
  
  for (let i = 0; i < cantidad; i++) {
    personas.push(generarPersona(camposSeleccionados));
  }
  
  return personas;
};

// Lista de campos disponibles
export const camposDisponibles: FieldType[] = [
  { id: 'nombre', name: 'nombre', label: 'Nombre', selected: false },
  { id: 'apellido', name: 'apellido', label: 'Apellido', selected: false },
  { id: 'dni', name: 'dni', label: 'DNI', selected: false },
  { id: 'edad', name: 'edad', label: 'Edad', selected: false },
  { id: 'domicilio', name: 'domicilio', label: 'Domicilio', selected: false },
  { id: 'ciudad', name: 'ciudad', label: 'Ciudad', selected: false },
  { id: 'partido', name: 'partido', label: 'Partido', selected: false },
  { id: 'provincia', name: 'provincia', label: 'Provincia', selected: false },
  { id: 'codigoPostal', name: 'codigoPostal', label: 'Código Postal', selected: false },
  { id: 'telefono', name: 'telefono', label: 'Teléfono', selected: false },
  { id: 'celular', name: 'celular', label: 'Celular', selected: false },
  { id: 'marcaVehiculo', name: 'marcaVehiculo', label: 'Marca Vehículo', selected: false },
  { id: 'modeloVehiculo', name: 'modeloVehiculo', label: 'Modelo Vehículo', selected: false },
  { id: 'patente', name: 'patente', label: 'Patente', selected: false },
];
