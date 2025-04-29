import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.tsx'
import ApiEndpoint from './components/ApiEndpoint.tsx'
import Home from './components/Home.tsx'
import './index.css'
import './App.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generator" element={<App />} />
        <Route path="/api" element={<ApiEndpoint />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
