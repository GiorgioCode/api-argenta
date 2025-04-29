import { useState, useEffect } from 'react';
import ApiEndpoint from './components/ApiEndpoint';
import { camposDisponibles, generarMultiplesPersonas } from './utils/mockDataGenerator';
import './App.css';


function App() {
  // Detectar si estamos en modo API al inicio
  const isApiMode = window.location.search.includes('api=true') || 
                   window.location.search.includes('api=1') ||
                   window.location.pathname.includes('/api');
  
  // Si estamos en modo API, renderizar directamente el endpoint API
  if (isApiMode) {
    return <ApiEndpoint />;
  }

  const [activeTab, setActiveTab] = useState<'api' | 'generator'>('api');
  const [showGenerator, setShowGenerator] = useState(false);
  const [fields, setFields] = useState(
    camposDisponibles.map(campo => ({ ...campo, selected: false }))
  );
  const [quantity, setQuantity] = useState(10);
  const [mockupData, setMockupData] = useState<any[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);

  // Actualizar datos de vista previa cuando cambian los campos o la cantidad
  useEffect(() => {
    const selectedFields = fields.filter(field => field.selected);
    if (selectedFields.length > 0) {
      const data = generarMultiplesPersonas(quantity, selectedFields);
      setMockupData(data);
    } else {
      setMockupData([]);
    }
  }, [fields, quantity]);

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

  if (showGenerator) {
    return (
      <div className="app">
        <header className="app-header">
          <div className="left-header">
            <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
              <span className="menu-icon"></span>
            </button>
            <h1>Mockup JSON Generator</h1>
          </div>
          <button className="back-home-button" onClick={() => setShowGenerator(false)}>
            Volver a Documentación
          </button>
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
            <div className="json-preview">
              <div className="preview-header">
                <h2>Vista Previa JSON</h2>
                <button onClick={handleCopyJson} className="copy-btn">Copiar JSON</button>
              </div>
              <div className="preview-content">
                <pre>{JSON.stringify(mockupData, null, 2)}</pre>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="logo-container">
          <img src="/logo.png" alt="Mockup JSON Logo" className="home-logo" />
          <h1>Mockup JSON Argentina</h1>
          <p className="subtitle">Datos ficticios argentinos para desarrollo y testing</p>
        </div>
        <div className="tabs-container">
          <button 
            className={`tab-button ${activeTab === 'api' ? 'active' : ''}`}
            onClick={() => setActiveTab('api')}
          >
            API REST
          </button>
          <button 
            className={`tab-button ${activeTab === 'generator' ? 'active' : ''}`}
            onClick={() => setActiveTab('generator')}
          >
            Generador de Mockups
          </button>
        </div>
      </header>

      <div className="actions-section">
        <button className="action-button" onClick={() => setShowGenerator(true)}>
          Ir al Generador de Mockups
        </button>
      </div>

      <main className="home-main">
        {activeTab === 'api' ? (
          <section className="content-section api-section">
            <h2 className="section-title">API REST</h2>
            <p className="section-intro">
              Integra datos ficticios argentinos directamente en tu aplicación usando nuestra API REST.
              Obtén datos JSON con la estructura que necesites y la cantidad que requieras.
            </p>

            <div className="feature-card">
              <h3>URL Base</h3>
              <div className="code-block">
                <code>https://mockup-json.vercel.app/api</code>
                <button className="copy-btn" onClick={() => navigator.clipboard.writeText('https://mockup-json.vercel.app/api')}>
                  Copiar
                </button>
              </div>
            </div>

            <div className="feature-card">
              <h3>Parámetros de la API</h3>
              <table className="params-table">
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
                    <td>Número de registros a generar (1-1000)</td>
                    <td><code>cantidad=50</code></td>
                  </tr>
                  <tr>
                    <td><code>fields</code></td>
                    <td>Campos específicos a incluir (separados por coma)</td>
                    <td><code>fields=nombre,apellido,dni</code></td>
                  </tr>
                  <tr>
                    <td><code>allFields</code></td>
                    <td>Incluir todos los campos disponibles</td>
                    <td><code>allFields=true</code></td>
                  </tr>
                  <tr>
                    <td><code>download</code></td>
                    <td>Descargar resultado como archivo JSON</td>
                    <td><code>download=true</code></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="feature-card">
              <h3>Ejemplos de uso</h3>
              
              <div className="example-block">
                <h4>Ejemplo 1: Obtener 10 personas con nombre, apellido y DNI</h4>
                <div className="code-block">
                  <code>https://mockup-json.vercel.app/api?cantidad=10&fields=nombre,apellido,dni</code>
                  <button className="copy-btn" onClick={() => navigator.clipboard.writeText('https://mockup-json.vercel.app/api?cantidad=10&fields=nombre,apellido,dni')}>
                    Copiar
                  </button>
                </div>
                <a href="https://mockup-json.vercel.app/api?cantidad=10&fields=nombre,apellido,dni" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="try-link">
                  Probar este endpoint
                </a>
              </div>
              
              <div className="example-block">
                <h4>Ejemplo 2: Obtener 5 personas con todos los campos disponibles</h4>
                <div className="code-block">
                  <code>https://mockup-json.vercel.app/api?cantidad=5&allFields=true</code>
                  <button className="copy-btn" onClick={() => navigator.clipboard.writeText('https://mockup-json.vercel.app/api?cantidad=5&allFields=true')}>
                    Copiar
                  </button>
                </div>
                <a href="https://mockup-json.vercel.app/api?cantidad=5&allFields=true" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="try-link">
                  Probar este endpoint
                </a>
              </div>
              
              <div className="example-block">
                <h4>Ejemplo 3: Uso con JavaScript (fetch)</h4>
                <div className="code-block js-code">
                  <pre>{`fetch('https://mockup-json.vercel.app/api?cantidad=20&fields=nombre,apellido,edad,domicilio')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // Usar los datos...
  });`}</pre>
                  <button className="copy-btn" onClick={() => navigator.clipboard.writeText(`fetch('https://mockup-json.vercel.app/api?cantidad=20&fields=nombre,apellido,edad,domicilio')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // Usar los datos...
  });`)}>
                    Copiar
                  </button>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className="content-section generator-section">
            <h2 className="section-title">Generador de Mockups JSON</h2>
            <p className="section-intro">
              Crea datos de prueba personalizados seleccionando exactamente los campos que necesitas
              y la cantidad de registros a generar, con una interfaz visual interactiva.
            </p>

            <div className="feature-card">
              <h3>¿Qué ofrece el Generador?</h3>
              <ul className="feature-list">
                <li>
                  <span className="feature-icon">✓</span>
                  <span>Selección visual de campos específicos a incluir</span>
                </li>
                <li>
                  <span className="feature-icon">✓</span>
                  <span>Vista previa instantánea del JSON generado</span>
                </li>
                <li>
                  <span className="feature-icon">✓</span>
                  <span>Opción para copiar el JSON al portapapeles</span>
                </li>
                <li>
                  <span className="feature-icon">✓</span>
                  <span>Ajuste de cantidad de registros mediante slider</span>
                </li>
                <li>
                  <span className="feature-icon">✓</span>
                  <span>URL compartible con la configuración actual</span>
                </li>
              </ul>
            </div>

            <div className="feature-card">
              <h3>Campos disponibles</h3>
              <div className="fields-grid">
                <div className="field-item">
                  <span className="field-name">nombre</span>
                  <span className="field-desc">Nombre de pila argentino</span>
                </div>
                <div className="field-item">
                  <span className="field-name">apellido</span>
                  <span className="field-desc">Apellido argentino</span>
                </div>
                <div className="field-item">
                  <span className="field-name">dni</span>
                  <span className="field-desc">DNI argentino con formato</span>
                </div>
                <div className="field-item">
                  <span className="field-name">edad</span>
                  <span className="field-desc">Edad (correlacionada con DNI)</span>
                </div>
                <div className="field-item">
                  <span className="field-name">telefono</span>
                  <span className="field-desc">Teléfono fijo con código de área</span>
                </div>
                <div className="field-item">
                  <span className="field-name">celular</span>
                  <span className="field-desc">Celular con código de área</span>
                </div>
                <div className="field-item">
                  <span className="field-name">domicilio</span>
                  <span className="field-desc">Dirección con calle y número</span>
                </div>
                <div className="field-item">
                  <span className="field-name">ciudad</span>
                  <span className="field-desc">Ciudad argentina</span>
                </div>
                <div className="field-item">
                  <span className="field-name">provincia</span>
                  <span className="field-desc">Provincia argentina</span>
                </div>
                <div className="field-item">
                  <span className="field-name">codigoPostal</span>
                  <span className="field-desc">Código postal argentino</span>
                </div>
                <div className="field-item">
                  <span className="field-name">marcaVehiculo</span>
                  <span className="field-desc">Marca de vehículo</span>
                </div>
                <div className="field-item">
                  <span className="field-name">modeloVehiculo</span>
                  <span className="field-desc">Modelo de vehículo</span>
                </div>
                <div className="field-item">
                  <span className="field-name">patente</span>
                  <span className="field-desc">Patente de vehículo argentina</span>
                </div>
              </div>
            </div>

            <div className="cta-container">
              <button className="action-button big" onClick={() => setShowGenerator(true)}>
                Acceder al Generador de Mockups
              </button>
            </div>
          </section>
        )}

        <section className="content-section special-features">
          <h2 className="section-title">Características Especiales</h2>
          
          <div className="feature-card highlight">
            <h3>Correlación Inteligente DNI-Edad</h3>
            <p>
              Los DNI generados son coherentes con las edades asignadas. Los números más altos
              corresponden a personas más jóvenes, siguiendo la lógica real de asignación en Argentina.
            </p>
          </div>
          
          <div className="feature-card highlight">
            <h3>Códigos de Área por Localidad</h3>
            <p>
              Los números de teléfono y celular generados tienen códigos de área que corresponden
              a la ciudad y provincia asignada a la persona, respetando los códigos reales de Argentina.
            </p>
          </div>
        </section>
      </main>

      <footer className="home-footer">
        <p>© 2025 Mockup JSON Argentina | Desarrollado para testing y prototipado</p>
      </footer>
    </div>
  );
}

export default App;
