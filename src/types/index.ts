export type FieldType = {
  id: string;
  name: string;
  label: string;
  selected: boolean;
};

export type MockupPerson = {
  [key: string]: string | number;
};

export type ThemeMode = 'light' | 'dark';
