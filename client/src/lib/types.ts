export type FieldType = 
  | 'text' 
  | 'paragraph' 
  | 'number' 
  | 'date' 
  | 'checkbox' 
  | 'select' 
  | 'multiselect';

export interface Field {
  id: string;
  name: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  options?: string[]; // Para 'select' e 'multiselect'
  groupId?: string; // ID do grupo a que pertence
  order: number;
  
  // Regras de dependência (Campos Dependentes)
  dependency?: {
    fieldId: string; // Campo pai do qual depende
    value: string; // Valor que o campo pai deve ter para este campo aparecer
  };
}

export interface FieldGroup {
  id: string;
  name: string;
  order: number;
  description?: string;
}

export interface Template {
  id: string;
  name: string;
  description?: string;
  groups: FieldGroup[];
  fields: Field[];
}

export interface BoardConfig {
  groups: FieldGroup[];
  fields: Field[];
  templates: Template[];
  activeTemplateId?: string;
}

// Valores salvos nos cartões
export interface CardValues {
  [fieldId: string]: any;
}
