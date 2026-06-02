# Private Fields - Trello Power-Up

Um Power-Up privado e seguro para Trello que permite criar campos personalizados ilimitados dentro dos cartões, com suporte a grupos, templates, campos dependentes e exportação para Excel.

## 🎯 Características

- **Campos Ilimitados**: Texto curto, texto longo, número, data, checkbox, lista suspensa e múltipla escolha
- **Organização Inteligente**: Agrupe campos em categorias visuais
- **Campos Dependentes**: Exiba campos condicionalmente baseado em outros valores
- **Templates Reutilizáveis**: Salve estruturas de campos para reutilizar em novos quadros
- **Exportação Excel**: Gere planilhas .CSV formatadas com todos os dados do quadro
- **100% Seguro**: Dados armazenados diretamente na infraestrutura do Trello usando a API oficial
- **Sem Banco de Dados Externo**: Nenhuma dependência de serviços terceirizados

## 🚀 Deploy Rápido

### Opção 1: Vercel (Recomendado)

1. Faça um fork deste repositório no GitHub
2. Acesse [vercel.com](https://vercel.com) e faça login com sua conta GitHub
3. Clique em "Add New..." → "Project"
4. Selecione este repositório
5. Clique em "Deploy"
6. Copie a URL do seu deployment (ex: `https://seu-projeto.vercel.app`)

### Opção 2: Netlify

1. Acesse [netlify.com](https://netlify.com) e faça login
2. Clique em "Add new site" → "Import an existing project"
3. Conecte seu repositório GitHub
4. Clique em "Deploy site"
5. Copie a URL do seu site

## 📋 Configuração no Trello

1. Acesse [trello.com/power-ups/admin](https://trello.com/power-ups/admin)
2. Clique em "Create a Power-Up"
3. Preencha as informações básicas
4. Na seção "Iframe Connector URL", insira: `https://seu-dominio.com/connector.html`
5. Na aba "Capabilities", ative:
   - Card Back Section
   - Show Settings
   - Board Buttons
6. Salve as alterações

## 🛠️ Desenvolvimento Local

### Pré-requisitos
- Node.js 18+
- pnpm (ou npm/yarn)

### Instalação

```bash
# Clonar o repositório
git clone https://github.com/seu-usuario/private-fields-trello-powerup.git
cd private-fields-trello-powerup

# Instalar dependências
pnpm install

# Iniciar servidor de desenvolvimento
pnpm run dev
```

O servidor estará disponível em `http://localhost:3000`

### Build para Produção

```bash
pnpm run build
```

Os arquivos compilados estarão em `dist/public/`

## 📁 Estrutura do Projeto

```
client/
├── public/
│   ├── manifest.json          # Manifesto do Power-Up
│   ├── connector.html         # Conector principal (Trello lê este arquivo)
│   ├── card-back.html         # Iframe da seção traseira do cartão
│   ├── settings.html          # Iframe das configurações
│   ├── export.html            # Iframe de exportação
│   └── icon.svg               # Ícone do Power-Up
├── src/
│   ├── App.tsx                # Roteador principal
│   ├── pages/
│   │   ├── CardBackView.tsx   # Interface dos campos no cartão
│   │   ├── SettingsView.tsx   # Painel de configuração
│   │   ├── ExportView.tsx     # Exportador para Excel
│   │   └── Home.tsx           # Página de boas-vindas
│   ├── lib/
│   │   ├── trello.ts          # Tipagem da API do Trello
│   │   ├── types.ts           # Tipos do Power-Up
│   │   └── defaults.ts        # Dados padrão
│   └── index.css              # Estilos globais (Tailwind)
└── package.json
```

## 🔐 Segurança

- Todos os dados são armazenados usando `t.set()` e `t.get()` da API oficial do Trello
- Nenhuma informação é enviada para servidores externos
- O Power-Up é privado e só funciona para membros do seu espaço de trabalho Trello
- Comunicação 100% HTTPS

## 📚 Documentação Completa

Consulte o arquivo `guia-operacional.md` para instruções detalhadas de:
- Criação do Power-Up no Trello
- Instalação em um quadro
- Como usar cada funcionalidade
- Dicas de configuração avançada

## 🤝 Contribuições

Este é um projeto privado. Para sugestões ou melhorias, abra uma issue ou entre em contato.

## 📄 Licença

MIT

## 🆘 Suporte

Para problemas ou dúvidas:
1. Verifique o arquivo `guia-operacional.md`
2. Consulte a [documentação oficial do Trello Power-Up](https://developer.atlassian.com/cloud/trello/power-ups/)
3. Abra uma issue neste repositório

---

**Desenvolvido com React, Tailwind CSS e Trello Power-Up Library**
