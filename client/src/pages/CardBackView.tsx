import React, { useState, useEffect, useRef } from 'react';
import { getTrelloInstance } from '../lib/trello';
import { BoardConfig, CardValues, Field, FieldGroup } from '../lib/types';
import { INITIAL_CONFIG } from '../lib/defaults';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarIcon, EyeOff, Save, Check, Settings, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function CardBackView() {
  const t = getTrelloInstance();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [config, setConfig] = useState<BoardConfig>(INITIAL_CONFIG);
  const [values, setValues] = useState<CardValues>({});
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsEditing] = useState(false);

  useEffect(() => {
    // 1. Carregar a estrutura de campos configurada no quadro (board)
    // 2. Carregar os valores salvos especificamente para este cartão (card)
    Promise.all([
      t.get('board', 'shared', 'private-fields-config', INITIAL_CONFIG),
      t.get('card', 'shared', 'private-fields-values', {})
    ])
      .then(([savedConfig, savedValues]) => {
        if (savedConfig && savedConfig.fields) {
          setConfig(savedConfig);
        }
        setValues(savedValues || {});
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erro ao carregar dados do Trello:', err);
        setLoading(false);
      });
  }, []);

  // Redimensionar o iframe para se ajustar perfeitamente ao tamanho dos campos
  useEffect(() => {
    if (!loading) {
      // Pequeno timeout para garantir que o DOM renderizou as mudanças de dependência
      const timer = setTimeout(() => {
        t.sizeTo('#card-back-container');
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [values, config, loading]);

  // Função para salvar um campo individualmente ao mudar de foco ou clicar
  const handleSaveValue = async (fieldId: string, value: any) => {
    const updatedValues = { ...values, [fieldId]: value };
    setValues(updatedValues);
    setIsEditing(true);

    try {
      // Salvar os dados no escopo compartilhado do Trello (shared) no nível do cartão
      await t.set('card', 'shared', 'private-fields-values', updatedValues);
      setIsEditing(false);
    } catch (err) {
      console.error('Erro ao salvar valor:', err);
      toast.error('Erro ao salvar alteração no Trello.');
      setIsEditing(false);
    }
  };

  // Abrir o modal de configurações
  const handleOpenSettings = () => {
    t.modal({
      title: 'Configuração - Private Fields',
      url: t.signUrl('./settings.html'),
      height: 700,
      fullscreen: false
    });
  };

  // Avaliar se um campo dependente deve ser exibido ou não
  const shouldShowField = (field: Field): boolean => {
    if (!field.dependency) return true;
    
    const parentValue = values[field.dependency.fieldId];
    
    // Se o valor esperado for 'true' (ex: checkbox marcado)
    if (field.dependency.value === 'true') {
      return parentValue === true || parentValue === 'true';
    }
    
    // Se o valor esperado for 'false' (ex: checkbox desmarcado)
    if (field.dependency.value === 'false') {
      return parentValue === false || parentValue === 'false' || parentValue === undefined;
    }

    // Comparação de string comum (ex: lista suspensa)
    return String(parentValue) === field.dependency.value;
  };

  // Renderizar o input de acordo com o tipo de campo
  const renderFieldInput = (field: Field) => {
    const currentValue = values[field.id] !== undefined ? values[field.id] : '';

    switch (field.type) {
      case 'text':
        return (
          <Input
            type="text"
            placeholder={field.placeholder || 'Digite o texto...'}
            value={currentValue}
            onChange={(e) => setValues({ ...values, [field.id]: e.target.value })}
            onBlur={(e) => handleSaveValue(field.id, e.target.value)}
            className="h-8 text-xs bg-white border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        );

      case 'paragraph':
        return (
          <Textarea
            placeholder={field.placeholder || 'Digite a descrição...'}
            value={currentValue}
            onChange={(e) => setValues({ ...values, [field.id]: e.target.value })}
            onBlur={(e) => handleSaveValue(field.id, e.target.value)}
            rows={3}
            className="text-xs bg-white border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 min-h-[60px]"
          />
        );

      case 'number':
        return (
          <Input
            type="number"
            placeholder={field.placeholder || 'Ex: 100'}
            value={currentValue}
            onChange={(e) => setValues({ ...values, [field.id]: e.target.value })}
            onBlur={(e) => handleSaveValue(field.id, e.target.value)}
            className="h-8 text-xs bg-white border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        );

      case 'date':
        const dateValue = currentValue ? new Date(currentValue) : undefined;
        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`w-full justify-start text-left font-normal h-8 text-xs border-slate-200 bg-white hover:bg-slate-50 ${
                  !dateValue && 'text-slate-400'
                }`}
              >
                <CalendarIcon className="mr-1.5 h-3.5 w-3.5 text-slate-400" />
                {dateValue ? format(dateValue, 'PPP', { locale: ptBR }) : field.placeholder || 'Selecione uma data'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dateValue}
                onSelect={(date) => handleSaveValue(field.id, date ? date.toISOString() : '')}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        );

      case 'checkbox':
        return (
          <div className="flex items-center space-x-2 h-8">
            <Checkbox
              id={`checkbox-${field.id}`}
              checked={!!currentValue}
              onCheckedChange={(checked) => handleSaveValue(field.id, !!checked)}
              className="border-slate-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
            />
            <label
              htmlFor={`checkbox-${field.id}`}
              className="text-xs font-medium text-slate-600 cursor-pointer select-none"
            >
              {currentValue ? 'Sim/Marcado' : 'Não/Desmarcado'}
            </label>
          </div>
        );

      case 'select':
        return (
          <Select
            value={currentValue ? String(currentValue) : undefined}
            onValueChange={(val) => handleSaveValue(field.id, val)}
          >
            <SelectTrigger className="h-8 text-xs bg-white border-slate-200">
              <SelectValue placeholder={field.placeholder || 'Selecione...'} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((opt) => (
                <SelectItem key={opt} value={opt} className="text-xs">
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'multiselect':
        // Múltipla escolha representada como botões/pills clicáveis
        const selectedOptions: string[] = Array.isArray(currentValue) ? currentValue : [];
        const toggleOption = (opt: string) => {
          let updated: string[];
          if (selectedOptions.includes(opt)) {
            updated = selectedOptions.filter((o) => o !== opt);
          } else {
            updated = [...selectedOptions, opt];
          }
          handleSaveValue(field.id, updated);
        };

        return (
          <div className="flex flex-wrap gap-1.5 py-1">
            {field.options?.map((opt) => {
              const isSelected = selectedOptions.includes(opt);
              return (
                <Button
                  key={opt}
                  type="button"
                  size="sm"
                  variant={isSelected ? 'default' : 'outline'}
                  onClick={() => toggleOption(opt)}
                  className={`h-7 px-2.5 text-[11px] rounded-full font-medium transition-all ${
                    isSelected
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'border-slate-200 text-slate-600 bg-white hover:bg-slate-50'
                  }`}
                >
                  {isSelected && <Check className="h-3 w-3 mr-1" />}
                  {opt}
                </Button>
              );
            })}
          </div>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-20 text-xs font-sans text-slate-400">
        Carregando Private Fields...
      </div>
    );
  }

  // Filtrar apenas os campos que devem ser exibidos (passam na regra de dependência)
  const visibleFields = config.fields.filter(shouldShowField);

  // Separar campos soltos (sem grupo) e campos agrupados
  const ungroupedFields = visibleFields.filter((f) => !f.groupId || f.groupId === 'none');
  
  // Obter grupos ativos (que possuem pelo menos um campo visível)
  const activeGroups = config.groups
    .filter((g) => visibleFields.some((f) => f.groupId === g.id))
    .sort((a, b) => a.order - b.order);

  return (
    <div id="card-back-container" ref={containerRef} className="bg-slate-50/40 p-3.5 rounded-xl border border-slate-100 font-sans">
      
      {/* Header Compacto */}
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
          <span className="text-xs font-bold text-slate-700">Campos Privados (Private Fields)</span>
          {isSaving && (
            <span className="text-[10px] text-blue-500 font-medium flex items-center gap-1">
              <Save className="h-3 w-3 animate-bounce" /> salvando...
            </span>
          )}
        </div>
        <Button
          size="icon"
          variant="ghost"
          onClick={handleOpenSettings}
          className="h-6 w-6 text-slate-400 hover:text-blue-600 hover:bg-blue-50"
          title="Configurar campos"
        >
          <Settings className="h-3.5 w-3.5" />
        </Button>
      </div>

      {visibleFields.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-6 text-center bg-white rounded-lg border border-dashed border-slate-200">
          <EyeOff className="h-6 w-6 text-slate-300 mb-1.5" />
          <p className="text-xs font-semibold text-slate-500">Nenhum campo disponível</p>
          <p className="text-[10px] text-slate-400 max-w-[240px]">
            Configure campos nas opções ou verifique as dependências ativas.
          </p>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={handleOpenSettings} 
            className="h-7 text-[10px] mt-2 border-slate-200"
          >
            Configurar Campos
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          
          {/* 1. Renderizar Campos Soltos (Sem Grupo) */}
          {ungroupedFields.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white p-3 rounded-lg border border-slate-150">
              {ungroupedFields.map((field) => (
                <div key={field.id} className="space-y-1">
                  <div className="flex items-center gap-1">
                    <Label className="text-xs font-semibold text-slate-600">{field.name}</Label>
                    {field.required && <span className="text-red-500 text-[10px] font-bold">*</span>}
                  </div>
                  {renderFieldInput(field)}
                </div>
              ))}
            </div>
          )}

          {/* 2. Renderizar Grupos Ativos */}
          {activeGroups.map((group) => {
            const fieldsInThisGroup = visibleFields.filter((f) => f.groupId === group.id);
            return (
              <div key={group.id} className="bg-white p-3 rounded-lg border border-slate-150 shadow-sm space-y-2.5">
                <div>
                  <h3 className="text-xs font-bold text-slate-800">{group.name}</h3>
                  {group.description && (
                    <p className="text-[10px] text-slate-400">{group.description}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {fieldsInThisGroup.map((field) => (
                    <div key={field.id} className="space-y-1">
                      <div className="flex items-center gap-1">
                        <Label className="text-xs font-semibold text-slate-600">{field.name}</Label>
                        {field.required && <span className="text-red-500 text-[10px] font-bold">*</span>}
                      </div>
                      {renderFieldInput(field)}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
