// argentinaData-standalone.js - Datos argentinos para el servidor API (formato CommonJS)

// Nombres comunes en Argentina
const nombres = [
  'Agustín', 'Alberto', 'Alejandro', 'Alexander', 'Alfredo', 'Andrés', 'Antonio',
  'Ariel', 'Augusto', 'Benjamín', 'Bernardo', 'Bruno', 'Carlos', 'César',
  'Claudio', 'Cristian', 'Daniel', 'Darío', 'David', 'Diego', 'Eduardo', 'Emiliano',
  'Emilio', 'Enrique', 'Esteban', 'Fabián', 'Facundo', 'Federico', 'Felipe',
  'Fernando', 'Francisco', 'Gabriel', 'Gastón', 'Germán', 'Gonzalo', 'Gregorio',
  'Guillermo', 'Gustavo', 'Hernán', 'Horacio', 'Hugo', 'Ignacio', 'Javier',
  'Joaquín', 'Jorge', 'José', 'Juan', 'Julián', 'Julio', 'Leandro', 'Lucas',
  'Luciano', 'Luis', 'Manuel', 'Marcelo', 'Marcos', 'Mariano', 'Martín', 'Mateo',
  'Matías', 'Mauricio', 'Maximiliano', 'Miguel', 'Néstor', 'Nicolás', 'Oscar',
  'Pablo', 'Patricio', 'Raúl', 'Ricardo', 'Roberto', 'Rodrigo', 'Rubén', 'Santiago',
  'Sebastián', 'Sergio', 'Thiago', 'Tomás', 'Valentín', 'Vicente', 'Víctor',
  'Adriana', 'Agustina', 'Alejandra', 'Alicia', 'Ana', 'Andrea', 'Antonella',
  'Bárbara', 'Beatriz', 'Brenda', 'Camila', 'Carla', 'Carolina', 'Catalina',
  'Cecilia', 'Celeste', 'Claudia', 'Cristina', 'Daniela', 'Débora', 'Diana',
  'Elena', 'Eliana', 'Elizabeth', 'Erica', 'Estefanía', 'Eva', 'Fernanda',
  'Florencia', 'Gabriela', 'Guadalupe', 'Inés', 'Irene', 'Isabel', 'Jennifer',
  'Jessica', 'Johanna', 'Josefina', 'Juana', 'Julia', 'Julieta', 'Karen', 'Karina',
  'Laura', 'Liliana', 'Lorena', 'Lourdes', 'Lucía', 'Luján', 'Magdalena', 'Marcela',
  'Margarita', 'María', 'Mariana', 'Mariela', 'Marina', 'Marta', 'Martina',
  'Melina', 'Micaela', 'Milagros', 'Mónica', 'Natalia', 'Nora', 'Paola', 'Patricia',
  'Paula', 'Pilar', 'Ramona', 'Raquel', 'Rocío', 'Romina', 'Rosa', 'Rosario',
  'Sandra', 'Silvia', 'Sofía', 'Soledad', 'Sonia', 'Susana', 'Valentina', 'Valeria',
  'Vanesa', 'Verónica', 'Victoria', 'Virginia', 'Yamila'
];

// Apellidos comunes en Argentina
const apellidos = [
  'Acosta', 'Aguirre', 'Álvarez', 'Benítez', 'Blanco', 'Bravo', 'Bruno',
  'Bustos', 'Cabrera', 'Cáceres', 'Campos', 'Cardozo', 'Carrizo', 'Castillo',
  'Castro', 'Ceballos', 'Chávez', 'Córdoba', 'Correa', 'Díaz', 'Domínguez',
  'Escobar', 'Espinosa', 'Fernández', 'Ferrari', 'Ferreira', 'Ferreyra',
  'Figueroa', 'Flores', 'Franco', 'Gaitán', 'Gallardo', 'García', 'Giménez',
  'Godoy', 'Gómez', 'González', 'Guerra', 'Gutiérrez', 'Hernández', 'Herrera',
  'Ibáñez', 'Jara', 'Juárez', 'Ledesma', 'Leiva', 'López', 'Lucero', 'Luna',
  'Macías', 'Maldonado', 'Mansilla', 'Martínez', 'Medina', 'Méndez', 'Miranda',
  'Molina', 'Morales', 'Moreno', 'Moyano', 'Muñoz', 'Navarro', 'Núñez', 'Ojeda',
  'Olivera', 'Ortega', 'Ortiz', 'Páez', 'Paredes', 'Paz', 'Peralta', 'Pérez',
  'Pereyra', 'Quiroga', 'Ramírez', 'Ramos', 'Ríos', 'Rivera', 'Robledo',
  'Rodríguez', 'Rojas', 'Romano', 'Romero', 'Ruiz', 'Saavedra', 'Salas',
  'Salinas', 'Sánchez', 'Silva', 'Soria', 'Sosa', 'Suárez', 'Torres', 'Valdez',
  'Vargas', 'Vázquez', 'Vega', 'Velázquez', 'Vera', 'Villalba', 'Villarroel'
];

