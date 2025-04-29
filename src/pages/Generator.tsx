import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { camposDisponibles, generarMultiplesPersonas } from '../utils/mockDataGenerator';
import '../App.css';

function Generator() {
  const [fields, setFields] = useState(
    camposDisponibles.map(campo => ({ ...campo, selected: false }))
  );
  const [quantity, setQuantity] = useState(10);
  const [mockupData, setMockupData] = useState<any[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDocs, setShowDocs] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  // Procesar parámetros de URL al cargar
  useEffect(() => {
    const urlFields = searchParams.get('fields');
    const urlQuantity = searchParams.get('quantity');
    
    if (urlFields) {
      const fieldIds = urlFields.split(',');
      setFields(prevFields => 
        prevFields.map(field => ({ 
          ...field, 
          selected: fieldIds.includes(field.id) 
        }))
      );
    }
    
    if (urlQuantity) {
      const parsedQuantity = parseInt(urlQuantity, 10);
      if (!isNaN(parsedQuantity) && parsedQuantity > 0 && parsedQuantity <= 1000) {
        setQuantity(parsedQuantity);
      }
    }
  }, [searchParams]);

  // Actualizar datos de vista previa cuando cambian los campos o la cantidad
  useEffect(() => {
    const selectedFields = fields.filter(field => field.selected);
    if (selectedFields.length > 0) {
      const data = generarMultiplesPersonas(quantity, selectedFields);
      setMockupData(data);
      
      // Actualizar parámetros de URL
      const fieldIds = selectedFields.map(field => field.id).join(',');
      setSearchParams({ fields: fieldIds, quantity: quantity.toString() });
    } else {
      setMockupData([]);
      setSearchParams({});
    }
  }, [fields, quantity, setSearchParams]);

  // Funciones para manejar interacciones
  const handleToggleField = (id: string) => {
    setFields(prevFields => 
      prevFields.map(field => 
        field.id === id 
          ? { ...field, selected: !field.selected } 
          : field
      )
    );
  };

  const handleSelectAll = () => {
    setFields(prevFields => 
      prevFields.map(field => ({ ...field, selected: true }))
    );
  };

  const handleDeselectAll = () => {
    setFields(prevFields => 
      prevFields.map(field => ({ ...field, selected: false }))
    );
  };

  const handleCopyJson = () => {
    const jsonString = JSON.stringify(mockupData, null, 2);
    navigator.clipboard.writeText(jsonString);
    alert('JSON copiado al portapapeles');
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="left-header">
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
            <span className="menu-icon"></span>
          </button>
          <h1>Mockup JSON Generator</h1>
        </div>
        <div className="right-header">
          <button 
            className={`docs-toggle ${showDocs ? 'active' : ''}`} 
            onClick={() => setShowDocs(!showDocs)}
          >
            {showDocs ? 'Ver JSON' : 'Ver Documentación'}
          </button>
          <Link to="/" className="back-home-button">
            Volver a Inicio
          </Link>
        </div>
      </header>
      <main className="main-content">
        <div className={`left-panel ${menuOpen ? 'open' : ''}`}>
          <div className="field-selector">
            <div className="field-selector-header">
              <h2>Seleccionar Campos</h2>
              <div className="field-selector-actions">
                <button onClick={handleSelectAll}>Seleccionar Todos</button>
                <button onClick={handleDeselectAll}>Deseleccionar Todos</button>
              </div>
            </div>
            <div className="fields-list">
              {fields.map(field => (
                <div key={field.id} className="field-item">
                  <label>
                    <input
                      type="checkbox"
                      checked={field.selected}
                      onChange={() => handleToggleField(field.id)}
                    />
                    {field.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="quantity-selector">
            <h2>Cantidad de Registros: {quantity}</h2>
            <input
              type="range"
              min="1"
              max="1000"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
              className="quantity-slider"
            />
            <div className="range-labels">
              <span>1</span>
              <span>500</span>
              <span>1000</span>
            </div>
          </div>
        </div>
        {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)}></div>}
        <div className="right-panel">
          {showDocs ? (
            <div className="documentation-section">
              <div className="docs-header">
                <h2>Documentación</h2>
              </div>
              <div className="docs-content">
                <section className="docs-intro">
                  <h3>🌟 Generador de Datos Ficticios Argentinos</h3>
                  <p>
                    Esta herramienta genera datos ficticios realistas de personas argentinas para desarrollo, testing y prototipado 
                    de aplicaciones. Los datos incluyen nombres, apellidos, direcciones, DNIs, teléfonos y más.
                  </p>
                </section>

                <section className="docs-features">
                  <h3>Características Principales</h3>
                  <ul>
                    <li><strong>Datos localizados:</strong> Nombres, apellidos, direcciones y teléfonos argentinos realistas</li>
                    <li><strong>Correlación inteligente:</strong> DNIs generados según rango de edad, teléfonos con prefijos correctos por ciudad</li>
                    <li><strong>Múltiples formatos:</strong> Consume la API vía REST o directamente desde esta interfaz</li>
                  </ul>
                </section>

                <section className="docs-api">
                  <h3>🌐 API REST</h3>
                  <p>
                    La API está disponible en <code>/api</code> y acepta solicitudes GET con diversos parámetros.
                  </p>
                  
                  <h4>Parámetros de la API</h4>
                  <table className="docs-table">
                    <thead>
                      <tr>
                        <th>Parámetro</th>
                        <th>Descripción</th>
                        <th>Ejemplo</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><code>cantidad</code></td>
                        <td>Cantidad de registros (1-1000)</td>
                        <td><code>cantidad=50</code></td>
                      </tr>
                      <tr>
                        <td><code>fields</code></td>
                        <td>Lista de campos separados por comas</td>
                        <td><code>fields=nombre,apellido,dni</code></td>
                      </tr>
                      <tr>
                        <td><code>allFields</code></td>
                        <td>Incluir todos los campos disponibles</td>
                        <td><code>allFields=true</code></td>
                      </tr>
                      <tr>
                        <td><code>download</code></td>
                        <td>Descargar como archivo</td>
                        <td><code>download=true</code></td>
                      </tr>
                    </tbody>
                  </table>
                </section>
                
                <section className="docs-fields">
                  <h3>📊 Campos Disponibles</h3>
                  <table className="docs-table">
                    <thead>
                      <tr>
                        <th>Campo</th>
                        <th>Descripción</th>
                        <th>Ejemplo</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><code>nombre</code></td>
                        <td>Nombre de pila argentino</td>
                        <td>"María", "Juan"</td>
                      </tr>
                      <tr>
                        <td><code>apellido</code></td>
                        <td>Apellido argentino</td>
                        <td>"González", "Rodríguez"</td>
                      </tr>
                      <tr>
                        <td><code>dni</code></td>
                        <td>Documento Nacional de Identidad</td>
                        <td>"28.456.789"</td>
                      </tr>
                      <tr>
                        <td><code>telefono</code></td>
                        <td>Teléfono fijo con código de área</td>
                        <td>"(221) 4567-8901"</td>
                      </tr>
                      <tr>
                        <td><code>celular</code></td>
                        <td>Celular con código de área</td>
                        <td>"(221) 15-4567-8901"</td>
                      </tr>
                      <tr>
                        <td><code>edad</code></td>
                        <td>Edad (correlacionada con DNI)</td>
                        <td>35</td>
                      </tr>
                      <tr>
                        <td><code>patente</code></td>
                        <td>Patente argentina</td>
                        <td>"AB 123 CD" o "ABC 123"</td>
                      </tr>
                    </tbody>
                  </table>
                </section>

                <section className="docs-example">
                  <h3>💡 Ejemplos de Uso</h3>
                  
                  <h4>Ejemplo de URL de API:</h4>
                  <pre className="code-example">
                    {`https://mockup-json.vercel.app/api?cantidad=10&fields=nombre,apellido,dni,telefono,celular`}
                  </pre>
                  
                  <h4>Ejemplo con JavaScript:</h4>
                  <pre className="code-example">
                    {`// Fetch para obtener datos
fetch('https://mockup-json.vercel.app/api?cantidad=20&fields=nombre,apellido,edad,ciudad,provincia')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // Usar los datos...
  });`}
                  </pre>
                </section>
                
                <section className="docs-dni-age">
                  <h3>🔄 Correlación Inteligente DNI-Edad</h3>
                  <p>
                    Los DNIs generados son coherentes con las edades asignadas. Los números de DNI más altos 
                    corresponden a personas más jóvenes, siguiendo la lógica real de asignación en Argentina.
                  </p>
                </section>
                
                <section className="docs-phone">
                  <h3>📱 Códigos de Área por Localidad</h3>
                  <p>
                    Los números de teléfono y celular generados tendrán códigos de área que corresponden
                    a la ciudad y provincia asignada a la persona, respetando los códigos reales de Argentina.
                  </p>
                </section>
              </div>
            </div>
          ) : (
            <div className="json-preview">
              <div className="preview-header">
                <h2>Vista Previa JSON</h2>
                <button onClick={handleCopyJson} className="copy-btn">Copiar JSON</button>
              </div>
              <div className="preview-content">
                <pre>{JSON.stringify(mockupData, null, 2)}</pre>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Generator;
