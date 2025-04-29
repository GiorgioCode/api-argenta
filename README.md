# Mockup JSON - Generador de Datos Ficticios Argentinos 🇦🇷

[![Versión](https://img.shields.io/badge/Versión-1.0.0-blue.svg)](https://github.com/tu-usuario/mockup-json)
[![License](https://img.shields.io/badge/Licencia-MIT-green.svg)](LICENSE)

> Genera datos ficticios realistas de personas argentinas para desarrollo, testing y prototipado de aplicaciones.

![Mockup JSON Demo](demo-screenshot.png)

## 🌟 Características

- **Datos localizados**: Nombres, apellidos, direcciones, DNIs, patentes y teléfonos argentinos realistas
- **Correlación inteligente**: DNIs generados según rango de edad, teléfonos con prefijos correctos por ciudad
- **Múltiples formatos**: Consume la API vía REST o directamente desde la interfaz gráfica
- **Altamente configurable**: Selecciona exactamente qué campos necesitas
- **Descarga directa**: Obtén archivos JSON listos para usar en tu proyecto
- **Diseño responsive**: Interfaz web adaptable para cualquier dispositivo

## 📋 Contenido

- [Instalación](#-instalación)
- [Uso Rápido](#-uso-rápido)
- [API REST](#-api-rest)
- [Parámetros Disponibles](#-parámetros-disponibles)
- [Campos Disponibles](#-campos-disponibles)
- [Casos de Uso Prácticos](#-casos-de-uso-prácticos)
- [Ejemplos Detallados](#-ejemplos-detallados)
- [Contribuciones](#-contribuciones)
- [Licencia](#-licencia)

## 💻 Instalación

### Opción 1: Usar la versión online

Accede directamente a la versión desplegada en: [https://api-argenta.vercel.app](https://api-argenta.vercel.app)

### Opción 2: Instalar localmente

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/mockup-json.git
cd mockup-json

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# O compilar para producción
npm run build
npm run preview
```

### Opción 3: Ejecutar solo el servidor API

```bash
# Ejecutar el servidor API en http://localhost:5176/api
npm run api
```

## 🚀 Uso Rápido

### Interfaz Gráfica

1. Accede a la aplicación en [http://localhost:3000](http://localhost:3000) o [https://api-argenta.vercel.app](https://api-argenta.vercel.app)
2. Selecciona los campos que necesitas en el panel izquierdo
3. Ajusta la cantidad de registros con el control deslizante
4. El JSON generado aparecerá automáticamente en el panel derecho
5. Copia el JSON o descárgalo como archivo

### API Directa

```bash
# Generar 10 personas con todos los campos
curl "https://api-argenta.vercel.app/api?cantidad=10&allFields=true"

# Generar 5 personas con solo nombre, apellido y DNI
curl "https://api-argenta.vercel.app/api?cantidad=5&fields=nombre,apellido,dni"

# Descargar como archivo JSON
curl -o "datos.json" "https://api-argenta.vercel.app/api?cantidad=20&fields=nombre,apellido,edad,telefono,celular&download=true"
```

## 🌐 API REST

La API está disponible en `/api` y acepta solicitudes GET con diversos parámetros.

### Endpoints

- **GET /api**: Endpoint principal para generar datos
- **GET /**: Documentación interactiva (en la versión web)

## 📝 Parámetros Disponibles

| Parámetro       | Tipo      | Descripción                                         | Ejemplo                          |
|-----------------|-----------|-----------------------------------------------------|----------------------------------|
| `cantidad`      | número    | Cantidad de registros (1-1000)                     | `cantidad=50`                    |
| `quantity`      | número    | Alias de cantidad                                   | `quantity=50`                    |
| `fields`        | string    | Lista de campos separados por comas                 | `fields=nombre,apellido,dni`     |
| `allFields`     | boolean   | Incluir todos los campos disponibles               | `allFields=true`                 |
| `download`      | boolean   | Descargar como archivo en lugar de mostrar en web  | `download=true`                  |

## 📊 Campos Disponibles

| ID Campo        | Descripción                                | Ejemplo                         |
|-----------------|--------------------------------------------|---------------------------------|
| `nombre`        | Nombre de pila argentino                   | "María", "Juan", "Sofía"       |
| `apellido`      | Apellido argentino                        | "González", "Rodríguez"        |
| `dni`           | Documento Nacional de Identidad           | "28.456.789"                    |
| `edad`          | Edad (correlacionada con DNI)             | 35                              |
| `domicilio`     | Dirección de residencia                    | "Rivadavia 1234"                |
| `ciudad`        | Ciudad argentina                          | "La Plata"                      |
| `partido`       | Partido o departamento                     | "General Pueyrredón"            |
| `provincia`     | Provincia argentina                        | "Buenos Aires"                  |
| `codigoPostal`  | Código postal                              | "B1900"                         |
| `telefono`      | Teléfono fijo con código de área correcto | "(221) 4567-8901"               |
| `celular`       | Celular con código de área correcto       | "(221) 15-4567-8901"            |
| `marcaVehiculo` | Marca de vehículo                         | "Volkswagen"                    |
| `modeloVehiculo`| Modelo correspondiente a la marca         | "Gol"                           |
| `patente`       | Patente argentina (formato nuevo o viejo) | "AB 123 CD" o "ABC 123"         |

## 💡 Casos de Uso Prácticos

### Desarrollo de Prototipos

```javascript
// Obtener 20 usuarios para un prototipo de red social argentina
fetch('https://api-argenta.vercel.app/api?cantidad=20&fields=nombre,apellido,edad,ciudad,provincia')
  .then(response => response.json())
  .then(users => {
    // Poblar tu interfaz con datos creíbles
    renderUsers(users);
  });
```

### Testing de Aplicaciones

```javascript
// Crear datos de prueba para un sistema de gestión de clientes
const testData = await fetch('https://api-argenta.vercel.app/api?cantidad=100&fields=nombre,apellido,dni,telefono,celular,domicilio,ciudad,provincia')
  .then(res => res.json());
  
// Usar los datos para testing de formularios, validaciones, etc.
runTests(testData);
```

### Desarrollo de Bases de Datos

```javascript
// Generar registros iniciales para poblar una base de datos
const personas = await fetch('https://api-argenta.vercel.app/api?cantidad=500&allFields=true')
  .then(res => res.json());

// Insertar en tu base de datos SQL
const insertQuery = 'INSERT INTO clientes (nombre, apellido, dni, ...) VALUES (?, ?, ?, ...)';
personas.forEach(persona => {
  db.execute(insertQuery, [persona.nombre, persona.apellido, persona.dni, ...]);
});
```

### Generación de Informes de Ejemplo

```javascript
// Crear informes financieros con datos ficticios para demostración
const clientes = await fetch('https://api-argenta.vercel.app/api?cantidad=20&fields=nombre,apellido,dni')
  .then(res => res.json());
  
// Generar transacciones ficticias para cada cliente
const informeCompleto = generarInformeFinanciero(clientes);
```

## 📚 Ejemplos Detallados

### Generación con correlación DNI-Edad

```javascript
// Los DNIs generados serán coherentes con las edades
fetch('https://api-argenta.vercel.app/api?fields=nombre,apellido,dni,edad&cantidad=10')
  .then(res => res.json())
  .then(personas => {
    personas.forEach(p => {
      console.log(`${p.nombre} ${p.apellido}, ${p.edad} años, DNI: ${p.dni}`);
      // Los números de DNI más altos corresponderán a personas más jóvenes
    });
  });
```

### Generación de teléfonos con códigos de área correctos

```javascript
// Los teléfonos tendrán códigos de área correspondientes a la ciudad/provincia
fetch('https://api-argenta.vercel.app/api?fields=nombre,ciudad,provincia,telefono,celular&cantidad=5')
  .then(res => res.json())
  .then(personas => {
    personas.forEach(p => {
      console.log(`${p.nombre} de ${p.ciudad}, ${p.provincia}`);
      console.log(`Tel. Fijo: ${p.telefono}`);
      console.log(`Celular: ${p.celular}`);
      // Los códigos de área de los teléfonos coincidirán con la ubicación
    });
  });
```

### Uso con Node.js y axios

```javascript
const axios = require('axios');

async function obtenerDatosFicticios() {
  try {
    const response = await axios.get('https://api-argenta.vercel.app/api', {
      params: {
        cantidad: 30,
        fields: 'nombre,apellido,dni,domicilio,ciudad,provincia,codigoPostal,telefono'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return [];
  }
}

// Usar los datos
obtenerDatosFicticios().then(datos => {
  console.log(`Obtenidos ${datos.length} registros de ejemplo`);
  // Procesar los datos como sea necesario
});
```

### Integración con frameworks frontend

#### React

```jsx
import { useState, useEffect } from 'react';

function ClientesDemo() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api-argenta.vercel.app/api?cantidad=15&fields=nombre,apellido,dni,telefono,celular,ciudad')
      .then(res => res.json())
      .then(data => {
        setClientes(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Cargando...</div>;

  return (
    <div className="clientes-container">
      <h2>Directorio de Clientes</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>DNI</th>
            <th>Ciudad</th>
            <th>Teléfono</th>
            <th>Celular</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente, index) => (
            <tr key={index}>
              <td>{cliente.nombre}</td>
              <td>{cliente.apellido}</td>
              <td>{cliente.dni}</td>
              <td>{cliente.ciudad}</td>
              <td>{cliente.telefono}</td>
              <td>{cliente.celular}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Si deseas mejorar este proyecto:

1. Haz un fork del repositorio
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`)
3. Realiza tus cambios
4. Haz commit de tus cambios (`git commit -m 'Agrega nueva funcionalidad'`)
5. Sube tus cambios (`git push origin feature/nueva-funcionalidad`)
6. Abre un Pull Request

## 📜 Licencia

Este proyecto está licenciado bajo la Licencia MIT - consulta el archivo [LICENSE](LICENSE) para más detalles.

---

**Importante**: Los datos generados son completamente ficticios y no corresponden a personas reales. Cualquier coincidencia con datos reales es pura casualidad.