// Provincias argentinas con sus datos
const provincias = [
  {
    nombre: 'Buenos Aires',
    ciudades: [
      'La Plata', 'Mar del Plata', 'Bahía Blanca', 'Tandil', 'Olavarría',
      'Pergamino', 'Junín', 'Necochea', 'Azul', 'Chivilcoy'
    ],
    partidos: [
      'La Plata', 'General Pueyrredón', 'Bahía Blanca', 'Tandil', 'Olavarría',
      'Pergamino', 'Junín', 'Necochea', 'Azul', 'Chivilcoy', 'Tigre', 'San Isidro',
      'La Matanza', 'Quilmes', 'Lanús', 'Avellaneda', 'Almirante Brown', 'Morón',
      'Merlo', 'Moreno', 'Pilar', 'Escobar', 'Tres de Febrero', 'San Miguel',
      'Malvinas Argentinas', 'José C. Paz', 'Hurlingham'
    ],
    codigosPostales: ['B1900', 'B7600', 'B8000', 'B7000', 'B7400', 'B2700', 'B6000', 'B7630', 'B7300', 'B6500']
  },
  {
    nombre: 'Ciudad Autónoma de Buenos Aires',
    ciudades: ['Ciudad Autónoma de Buenos Aires'],
    partidos: ['Comuna 1', 'Comuna 2', 'Comuna 3', 'Comuna 4', 'Comuna 5', 'Comuna 6', 'Comuna 7', 'Comuna 8', 'Comuna 9', 'Comuna 10', 'Comuna 11', 'Comuna 12', 'Comuna 13', 'Comuna 14', 'Comuna 15'],
    codigosPostales: ['C1000', 'C1001', 'C1002', 'C1003', 'C1004', 'C1005', 'C1006', 'C1007', 'C1008', 'C1009']
  },
  {
    nombre: 'Córdoba',
    ciudades: ['Córdoba', 'Río Cuarto', 'Villa María', 'San Francisco', 'Río Tercero', 'Villa Carlos Paz', 'Río Segundo', 'Jesús María', 'Bell Ville', 'Alta Gracia'],
    partidos: ['Capital', 'Río Cuarto', 'General San Martín', 'San Justo', 'Tercero Arriba', 'Punilla', 'Río Segundo', 'Colón', 'Unión', 'Santa María'],
    codigosPostales: ['X5000', 'X5800', 'X5900', 'X2400', 'X5850', 'X5152', 'X5960', 'X5220', 'X2550', 'X5186']
  },
  {
    nombre: 'Corrientes',
    ciudades: ['Corrientes', 'Goya', 'Mercedes', 'Curuzú Cuatiá', 'Santo Tomé', 'Bella Vista', 'Paso de los Libres', 'Esquina', 'Saladas', 'Monte Caseros'],
    partidos: ['Capital', 'Goya', 'Mercedes', 'Curuzú Cuatiá', 'Santo Tomé', 'Bella Vista', 'Paso de los Libres', 'Esquina', 'Saladas', 'Monte Caseros'],
    codigosPostales: ['W3400', 'W3450', 'W3470', 'W3460', 'W3340', 'W3432', 'W3230', 'W3196', 'W3420', 'W3220']
  }
];

// Marcas y modelos de vehículos
const vehiculos = [
  {
    marca: 'Volkswagen',
    modelos: ['Gol', 'Polo', 'Golf', 'Vento', 'Amarok', 'Suran', 'Up!', 'Tiguan', 'Passat', 'Scirocco']
  },
  {
    marca: 'Ford',
    modelos: ['Fiesta', 'Focus', 'Ka', 'Ranger', 'EcoSport', 'Mondeo', 'Kuga', 'Mustang', 'Territory', 'F-150']
  },
  {
    marca: 'Chevrolet',
    modelos: ['Corsa', 'Onix', 'Cruze', 'S10', 'Spin', 'Tracker', 'Camaro', 'Prisma', 'Equinox', 'Captiva']
  },
  {
    marca: 'Fiat',
    modelos: ['Palio', 'Uno', 'Cronos', 'Argo', 'Strada', 'Toro', 'Mobi', '500', 'Ducato', 'Siena']
  },
  {
    marca: 'Renault',
    modelos: ['Clio', 'Sandero', 'Logan', 'Duster', 'Kwid', 'Kangoo', 'Captur', 'Fluence', 'Megane', 'Alaskan']
  },
  {
    marca: 'Toyota',
    modelos: ['Corolla', 'Hilux', 'Etios', 'Yaris', 'RAV4', 'SW4', 'Camry', 'Prius', 'Hiace', 'Land Cruiser']
  }
];

// Calles comunes de Argentina
const calles = [
  'Rivadavia', 'San Martín', 'Belgrano', 'Mitre', 'Sarmiento', 'Urquiza', 'Moreno', 'Perón', 'Brown', 'Roca',
  'Alberdi', 'Avellaneda', 'Colón', 'Independencia', 'Lavalle', 'Mayo', 'Necochea', 'Pellegrini', 'Rondeau', 'Yrigoyen',
  'Las Heras', 'Alvear', 'Paseo Colón', 'Callao', 'Corrientes', 'Córdoba', 'Santa Fe', 'Entre Ríos', 'Chacabuco', 'Balcarce',
  'Alsina', 'Dorrego', 'Gorriti', 'Juncal', 'Laprida', 'Larrea', 'Mansilla', 'Olazábal', 'Pueyrredón', 'Quesada'
];

// Exportar todos los datos
module.exports = {
  nombres,
  apellidos,
  provincias,
  vehiculos,
  calles
};
