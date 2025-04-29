import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  const [activeTab, setActiveTab] = useState<'api' | 'generator'>('api');

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="logo-container">
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
        <Link to="/generator" className="action-button">Ir al Generador de Mockups</Link>
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
                <code>https://api-argenta.vercel.app/api</code>
                <button className="copy-btn" onClick={() => navigator.clipboard.writeText('https://api-argenta.vercel.app/api')}>
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
                  <code>https://api-argenta.vercel.app/api?cantidad=10&fields=nombre,apellido,dni</code>
                  <button className="copy-btn" onClick={() => navigator.clipboard.writeText('https://api-argenta.vercel.app/api?cantidad=10&fields=nombre,apellido,dni')}>
                    Copiar
                  </button>
                </div>
                <a href="https://api-argenta.vercel.app/api?cantidad=10&fields=nombre,apellido,dni" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="try-link">
                  Probar este endpoint
                </a>
              </div>
              
              <div className="example-block">
                <h4>Ejemplo 2: Obtener 5 personas con todos los campos disponibles</h4>
                <div className="code-block">
                  <code>https://api-argenta.vercel.app/api?cantidad=5&allFields=true</code>
                  <button className="copy-btn" onClick={() => navigator.clipboard.writeText('https://api-argenta.vercel.app/api?cantidad=5&allFields=true')}>
                    Copiar
                  </button>
                </div>
                <a href="https://api-argenta.vercel.app/api?cantidad=5&allFields=true" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="try-link">
                  Probar este endpoint
                </a>
              </div>
              
              <div className="example-block">
                <h4>Ejemplo 3: Uso con JavaScript (fetch)</h4>
                <div className="code-block js-code">
                  <pre>{`fetch('https://api-argenta.vercel.app/api?cantidad=20&fields=nombre,apellido,edad,domicilio')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // Usar los datos...
  });`}</pre>
                  <button className="copy-btn" onClick={() => navigator.clipboard.writeText(`fetch('https://api-argenta.vercel.app/api?cantidad=20&fields=nombre,apellido,edad,domicilio')
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
              <Link to="/generator" className="action-button big">Acceder al Generador de Mockups</Link>
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
        <p> 2025 Mockup JSON Argentina | Desarrollado para testing y prototipado</p>
      </footer>
    </div>
  );
}

export default Home;
