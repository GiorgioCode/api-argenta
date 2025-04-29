import { useEffect } from 'react';
import { camposDisponibles, generarMultiplesPersonas } from '../utils/mockDataGenerator';

interface ApiEndpointProps {}

const ApiEndpoint: React.FC<ApiEndpointProps> = () => {
  
  useEffect(() => {
    // Obtener los parámetros de la URL
    const params = new URLSearchParams(window.location.search);

    // Cantidad de registros (por defecto: 10, máximo: 1000)
    let cantidad = parseInt(params.get('cantidad') || params.get('quantity') || '10', 10);
    cantidad = Math.min(Math.max(cantidad, 1), 1000);

    // Determinar los campos a incluir
    let fieldIds: string[] = [];
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
      const defaultFields = ['nombre', 'apellido', 'dni'];
      fields.forEach(field => {
        if (defaultFields.includes(field.id)) {
          field.selected = true;
        }
      });
    }

    // Generar los datos
    const data = generarMultiplesPersonas(cantidad, fields);

    // Convertir los datos a JSON
    const jsonResponse = JSON.stringify(data, null, 2);
    
    // Comprobar si se solicita la descarga
    const downloadParam = params.get('download');
    if (downloadParam === 'true' || downloadParam === '1') {
      // Crear un enlace para descargar el archivo
      const a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([jsonResponse], { type: 'application/json' }));
      a.download = 'mockup-data.json';
      a.click();
      URL.revokeObjectURL(a.href);
      return;
    }
    
    // Para devolver un JSON puro, reemplazamos completamente el documento
    // Esto es más efectivo que manipular el DOM
    document.open();
    document.write(jsonResponse);
    document.close();
    
    // Establecer el tipo MIME correcto para JSON mediante un header meta
    const meta = document.createElement('meta');
    meta.httpEquiv = 'Content-Type';
    meta.content = 'application/json; charset=utf-8';
    document.head.appendChild(meta);
  }, []);

  // Este componente nunca renderiza nada visible en React
  return null;
};

export default ApiEndpoint;
