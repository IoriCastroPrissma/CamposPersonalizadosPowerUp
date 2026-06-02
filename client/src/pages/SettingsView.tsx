import React, { useState, useEffect } from 'react';
import { getTrelloInstance } from '../lib/trello';
import { BoardConfig, Field, FieldGroup, Template, FieldType } from '../lib/types';
import { INITIAL_CONFIG } from '../lib/defaults';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { 
  Plus, Trash2, Edit, Save, FolderPlus, LayoutTemplate, 
  ArrowUp, ArrowDown, HelpCircle, Eye, Settings, FileText, CheckSquare, Calendar, List, Check
} from 'lucide-react';

export default function SettingsView() {
  const t = getTrelloInstance();
  const [config, setConfig] = useState<BoardConfig>(INITIAL_CONFIG);
  const [activeTab, setActiveTab] = useState('fields');
  const [loading, setLoading] = useState(true);

  // Estados para edição/criação de Campos
  const [editingFieldId, setEditingFieldId] = useState<string | null>(null);
  const [fieldName, setFieldName] = useState('');
  const [fieldType, setFieldType] = useState<FieldType>('text');
  const [fieldPlaceholder, setFieldPlaceholder] = useState('');
  const [fieldRequired, setFieldRequired] = useState(false);
  const [fieldGroupId, setFieldGroupId] = useState('');
  const [fieldOptions, setFieldOptions] = useState('');
  
  // Dependências
  const [fieldHasDependency, setFieldHasDependency] = useState(false);
  const [fieldDepId, setFieldDepId] = useState('');
  const [fieldDepValue, setFieldDepValue] = useState('');

  // Estados para edição/criação de Grupos
  const [editingGroupId, setEditingGroupId] = useState<string | null>(null);
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');

  // Estados para Templates
  const [newTemplateName, setNewTemplateName] = useState('');
  const [newTemplateDesc, setNewTemplateDescription] = useState('');

  useEffect(() => {
    // Carregar configurações salvas no nível do Quadro (board)
    t.get('board', 'shared', 'private-fields-config')
      .then((savedConfig: BoardConfig | null) => {
        if (savedConfig && savedConfig.fields && savedConfig.groups) {
          setConfig(savedConfig);
        } else {
          // Se não houver configuração, salvar a padrão
          t.set('board', 'shared', 'private-fields-config', INITIAL_CONFIG);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erro ao carregar configurações:', err);
        setLoading(false);
      });
  }, []);

  // Redimensionar modal quando o conteúdo mudar
  useEffect(() => {
    t.sizeTo('#settings-container');
  }, [config, activeTab, editingFieldId, editingGroupId]);

  const saveConfig = async (newConfig: BoardConfig) => {
    try {
      setConfig(newConfig);
      await t.set('board', 'shared', 'private-fields-config', newConfig);
      toast.success('Configurações salvas com sucesso!');
    } catch (err) {
      console.error(err);
      toast.error('Erro ao salvar configurações no Trello.');
    }
  };

  // --- FUNÇÕES DE GERENCIAMENTO DE GRUPOS ---
  const handleSaveGroup = () => {
    if (!groupName.trim()) {
      toast.error('O nome do grupo é obrigatório.');
      return;
    }

    let updatedGroups = [...config.groups];

    if (editingGroupId === 'new') {
      const newGroup: FieldGroup = {
        id: `group-${Date.now()}`,
        name: groupName,
        description: groupDescription,
        order: config.groups.length
      };
      updatedGroups.push(newGroup);
      toast.success('Grupo criado!');
    } else if (editingGroupId) {
      updatedGroups = updatedGroups.map(g => 
        g.id === editingGroupId 
          ? { ...g, name: groupName, description: groupDescription } 
          : g
      );
      toast.success('Grupo atualizado!');
    }

    const newConfig = { ...config, groups: updatedGroups };
    saveConfig(newConfig);
    resetGroupForm();
  };

  const handleDeleteGroup = (groupId: string) => {
    // Impedir deleção se houver campos no grupo
    const hasFields = config.fields.some(f => f.groupId === groupId);
    if (hasFields) {
      toast.error('Não é possível excluir um grupo que contém campos. Mova os campos primeiro.');
      return;
    }

    const updatedGroups = config.groups
      .filter(g => g.id !== groupId)
      .map((g, idx) => ({ ...g, order: idx }));

    saveConfig({ ...config, groups: updatedGroups });
  };

  const moveGroup = (index: number, direction: 'up' | 'down') => {
    const newGroups = [...config.groups];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex < 0 || targetIndex >= newGroups.length) return;

    // Swap
    const temp = newGroups[index];
    newGroups[index] = newGroups[targetIndex];
    newGroups[targetIndex] = temp;

    // Re-index order
    const updated = newGroups.map((g, idx) => ({ ...g, order: idx }));
    saveConfig({ ...config, groups: updated });
  };

  const resetGroupForm = () => {
    setEditingGroupId(null);
    setGroupName('');
    setGroupDescription('');
  };

  // --- FUNÇÕES DE GERENCIAMENTO DE CAMPOS ---
  const handleSaveField = () => {
    if (!fieldName.trim()) {
      toast.error('O nome do campo é obrigatório.');
      return;
    }

    let updatedFields = [...config.fields];
    const optionsArray = fieldOptions
      ? fieldOptions.split('\n').map(o => o.trim()).filter(Boolean)
      : [];

    const dependencyObj = fieldHasDependency && fieldDepId && fieldDepValue
      ? { fieldId: fieldDepId, value: fieldDepValue }
      : undefined;

    if (editingFieldId === 'new') {
      const newField: Field = {
        id: `field-${Date.now()}`,
        name: fieldName,
        type: fieldType,
        placeholder: fieldPlaceholder,
        required: fieldRequired,
        groupId: fieldGroupId || undefined,
        options: optionsArray.length > 0 ? optionsArray : undefined,
        dependency: dependencyObj,
        order: config.fields.length
      };
      updatedFields.push(newField);
      toast.success('Campo criado!');
    } else if (editingFieldId) {
      updatedFields = updatedFields.map(f => 
        f.id === editingFieldId 
          ? { 
              ...f, 
              name: fieldName, 
              type: fieldType, 
              placeholder: fieldPlaceholder, 
              required: fieldRequired,
              groupId: fieldGroupId || undefined,
              options: optionsArray.length > 0 ? optionsArray : undefined,
              dependency: dependencyObj
            } 
          : f
      );
      toast.success('Campo atualizado!');
    }

    saveConfig({ ...config, fields: updatedFields });
    resetFieldForm();
  };

  const handleDeleteField = (fieldId: string) => {
    const updatedFields = config.fields
      .filter(f => f.id !== fieldId)
      .map((f, idx) => ({ ...f, order: idx }));

    saveConfig({ ...config, fields: updatedFields });
  };

  const moveField = (index: number, direction: 'up' | 'down') => {
    const newFields = [...config.fields];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex < 0 || targetIndex >= newFields.length) return;

    // Swap
    const temp = newFields[index];
    newFields[index] = newFields[targetIndex];
    newFields[targetIndex] = temp;

    // Re-index order
    const updated = newFields.map((f, idx) => ({ ...f, order: idx }));
    saveConfig({ ...config, fields: updated });
  };

  const startEditField = (field: Field) => {
    setEditingFieldId(field.id);
    setFieldName(field.name);
    setFieldType(field.type);
    setFieldPlaceholder(field.placeholder || '');
    setFieldRequired(field.required || false);
    setFieldGroupId(field.groupId || '');
    setFieldOptions(field.options ? field.options.join('\n') : '');
    setFieldHasDependency(!!field.dependency);
    setFieldDepId(field.dependency?.fieldId || '');
    setFieldDepValue(field.dependency?.value || '');
  };

  const resetFieldForm = () => {
    setEditingFieldId(null);
    setFieldName('');
    setFieldType('text');
    setFieldPlaceholder('');
    setFieldRequired(false);
    setFieldGroupId('');
    setFieldOptions('');
    setFieldHasDependency(false);
    setFieldDepId('');
    setFieldDepValue('');
  };

  // --- FUNÇÕES DE TEMPLATE ---
  const handleCreateTemplate = () => {
    if (!newTemplateName.trim()) {
      toast.error('O nome do template é obrigatório.');
      return;
    }

    const newTemplate: Template = {
      id: `template-${Date.now()}`,
      name: newTemplateName,
      description: newTemplateDesc,
      groups: [...config.groups],
      fields: [...config.fields]
    };

    const updatedTemplates = [...config.templates, newTemplate];
    saveConfig({
      ...config,
      templates: updatedTemplates,
      activeTemplateId: newTemplate.id
    });

    setNewTemplateName('');
    setNewTemplateDescription('');
    toast.success('Template comercial salvo com sucesso!');
  };

  const handleApplyTemplate = (templateId: string) => {
    const template = config.templates.find(t => t.id === templateId);
    if (!template) return;

    saveConfig({
      ...config,
      groups: template.groups,
      fields: template.fields,
      activeTemplateId: templateId
    });
    toast.success(`Template "${template.name}" aplicado!`);
  };

  const handleDeleteTemplate = (templateId: string) => {
    if (config.templates.length <= 1) {
      toast.error('Você deve manter pelo menos um template.');
      return;
    }

    const updatedTemplates = config.templates.filter(t => t.id !== templateId);
    const activeId = config.activeTemplateId === templateId ? updatedTemplates[0].id : config.activeTemplateId;

    saveConfig({
      ...config,
      templates: updatedTemplates,
      activeTemplateId: activeId
    });
    toast.success('Template removido.');
  };

  const getFieldIcon = (type: FieldType) => {
    switch (type) {
      case 'text': return <FileText className="h-4 w-4 text-blue-500" />;
      case 'paragraph': return <HelpCircle className="h-4 w-4 text-purple-500" />;
      case 'number': return <span className="font-bold text-xs text-emerald-500">123</span>;
      case 'date': return <Calendar className="h-4 w-4 text-orange-500" />;
      case 'checkbox': return <CheckSquare className="h-4 w-4 text-cyan-500" />;
      case 'select': return <List className="h-4 w-4 text-indigo-500" />;
      case 'multiselect': return <Check className="h-4 w-4 text-pink-500" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 font-sans text-slate-500">
        Carregando configurações...
      </div>
    );
  }

  return (
    <div id="settings-container" className="p-4 bg-slate-50/50 min-h-screen font-sans">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <Settings className="h-6 w-6 text-blue-600" />
          <div>
            <h1 className="text-xl font-bold text-slate-800">Private Fields</h1>
            <p className="text-xs text-slate-500">Gerencie os campos privados e customizados deste quadro</p>
          </div>
        </div>
        <div className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
          Atlassian Native Style
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-6 bg-slate-200/60 p-1 rounded-lg">
          <TabsTrigger value="fields" className="flex items-center gap-2 py-2">
            <CheckSquare className="h-4 w-4" /> Campos
          </TabsTrigger>
          <TabsTrigger value="groups" className="flex items-center gap-2 py-2">
            <FolderPlus className="h-4 w-4" /> Grupos
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2 py-2">
            <LayoutTemplate className="h-4 w-4" /> Templates
          </TabsTrigger>
        </TabsList>

        {/* --- ABA DE CAMPOS --- */}
        <TabsContent value="fields" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Lista de Campos */}
            <div className="md:col-span-2 space-y-3">
              <div className="flex justify-between items-center">
                <h2 className="text-sm font-semibold text-slate-700">Campos Existentes ({config.fields.length})</h2>
                {editingFieldId === null && (
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => setEditingFieldId('new')}
                    className="flex items-center gap-1.5 h-8 text-xs border-slate-300"
                  >
                    <Plus className="h-3.5 w-3.5" /> Novo Campo
                  </Button>
                )}
              </div>

              <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1">
                {config.fields.length === 0 ? (
                  <Card className="border-dashed border-slate-200 bg-white">
                    <CardContent className="flex flex-col items-center justify-center py-8 text-center">
                      <HelpCircle className="h-8 w-8 text-slate-400 mb-2" />
                      <p className="text-sm text-slate-500 font-medium">Nenhum campo personalizado criado</p>
                      <p className="text-xs text-slate-400">Clique em "Novo Campo" para começar</p>
                    </CardContent>
                  </Card>
                ) : (
                  config.fields.map((field, index) => {
                    const group = config.groups.find(g => g.id === field.groupId);
                    const isEditing = editingFieldId === field.id;
                    return (
                      <div 
                        key={field.id} 
                        className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                          isEditing 
                            ? 'border-blue-500 bg-blue-50/20 ring-1 ring-blue-500' 
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col gap-0.5">
                            <Button 
                              size="icon" 
                              variant="ghost" 
                              className="h-4 w-4 p-0 hover:bg-slate-100"
                              disabled={index === 0}
                              onClick={() => moveField(index, 'up')}
                            >
                              <ArrowUp className="h-3 w-3 text-slate-400" />
                            </Button>
                            <Button 
                              size="icon" 
                              variant="ghost" 
                              className="h-4 w-4 p-0 hover:bg-slate-100"
                              disabled={index === config.fields.length - 1}
                              onClick={() => moveField(index, 'down')}
                            >
                              <ArrowDown className="h-3 w-3 text-slate-400" />
                            </Button>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded bg-slate-100">
                              {getFieldIcon(field.type)}
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="text-sm font-semibold text-slate-800">{field.name}</span>
                                {field.required && (
                                  <span className="text-[10px] font-bold px-1.5 py-0.2 bg-red-50 text-red-600 border border-red-100 rounded">Obrigatório</span>
                                )}
                                {field.dependency && (
                                  <span className="text-[10px] font-bold px-1.5 py-0.2 bg-purple-50 text-purple-600 border border-purple-100 rounded">Dependente</span>
                                )}
                              </div>
                              <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                                <span className="capitalize">{field.type === 'paragraph' ? 'Texto longo' : field.type === 'select' ? 'Lista suspensa' : field.type === 'multiselect' ? 'Múltipla escolha' : field.type}</span>
                                {group && (
                                  <>
                                    <span className="text-slate-300">•</span>
                                    <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[10px] font-medium text-slate-600">{group.name}</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            className="h-8 w-8 text-slate-500 hover:text-blue-600 hover:bg-blue-50"
                            onClick={() => startEditField(field)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            className="h-8 w-8 text-slate-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => handleDeleteField(field.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Formulário de Criação/Edição */}
            <div className="md:col-span-1">
              {editingFieldId !== null ? (
                <Card className="border-slate-200 shadow-sm bg-white">
                  <CardHeader className="pb-3 border-b border-slate-100">
                    <CardTitle className="text-sm font-bold text-slate-800">
                      {editingFieldId === 'new' ? 'Criar Novo Campo' : 'Editar Campo'}
                    </CardTitle>
                    <CardDescription className="text-xs">Configure as propriedades do campo</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="field-name" className="text-xs font-semibold text-slate-600">Nome do Campo</Label>
                      <Input 
                        id="field-name" 
                        value={fieldName} 
                        onChange={e => setFieldName(e.target.value)} 
                        placeholder="Ex: Valor do Lead"
                        className="h-9 text-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="field-type" className="text-xs font-semibold text-slate-600">Tipo de Campo</Label>
                      <Select 
                        value={fieldType} 
                        onValueChange={(val: FieldType) => setFieldType(val)}
                      >
                        <SelectTrigger className="h-9 text-sm">
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="text">Texto curto</SelectItem>
                          <SelectItem value="paragraph">Texto longo</SelectItem>
                          <SelectItem value="number">Número</SelectItem>
                          <SelectItem value="date">Data</SelectItem>
                          <SelectItem value="checkbox">Checkbox</SelectItem>
                          <SelectItem value="select">Lista suspensa</SelectItem>
                          <SelectItem value="multiselect">Múltipla escolha</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Opções para Select/Multiselect */}
                    {(fieldType === 'select' || fieldType === 'multiselect') && (
                      <div className="space-y-1.5">
                        <Label htmlFor="field-options" className="text-xs font-semibold text-slate-600">Opções (Uma por linha)</Label>
                        <Textarea 
                          id="field-options" 
                          value={fieldOptions} 
                          onChange={e => setFieldOptions(e.target.value)} 
                          placeholder="Opção A&#10;Opção B&#10;Opção C"
                          rows={3}
                          className="text-sm min-h-[80px]"
                        />
                      </div>
                    )}

                    <div className="space-y-1.5">
                      <Label htmlFor="field-placeholder" className="text-xs font-semibold text-slate-600">Placeholder (Opcional)</Label>
                      <Input 
                        id="field-placeholder" 
                        value={fieldPlaceholder} 
                        onChange={e => setFieldPlaceholder(e.target.value)} 
                        placeholder="Ex: Digite o valor..."
                        className="h-9 text-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="field-group" className="text-xs font-semibold text-slate-600">Grupo Associado</Label>
                      <Select 
                        value={fieldGroupId} 
                        onValueChange={setFieldGroupId}
                      >
                        <SelectTrigger className="h-9 text-sm">
                          <SelectValue placeholder="Sem grupo (Solto)" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">Sem grupo (Solto)</SelectItem>
                          {config.groups.map(g => (
                            <SelectItem key={g.id} value={g.id}>{g.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between py-1 border-t border-slate-100 pt-3">
                      <div className="space-y-0.5">
                        <Label htmlFor="field-required" className="text-xs font-semibold text-slate-700">Campo Obrigatório?</Label>
                        <p className="text-[10px] text-slate-400">Impede o salvamento sem preencher</p>
                      </div>
                      <Switch 
                        id="field-required" 
                        checked={fieldRequired} 
                        onCheckedChange={setFieldRequired} 
                      />
                    </div>

                    {/* Configuração de Campos Dependentes */}
                    <div className="border-t border-slate-100 pt-3 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="field-dep" className="text-xs font-semibold text-slate-700">Campo Dependente?</Label>
                          <p className="text-[10px] text-slate-400">Exibir apenas sob condições</p>
                        </div>
                        <Switch 
                          id="field-dep" 
                          checked={fieldHasDependency} 
                          onCheckedChange={setFieldHasDependency} 
                        />
                      </div>

                      {fieldHasDependency && (
                        <div className="space-y-3 bg-slate-50 p-2.5 rounded border border-slate-150 animate-in fade-in-50 duration-150">
                          <div className="space-y-1">
                            <Label className="text-[10px] font-bold text-slate-500 uppercase">Se o campo:</Label>
                            <Select value={fieldDepId} onValueChange={setFieldDepId}>
                              <SelectTrigger className="h-8 text-xs bg-white">
                                <SelectValue placeholder="Selecione o campo pai" />
                              </SelectTrigger>
                              <SelectContent>
                                {config.fields
                                  .filter(f => f.id !== editingFieldId && f.type !== 'paragraph' && f.type !== 'multiselect')
                                  .map(f => (
                                    <SelectItem key={f.id} value={f.id}>{f.name}</SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-1">
                            <Label className="text-[10px] font-bold text-slate-500 uppercase">For igual a:</Label>
                            <Input 
                              value={fieldDepValue} 
                              onChange={e => setFieldDepValue(e.target.value)} 
                              placeholder="Ex: true ou Opção A"
                              className="h-8 text-xs bg-white"
                            />
                            <p className="text-[9px] text-slate-400">Use 'true' para checkboxes marcados</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                      <Button size="sm" onClick={handleSaveField} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs h-8">
                        <Save className="h-3.5 w-3.5 mr-1" /> Salvar
                      </Button>
                      <Button size="sm" variant="ghost" onClick={resetFieldForm} className="flex-1 text-slate-500 text-xs h-8 hover:bg-slate-100">
                        Cancelar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="hidden md:flex flex-col items-center justify-center p-6 border border-dashed border-slate-200 rounded-lg bg-white h-64 text-center">
                  <Eye className="h-8 w-8 text-slate-300 mb-2" />
                  <p className="text-xs font-semibold text-slate-500">Selecione ou crie um campo</p>
                  <p className="text-[10px] text-slate-400">para editar suas propriedades aqui</p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        {/* --- ABA DE GRUPOS --- */}
        <TabsContent value="groups" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Lista de Grupos */}
            <div className="md:col-span-2 space-y-3">
              <div className="flex justify-between items-center">
                <h2 className="text-sm font-semibold text-slate-700">Grupos de Campos ({config.groups.length})</h2>
                {editingGroupId === null && (
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => setEditingGroupId('new')}
                    className="flex items-center gap-1.5 h-8 text-xs border-slate-300"
                  >
                    <Plus className="h-3.5 w-3.5" /> Novo Grupo
                  </Button>
                )}
              </div>

              <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1">
                {config.groups.length === 0 ? (
                  <Card className="border-dashed border-slate-200 bg-white">
                    <CardContent className="flex flex-col items-center justify-center py-8 text-center">
                      <FolderPlus className="h-8 w-8 text-slate-400 mb-2" />
                      <p className="text-sm text-slate-500 font-medium">Nenhum grupo de campos criado</p>
                      <p className="text-xs text-slate-400">Crie grupos para organizar os campos na tela</p>
                    </CardContent>
                  </Card>
                ) : (
                  config.groups.map((group, index) => {
                    const fieldsInGroup = config.fields.filter(f => f.groupId === group.id).length;
                    const isEditing = editingGroupId === group.id;
                    return (
                      <div 
                        key={group.id} 
                        className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                          isEditing 
                            ? 'border-blue-500 bg-blue-50/20 ring-1 ring-blue-500' 
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col gap-0.5">
                            <Button 
                              size="icon" 
                              variant="ghost" 
                              className="h-4 w-4 p-0 hover:bg-slate-100"
                              disabled={index === 0}
                              onClick={() => moveGroup(index, 'up')}
                            >
                              <ArrowUp className="h-3 w-3 text-slate-400" />
                            </Button>
                            <Button 
                              size="icon" 
                              variant="ghost" 
                              className="h-4 w-4 p-0 hover:bg-slate-100"
                              disabled={index === config.groups.length - 1}
                              onClick={() => moveGroup(index, 'down')}
                            >
                              <ArrowDown className="h-3 w-3 text-slate-400" />
                            </Button>
                          </div>
                          <div>
                            <span className="text-sm font-semibold text-slate-800">{group.name}</span>
                            {group.description && (
                              <p className="text-xs text-slate-400 mt-0.5">{group.description}</p>
                            )}
                            <div className="text-[10px] text-slate-500 mt-1 font-medium bg-slate-100 px-2 py-0.5 rounded-full w-max">
                              {fieldsInGroup} {fieldsInGroup === 1 ? 'campo associado' : 'campos associados'}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            className="h-8 w-8 text-slate-500 hover:text-blue-600 hover:bg-blue-50"
                            onClick={() => {
                              setEditingGroupId(group.id);
                              setGroupName(group.name);
                              setGroupDescription(group.description || '');
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            className="h-8 w-8 text-slate-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => handleDeleteGroup(group.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Formulário de Grupos */}
            <div className="md:col-span-1">
              {editingGroupId !== null ? (
                <Card className="border-slate-200 shadow-sm bg-white">
                  <CardHeader className="pb-3 border-b border-slate-100">
                    <CardTitle className="text-sm font-bold text-slate-800">
                      {editingGroupId === 'new' ? 'Criar Novo Grupo' : 'Editar Grupo'}
                    </CardTitle>
                    <CardDescription className="text-xs">Configure as propriedades do grupo</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="group-name" className="text-xs font-semibold text-slate-600">Nome do Grupo</Label>
                      <Input 
                        id="group-name" 
                        value={groupName} 
                        onChange={e => setGroupName(e.target.value)} 
                        placeholder="Ex: Financeiro"
                        className="h-9 text-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="group-desc" className="text-xs font-semibold text-slate-600">Descrição (Opcional)</Label>
                      <Textarea 
                        id="group-desc" 
                        value={groupDescription} 
                        onChange={e => setGroupDescription(e.target.value)} 
                        placeholder="Ex: Dados de faturamento e notas fiscais"
                        rows={3}
                        className="text-sm min-h-[80px]"
                      />
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                      <Button size="sm" onClick={handleSaveGroup} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs h-8">
                        <Save className="h-3.5 w-3.5 mr-1" /> Salvar
                      </Button>
                      <Button size="sm" variant="ghost" onClick={resetGroupForm} className="flex-1 text-slate-500 text-xs h-8 hover:bg-slate-100">
                        Cancelar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="hidden md:flex flex-col items-center justify-center p-6 border border-dashed border-slate-200 rounded-lg bg-white h-64 text-center">
                  <FolderPlus className="h-8 w-8 text-slate-300 mb-2" />
                  <p className="text-xs font-semibold text-slate-500">Selecione ou crie um grupo</p>
                  <p className="text-[10px] text-slate-400">para organizar os campos do cartão</p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        {/* --- ABA DE TEMPLATES --- */}
        <TabsContent value="templates" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Lista de Templates */}
            <div className="md:col-span-2 space-y-3">
              <h2 className="text-sm font-semibold text-slate-700">Templates Comerciais Salvos ({config.templates.length})</h2>
              
              <div className="grid grid-cols-1 gap-3 max-h-[480px] overflow-y-auto pr-1">
                {config.templates.map((template) => {
                  const isActive = config.activeTemplateId === template.id;
                  return (
                    <Card 
                      key={template.id} 
                      className={`border transition-all ${
                        isActive 
                          ? 'border-blue-500 bg-blue-50/10 shadow-sm' 
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between space-y-0">
                        <div>
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-sm font-bold text-slate-800">{template.name}</CardTitle>
                            {isActive && (
                              <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full border border-blue-200">
                                Ativo no Quadro
                              </span>
                            )}
                          </div>
                          {template.description && (
                            <CardDescription className="text-xs mt-1">{template.description}</CardDescription>
                          )}
                        </div>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50"
                          onClick={() => handleDeleteTemplate(template.id)}
                          disabled={config.templates.length <= 1}
                        >
                          <Trash2 className="h-4.5 w-4.5" />
                        </Button>
                      </CardHeader>
                      <CardContent className="p-4 pt-2 flex items-center justify-between border-t border-slate-100/60 mt-2">
                        <div className="flex gap-4 text-xs text-slate-500">
                          <span><strong>{template.groups.length}</strong> Grupos</span>
                          <span><strong>{template.fields.length}</strong> Campos</span>
                        </div>
                        {!isActive && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleApplyTemplate(template.id)}
                            className="text-xs h-8 border-slate-300 hover:bg-slate-50"
                          >
                            Aplicar Template
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Criar Template a partir da configuração atual */}
            <div className="md:col-span-1">
              <Card className="border-slate-200 shadow-sm bg-white">
                <CardHeader className="pb-3 border-b border-slate-100">
                  <CardTitle className="text-sm font-bold text-slate-800">Salvar Estrutura Atual</CardTitle>
                  <CardDescription className="text-xs">Salve os grupos e campos atuais como um novo template reutilizável</CardDescription>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="template-name" className="text-xs font-semibold text-slate-600">Nome do Template</Label>
                    <Input 
                      id="template-name" 
                      value={newTemplateName} 
                      onChange={e => setNewTemplateName(e.target.value)} 
                      placeholder="Ex: Template CRM Imobiliário"
                      className="h-9 text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="template-desc" className="text-xs font-semibold text-slate-600">Descrição (Opcional)</Label>
                    <Textarea 
                      id="template-desc" 
                      value={newTemplateDesc} 
                      onChange={e => setNewTemplateDescription(e.target.value)} 
                      placeholder="Ex: Estrutura para controle de leads e imóveis"
                      rows={3}
                      className="text-sm min-h-[80px]"
                    />
                  </div>

                  <Button 
                    size="sm" 
                    onClick={handleCreateTemplate} 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs h-9"
                  >
                    <LayoutTemplate className="h-4 w-4 mr-1.5" /> Salvar Template Atual
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
