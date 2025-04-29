// Definición de tipos para Mockup JSON Argentina

// Tipo para los campos disponibles en el generador de datos
export interface FieldType {
  id: string;
  name: string;
  label: string;
  selected: boolean;
}

// Tipo para los modos de tema (claro/oscuro)
export type ThemeMode = 'light' | 'dark';

// Tipo para los datos generados de una persona
export interface MockupPerson {
  [key: string]: any;
  nombre?: string;
  apellido?: string;
  dni?: string;
  edad?: number;
  domicilio?: string;
  ciudad?: string;
  partido?: string;
  provincia?: string;
  codigoPostal?: string;
  telefono?: string;
  celular?: string;
  marcaVehiculo?: string;
  modeloVehiculo?: string;
  patente?: string;
}
