import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckSquare, Shield, Settings, FileSpreadsheet, ExternalLink, HelpCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 py-4 px-6 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-600 rounded-lg text-white">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900">Private Fields</h1>
              <p className="text-xs text-slate-500">Power-Up Privado para Trello</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
              Servidor Ativo
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto px-6 py-10 w-full space-y-8">
        
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white shadow-md">
          <div className="max-w-2xl space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold leading-tight">
              Campos personalizados ilimitados e seguros dentro do seu Trello.
            </h2>
            <p className="text-sm text-blue-100/90 leading-relaxed">
              O <strong>Private Fields</strong> permite que você adicione dados privados estruturados (CRM, financeiro, datas, seleções) nos cartões sem expor para o sistema de Custom Fields nativo e sem custos adicionais.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Button 
                onClick={() => window.open('https://trello.com/power-ups/admin', '_blank')}
                className="bg-white text-blue-700 hover:bg-blue-50 font-semibold h-10 text-xs shadow"
              >
                Criar Power-Up no Trello <ExternalLink className="h-3.5 w-3.5 ml-1" />
              </Button>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-slate-200 bg-white hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <div className="p-2 bg-blue-50 rounded-lg w-max mb-2">
                <CheckSquare className="h-5 w-5 text-blue-600" />
              </div>
              <CardTitle className="text-sm font-bold text-slate-800">Campos Ilimitados</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-slate-500 leading-relaxed">
              Crie textos, números, datas, checkboxes, listas suspensas e múltipla escolha sem restrições ou limitações de quantidade.
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <div className="p-2 bg-purple-50 rounded-lg w-max mb-2">
                <Settings className="h-5 w-5 text-purple-600" />
              </div>
              <CardTitle className="text-sm font-bold text-slate-800">Grupos & Dependências</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-slate-500 leading-relaxed">
              Organize os campos em abas/grupos visuais e defina regras condicionais (ex: mostrar campo "Data de Faturamento" apenas se "Faturado" for Sim).
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <div className="p-2 bg-emerald-50 rounded-lg w-max mb-2">
                <FileSpreadsheet className="h-5 w-5 text-emerald-600" />
              </div>
              <CardTitle className="text-sm font-bold text-slate-800">Exportação Excel</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-slate-500 leading-relaxed">
              Extraia todos os dados preenchidos nos cartões em uma planilha formatada e compatível com Excel diretamente do botão do quadro.
            </CardContent>
          </Card>
        </div>

        {/* Quick Test / Preview Section */}
        <Card className="border-slate-200 bg-white">
          <CardHeader className="border-b border-slate-100">
            <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
              <HelpCircle className="h-4.5 w-4.5 text-blue-600" />
              Como este Power-Up funciona?
            </CardTitle>
            <CardDescription className="text-xs">
              Entenda a arquitetura de iframes utilizada pelo Trello
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-5 space-y-4 text-xs text-slate-600 leading-relaxed">
            <p>
              Os Trello Power-Ups funcionam como aplicações estáticas seguras hospedadas fora do Trello, mas renderizadas diretamente dentro da interface do Trello através de <strong>iframes protegidos</strong>.
            </p>
            <p>
              Quando você instala este Power-Up no seu quadro:
            </p>
            <ol className="list-decimal list-inside space-y-2 pl-2 text-slate-500">
              <li>O Trello lê o arquivo <code className="bg-slate-100 px-1 py-0.5 rounded text-blue-600">connector.html</code> para registrar as capacidades habilitadas (Seção Traseira do Cartão, Configurações e Botões do Quadro).</li>
              <li>Ao abrir um cartão, o Trello carrega o <code className="bg-slate-100 px-1 py-0.5 rounded text-blue-600">card-back.html</code> que redireciona de forma segura para nossa aplicação React, injetando o contexto do cartão.</li>
              <li>Todos os dados são salvos de forma privada no próprio banco de dados do Trello usando a API segura <code className="bg-slate-100 px-1 py-0.5 rounded text-blue-600">t.set()</code> e <code className="bg-slate-100 px-1 py-0.5 rounded text-blue-600">t.get()</code>, garantindo que suas informações fiquem 100% salvas na infraestrutura da Atlassian.</li>
            </ol>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 px-6 mt-12 text-center text-xs text-slate-400">
        <div className="max-w-5xl mx-auto">
          Private Fields Trello Power-Up • Desenvolvido com React, Tailwind CSS e Trello Power-Up Library.
        </div>
      </footer>
    </div>
  );
}
