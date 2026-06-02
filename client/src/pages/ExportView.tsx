import React, { useState, useEffect } from 'react';
import { getTrelloInstance } from '../lib/trello';
import { BoardConfig, CardValues } from '../lib/types';
import { INITIAL_CONFIG } from '../lib/defaults';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, FileSpreadsheet, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function ExportView() {
  const t = getTrelloInstance();
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [config, setConfig] = useState<BoardConfig>(INITIAL_CONFIG);
  const [cardsWithData, setCardsWithData] = useState<Array<{ id: string; name: string; values: CardValues }>>([]);

  useEffect(() => {
    // 1. Obter a configuração do quadro para saber quais campos existem
    // 2. No Trello, precisamos iterar sobre os cartões do quadro para buscar os dados de cada um
    t.get('board', 'shared', 'private-fields-config', INITIAL_CONFIG)
      .then(async (savedConfig) => {
        if (savedConfig && savedConfig.fields) {
          setConfig(savedConfig);
        }
        
        // No contexto do Trello, podemos buscar todos os cartões do quadro atual
        try {
          const boardCards = await t.board('cards');
          const cardsData: Array<{ id: string; name: string; values: CardValues }> = [];

          // Para cada cartão, buscar os valores salvos de Private Fields
          // Como o Trello armazena os dados do Power-Up associados ao cartão,
          // podemos puxar os dados usando o ID do cartão.
          for (const card of boardCards.cards) {
            // O plugin do Trello permite pegar dados de outros cartões se tivermos o ID do cartão
            // Usamos t.get com o ID do cartão específico
            const cardValues = await t.get(card.id, 'shared', 'private-fields-values', null);
            if (cardValues && Object.keys(cardValues).length > 0) {
              cardsData.push({
                id: card.id,
                name: card.name,
                values: cardValues
              });
            }
          }
          setCardsWithData(cardsData);
        } catch (err) {
          console.error('Erro ao buscar cartões do quadro:', err);
          // Fallback para desenvolvimento local / mock
          setCardsWithData([
            {
              id: 'mock-card-1',
              name: 'Exemplo de Lead Ativo',
              values: {
                'field-cliente': 'Atlassian Brasil',
                'field-prioridade': 'Alta',
                'field-valor': '12500',
                'field-faturado': true,
                'field-data-faturamento': '2026-06-15T00:00:00.000Z'
              }
            },
            {
              id: 'mock-card-2',
              name: 'Oportunidade de Venda de Licenças',
              values: {
                'field-cliente': 'Empresa XPTO S/A',
                'field-prioridade': 'Média',
                'field-valor': '4300',
                'field-faturado': false
              }
            }
          ]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erro ao inicializar exportação:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    t.sizeTo('#export-container');
  }, [loading, cardsWithData]);

  const handleExportCSV = () => {
    if (config.fields.length === 0) {
      toast.error('Não há campos configurados para exportar.');
      return;
    }

    setExporting(true);

    try {
      // Definir o cabeçalho do CSV
      // ID do Cartão, Nome do Cartão, Campo 1, Campo 2, ...
      const headers = ['ID do Cartao', 'Nome do Cartao'];
      config.fields.forEach(field => {
        headers.push(field.name);
      });

      const csvRows = [headers.join(';')]; // Usar ponto e vírgula como separador para compatibilidade direta com Excel em Português

      // Preencher as linhas com os dados de cada cartão
      cardsWithData.forEach(card => {
        const row = [card.id, `"${card.name.replace(/"/g, '""')}"`];
        
        config.fields.forEach(field => {
          const val = card.values[field.id];
          if (val === undefined || val === null) {
            row.push('');
          } else if (typeof val === 'boolean') {
            row.push(val ? 'Sim' : 'Nao');
          } else if (Array.isArray(val)) {
            row.push(`"${val.join(', ').replace(/"/g, '""')}"`);
          } else {
            row.push(`"${String(val).replace(/"/g, '""')}"`);
          }
        });

        csvRows.push(row.join(';'));
      });

      // Criar o arquivo blob e fazer o download
      const csvContent = '\uFEFF' + csvRows.join('\n'); // Adicionar BOM para Excel reconhecer caracteres especiais como acentos (UTF-8)
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `private_fields_export_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success('Exportação concluída! O arquivo foi baixado.');
    } catch (err) {
      console.error(err);
      toast.error('Erro ao gerar arquivo de exportação.');
    } finally {
      setExporting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-48 font-sans text-slate-500">
        <Loader2 className="h-6 w-6 animate-spin text-blue-600 mb-2" />
        <span>Analisando dados do quadro...</span>
      </div>
    );
  }

  return (
    <div id="export-container" className="p-5 bg-slate-50/50 min-h-[350px] font-sans">
      <Card className="border-slate-200 bg-white shadow-sm">
        <CardHeader className="pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="h-6 w-6 text-emerald-600" />
            <div>
              <CardTitle className="text-base font-bold text-slate-800">Exportar para Excel / CSV</CardTitle>
              <CardDescription className="text-xs">Exporte todos os campos personalizados preenchidos neste quadro</CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-5 space-y-4">
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-150 space-y-2">
            <h3 className="text-xs font-bold text-slate-700">Resumo do Quadro:</h3>
            <div className="grid grid-cols-2 gap-4 text-xs text-slate-600">
              <div className="flex flex-col">
                <span className="text-slate-400">Campos configurados</span>
                <span className="font-semibold text-slate-800">{config.fields.length} campos</span>
              </div>
              <div className="flex flex-col">
                <span className="text-slate-400">Cartões com dados privados</span>
                <span className="font-semibold text-slate-800">{cardsWithData.length} cartões</span>
              </div>
            </div>
          </div>

          {cardsWithData.length === 0 ? (
            <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-150 rounded-lg text-amber-800 text-xs">
              <AlertCircle className="h-4.5 w-4.5 shrink-0" />
              <span>
                Nenhum cartão deste quadro possui valores salvos nos <strong>Private Fields</strong> ainda. O arquivo gerado conterá apenas o cabeçalho com os nomes dos campos.
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-150 rounded-lg text-emerald-800 text-xs">
              <CheckCircle className="h-4.5 w-4.5 shrink-0" />
              <span>
                Pronto para exportar! Encontrados dados em <strong>{cardsWithData.length}</strong> cartões. O formato gerado (.csv com separador ';') abre diretamente no Microsoft Excel.
              </span>
            </div>
          )}

          <Button 
            onClick={handleExportCSV} 
            disabled={exporting}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold h-10 text-sm transition-all shadow-sm flex items-center justify-center gap-2"
          >
            {exporting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Gerando Planilha...
              </>
            ) : (
              <>
                <Download className="h-4.5 w-4.5" />
                Baixar Planilha Excel (.CSV)
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
