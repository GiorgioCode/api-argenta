import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { camposDisponibles, generarMultiplesPersonas } from '../utils/mockDataGenerator';

function Generator() {
  const [fields, setFields] = useState(
    camposDisponibles.map((field) => ({ id: field, name: field, selected: false }))
  );
  const [quantity, setQuantity] = useState(10);
  const [mockupData, setMockupData] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [showDocs, setShowDocs] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  // Process URL parameters on load
  useEffect(() => {
    const fieldsParam = searchParams.get('fields');
    const quantityParam = searchParams.get('cantidad');
    const showDocsParam = searchParams.get('docs');

    if (fieldsParam) {
      const selectedFields = fieldsParam.split(',');
      setFields(fields.map(field => ({
        ...field,
        selected: selectedFields.includes(field.id)
      })));
    }

    if (quantityParam) {
      const parsedQuantity = parseInt(quantityParam, 10);
      if (!isNaN(parsedQuantity) && parsedQuantity > 0 && parsedQuantity <= 1000) {
        setQuantity(parsedQuantity);
      }
    }

    if (showDocsParam === 'true') {
      setShowDocs(true);
    }

    // Generate data based on URL params if needed
    if (fieldsParam || quantityParam) {
      generateMockupData(
        fields.filter(field => selectedFields?.includes(field.id) || false).map(f => f.id),
        quantityParam ? parseInt(quantityParam, 10) : quantity
      );
    }
  }, []);

  const handleToggleField = (fieldId) => {
    setFields(fields.map(field => 
      field.id === fieldId 
        ? { ...field, selected: !field.selected } 
        : field
    ));
  };

  const handleSelectAll = () => {
    setFields(fields.map(field => ({ ...field, selected: true })));
  };

  const handleDeselectAll = () => {
    setFields(fields.map(field => ({ ...field, selected: false })));
  };

  const generateMockupData = (selectedFields, count) => {
    const data = generarMultiplesPersonas(count, selectedFields);
    setMockupData(data);
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(mockupData, null, 2))
      .then(() => alert('JSON copiado al portapapeles'))
      .catch(err => console.error('Error al copiar:', err));
  };

  const mainStyle = {
    display: 'flex',
    flexDirection: 'column' as 'column',
    minHeight: '100vh',
    background: darkMode ? '#171923' : '#f8f9fa',
    color: darkMode ? 'white' : '#333'
  };

  const headerStyle = {
    background: darkMode ? '#1a202c' : '#f8f9fa',
    borderBottom: `1px solid ${darkMode ? '#2d3748' : '#e0e0e0'}`,
    padding: '1rem 0',
    color: darkMode ? 'white' : '#333',
    position: 'sticky' as 'sticky',
    top: 0,
    zIndex: 10
  };

  const containerStyle = {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem'
  };

  const headerContentStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const titleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: darkMode ? '#3392ff' : '#0077ff'
  };

  const headerActionsStyle = {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center'
  };

  const themeButtonStyle = {
    background: 'none',
    border: 'none',
    fontSize: '1.25rem',
    cursor: 'pointer',
    padding: '0.25rem',
    borderRadius: '9999px'
  };

  const backButtonStyle = {
    display: 'inline-block',
    padding: '0.5rem 1rem',
    background: darkMode ? '#3392ff' : '#0077ff',
    color: 'white',
    borderRadius: '9999px',
    textDecoration: 'none',
    fontWeight: '500'
  };

  const mainContentStyle = {
    padding: '2rem 0',
    flex: 1
  };

  const gridLayoutStyle = {
    display: 'grid',
    gridTemplateColumns: 'minmax(320px, 1fr) minmax(320px, 1fr)',
    gap: '2rem',
    padding: '2rem 0'
  };

  const controlsPanelStyle = {
    display: 'flex',
    flexDirection: 'column' as 'column',
    gap: '1.5rem'
  };

  return (
    <div style={mainStyle}>
      <header style={headerStyle}>
        <div style={containerStyle}>
          <div style={headerContentStyle}>
            <h1 style={titleStyle}>Mockup JSON Generator</h1>
            
            <div style={headerActionsStyle}>
              <button 
                style={themeButtonStyle}
                onClick={() => setDarkMode(!darkMode)}
                aria-label="Toggle dark mode"
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
              
              <Link to="/" style={backButtonStyle}>
                Volver a Inicio
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main style={mainContentStyle}>
        <div style={containerStyle}>
          <div style={gridLayoutStyle}>
            <div style={controlsPanelStyle}>
              <section style={{
                background: darkMode ? '#2d3748' : 'white',
                borderRadius: '8px',
                padding: '1.5rem',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                border: `1px solid ${darkMode ? '#4a5568' : '#e0e0e0'}`
              }}>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: darkMode ? '#3392ff' : '#0077ff' }}>Campos Disponibles</h2>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                  gap: '0.75rem',
                  marginBottom: '1rem'
                }}>
                  {fields.map(field => (
                    <div key={field.id} style={{
                      background: darkMode ? '#3a4a5e' : '#f8f9fa',
                      borderRadius: '4px',
                      padding: '0.75rem',
                      border: `1px solid ${darkMode ? '#4a5568' : '#e0e0e0'}`
                    }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={field.selected}
                          onChange={() => handleToggleField(field.id)}
                          style={{ accentColor: darkMode ? '#3392ff' : '#0077ff' }}
                        />
                        {field.name}
                      </label>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                  <button 
                    onClick={handleSelectAll} 
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '9999px',
                      background: darkMode ? '#3a4a5e' : '#f8f9fa',
                      color: darkMode ? 'white' : '#333',
                      border: `1px solid ${darkMode ? '#4a5568' : '#e0e0e0'}`,
                      cursor: 'pointer'
                    }}
                  >
                    Seleccionar Todos
                  </button>
                  <button 
                    onClick={handleDeselectAll} 
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '9999px',
                      background: darkMode ? '#3a4a5e' : '#f8f9fa',
                      color: darkMode ? 'white' : '#333',
                      border: `1px solid ${darkMode ? '#4a5568' : '#e0e0e0'}`,
                      cursor: 'pointer'
                    }}
                  >
                    Deseleccionar Todos
                  </button>
                </div>
              </section>

              <section style={{
                background: darkMode ? '#2d3748' : 'white',
                borderRadius: '8px',
                padding: '1.5rem',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                border: `1px solid ${darkMode ? '#4a5568' : '#e0e0e0'}`
              }}>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: darkMode ? '#3392ff' : '#0077ff' }}>Cantidad de Registros</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <input
                    type="number"
                    value={quantity}
                    onChange={e => setQuantity(Math.min(1000, Math.max(1, parseInt(e.target.value, 10) || 1)))}
                    style={{ 
                      width: '4rem', 
                      padding: '0.5rem',
                      border: `1px solid ${darkMode ? '#4a5568' : '#e0e0e0'}`,
                      borderRadius: '4px',
                      background: darkMode ? '#3a4a5e' : 'white',
                      color: darkMode ? 'white' : '#333'
                    }}
                  />
                  <input
                    type="range"
                    min="1"
                    max="1000"
                    step="1"
                    value={quantity}
                    onChange={e => setQuantity(parseInt(e.target.value, 10))}
                    style={{ 
                      flex: 1, 
                      accentColor: darkMode ? '#3392ff' : '#0077ff'
                    }}
                  />
                </div>
              </section>

              <button 
                onClick={() => generateMockupData(
                  fields.filter(f => f.selected).map(f => f.id),
                  quantity
                )} 
                style={{
                  padding: '0.75rem 1.5rem',
                  fontSize: '1rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  alignSelf: 'flex-start',
                  background: darkMode ? '#3392ff' : '#0077ff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '9999px',
                  cursor: 'pointer'
                }}
              >
                Generar Datos
              </button>
            </div>

            <div style={{
              background: darkMode ? '#2d3748' : 'white',
              borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              border: `1px solid ${darkMode ? '#4a5568' : '#e0e0e0'}`,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column' as 'column',
              height: '100%',
              minHeight: '600px'
            }}>
              <div style={{
                padding: '1rem',
                borderBottom: `1px solid ${darkMode ? '#4a5568' : '#e0e0e0'}`,
                display: 'flex',
                justifyContent: 'flex-end'
              }}>
                <button 
                  style={{
                    padding: '0.5rem 1rem',
                    border: 'none',
                    background: showDocs 
                      ? (darkMode ? '#3392ff' : '#0077ff')
                      : (darkMode ? '#3a4a5e' : '#f8f9fa'),
                    color: showDocs ? 'white' : (darkMode ? 'white' : '#333'),
                    borderRadius: '9999px',
                    cursor: 'pointer'
                  }}
                  onClick={() => setShowDocs(!showDocs)}
                >
                  {showDocs ? 'Ver JSON' : 'Ver Documentación'}
                </button>
              </div>
              
              {showDocs ? (
                <div style={{ 
                  padding: '1.5rem',
                  overflowY: 'auto' as 'auto',
                  height: '100%',
                  color: darkMode ? '#f8f9fa' : '#333'
                }}>
                  <h2 style={{ marginBottom: '1rem', color: darkMode ? '#3392ff' : '#0077ff' }}>📚 Documentación de Campos</h2>
                  <p style={{ marginBottom: '1.5rem', color: darkMode ? '#cbd5e0' : '#666' }}>Esta API genera datos ficticios contextualizados para Argentina, ideales para testing y prototipado.</p>
                  
                  <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem', color: darkMode ? '#3392ff' : '#0077ff' }}>📋 Campos Disponibles</h3>
                    <table style={{ 
                      width: '100%',
                      borderCollapse: 'collapse' as 'collapse',
                      marginBottom: '1.5rem' 
                    }}>
                      <thead>
                        <tr key="table-header-row">
                          <th key="header-campo" style={{ 
                            padding: '0.75rem', 
                            textAlign: 'left' as 'left', 
                            borderBottom: `1px solid ${darkMode ? '#4a5568' : '#e0e0e0'}`,
                            background: darkMode ? '#3a4a5e' : '#f8f9fa',
                            color: darkMode ? '#3392ff' : '#0077ff'
                          }}>Campo</th>
                          <th key="header-desc" style={{ 
                            padding: '0.75rem', 
                            textAlign: 'left' as 'left', 
                            borderBottom: `1px solid ${darkMode ? '#4a5568' : '#e0e0e0'}`,
                            background: darkMode ? '#3a4a5e' : '#f8f9fa',
                            color: darkMode ? '#3392ff' : '#0077ff'
                          }}>Descripción</th>
                          <th key="header-ejemplo" style={{ 
                            padding: '0.75rem', 
                            textAlign: 'left' as 'left', 
                            borderBottom: `1px solid ${darkMode ? '#4a5568' : '#e0e0e0'}`,
                            background: darkMode ? '#3a4a5e' : '#f8f9fa',
                            color: darkMode ? '#3392ff' : '#0077ff'
                          }}>Ejemplo</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr key="row-nombre">
                          <td key="cell-nombre-1" style={{ padding: '0.75rem', borderBottom: `1px solid ${darkMode ? '#4a5568' : '#e0e0e0'}` }}><code style={{ fontFamily: 'monospace' }}>nombre</code></td>
                          <td key="cell-nombre-2" style={{ padding: '0.75rem', borderBottom: `1px solid ${darkMode ? '#4a5568' : '#e0e0e0'}` }}>Nombre de pila argentino</td>
                          <td key="cell-nombre-3" style={{ padding: '0.75rem', borderBottom: `1px solid ${darkMode ? '#4a5568' : '#e0e0e0'}` }}>"María", "Juan"</td>
                        </tr>
                        <tr key="row-apellido">
                          <td key="cell-apellido-1" style={{ padding: '0.75rem', borderBottom: `1px solid ${darkMode ? '#4a5568' : '#e0e0e0'}` }}><code style={{ fontFamily: 'monospace' }}>apellido</code></td>
                          <td key="cell-apellido-2" style={{ padding: '0.75rem', borderBottom: `1px solid ${darkMode ? '#4a5568' : '#e0e0e0'}` }}>Apellido argentino</td>
                          <td key="cell-apellido-3" style={{ padding: '0.75rem', borderBottom: `1px solid ${darkMode ? '#4a5568' : '#e0e0e0'}` }}>"González", "Rodríguez"</td>
                        </tr>
                        <tr key="row-dni">
                          <td key="cell-dni-1" style={{ padding: '0.75rem', borderBottom: `1px solid ${darkMode ? '#4a5568' : '#e0e0e0'}` }}><code style={{ fontFamily: 'monospace' }}>dni</code></td>
                          <td key="cell-dni-2" style={{ padding: '0.75rem', borderBottom: `1px solid ${darkMode ? '#4a5568' : '#e0e0e0'}` }}>Documento Nacional de Identidad</td>
                          <td key="cell-dni-3" style={{ padding: '0.75rem', borderBottom: `1px solid ${darkMode ? '#4a5568' : '#e0e0e0'}` }}>"28.456.789"</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem', color: darkMode ? '#3392ff' : '#0077ff' }}>💡 Ejemplos de Uso</h3>
                    
                    <h4 style={{ margin: '1rem 0 0.5rem', fontSize: '1rem' }}>Ejemplo de URL de API:</h4>
                    <pre style={{
                      background: darkMode ? '#3a4a5e' : '#f8f9fa',
                      padding: '1rem',
                      borderRadius: '4px',
                      overflow: 'auto' as 'auto',
                      fontFamily: 'monospace',
                      margin: '1rem 0',
                      border: `1px solid ${darkMode ? '#4a5568' : '#e0e0e0'}`
                    }}>
                      https://api-argenta.vercel.app/api?cantidad=10&fields=nombre,apellido,dni,telefono,celular
                    </pre>
                    
                    <h4 style={{ margin: '1rem 0 0.5rem', fontSize: '1rem' }}>Ejemplo con JavaScript:</h4>
                    <pre style={{
                      background: darkMode ? '#3a4a5e' : '#f8f9fa',
                      padding: '1rem',
                      borderRadius: '4px',
                      overflow: 'auto' as 'auto',
                      fontFamily: 'monospace',
                      margin: '1rem 0',
                      border: `1px solid ${darkMode ? '#4a5568' : '#e0e0e0'}`
                    }}>
                      {`// Fetch para obtener datos
fetch('https://api-argenta.vercel.app/api?cantidad=20&fields=nombre,apellido,edad,ciudad,provincia')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // Usar los datos...
  });`}
                    </pre>
                  </div>
                </div>
              ) : (
                <div style={{ 
                  display: 'flex',
                  flexDirection: 'column' as 'column',
                  height: '100%',
                  padding: '1.5rem'
                }}>
                  <div style={{ 
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem'
                  }}>
                    <h2 style={{ color: darkMode ? '#3392ff' : '#0077ff' }}>Vista Previa JSON</h2>
                    <button 
                      onClick={handleCopyJson} 
                      style={{
                        padding: '0.25rem 0.75rem',
                        background: darkMode ? '#3a4a5e' : '#f8f9fa',
                        border: `1px solid ${darkMode ? '#4a5568' : '#e0e0e0'}`,
                        borderRadius: '9999px',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                        color: darkMode ? 'white' : '#333'
                      }}
                    >
                      Copiar JSON
                    </button>
                  </div>
                  <pre style={{
                    flex: 1,
                    background: darkMode ? '#3a4a5e' : '#f8f9fa',
                    padding: '1rem',
                    borderRadius: '4px',
                    overflow: 'auto' as 'auto',
                    fontFamily: 'monospace',
                    border: `1px solid ${darkMode ? '#4a5568' : '#e0e0e0'}`,
                    height: '100%',
                    whiteSpace: 'pre-wrap' as 'pre-wrap',
                    color: darkMode ? '#f8f9fa' : '#333'
                  }}>
                    {JSON.stringify(mockupData, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Generator;
