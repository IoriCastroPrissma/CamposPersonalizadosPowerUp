import { BoardConfig, FieldGroup, Field } from './types';

export const DEFAULT_GROUPS: FieldGroup[] = [
  {
    id: 'group-geral',
    name: 'Informações Gerais',
    order: 0,
    description: 'Campos principais do cartão'
  },
  {
    id: 'group-financeiro',
    name: 'Financeiro & Contratos',
    order: 1,
    description: 'Dados financeiros e prazos de faturamento'
  }
];

export const DEFAULT_FIELDS: Field[] = [
  {
    id: 'field-cliente',
    name: 'Nome do Cliente',
    type: 'text',
    placeholder: 'Ex: Atlassian Inc.',
    groupId: 'group-geral',
    order: 0,
    required: true
  },
  {
    id: 'field-prioridade',
    name: 'Prioridade Executiva',
    type: 'select',
    options: ['Alta', 'Média', 'Baixa'],
    groupId: 'group-geral',
    order: 1
  },
  {
    id: 'field-descricao-detalhada',
    name: 'Observações Internas',
    type: 'paragraph',
    placeholder: 'Escreva detalhes privados que não devem ser expostos...',
    groupId: 'group-geral',
    order: 2
  },
  {
    id: 'field-valor',
    name: 'Valor do Contrato (R$)',
    type: 'number',
    placeholder: 'Ex: 5000',
    groupId: 'group-financeiro',
    order: 0
  },
  {
    id: 'field-faturado',
    name: 'Contrato Faturado?',
    type: 'checkbox',
    groupId: 'group-financeiro',
    order: 1
  },
  {
    id: 'field-data-faturamento',
    name: 'Data de Faturamento',
    type: 'date',
    groupId: 'group-financeiro',
    order: 2,
    // Campo dependente: só aparece se 'Contrato Faturado?' for marcado (true)
    dependency: {
      fieldId: 'field-faturado',
      value: 'true'
    }
  }
];

export const INITIAL_CONFIG: BoardConfig = {
  groups: DEFAULT_GROUPS,
  fields: DEFAULT_FIELDS,
  templates: [
    {
      id: 'template-padrao',
      name: 'Template Comercial Padrão',
      description: 'Estrutura padrão para controle de vendas e contratos',
      groups: DEFAULT_GROUPS,
      fields: DEFAULT_FIELDS
    }
  ],
  activeTemplateId: 'template-padrao'
};
