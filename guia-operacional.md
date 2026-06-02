# Guia Operacional de Implantação: Private Fields Trello Power-Up

Este guia fornece todas as etapas necessárias para hospedar, registrar, instalar e utilizar o Power-Up privado **Private Fields** diretamente no seu Trello [1]. Siga este passo a passo detalhado para colocar a sua extensão em funcionamento de forma rápida e segura.

---

## 1. Estrutura Completa do Projeto

O projeto foi desenvolvido utilizando uma arquitetura moderna e otimizada para o Trello. Toda a lógica de persistência de dados utiliza a API segura da Atlassian (`t.set` e `t.get`), o que significa que **nenhum dado privado dos seus cartões sai dos servidores do Trello** [2].

Abaixo está a estrutura de arquivos gerada e pronta para hospedagem:

| Diretório / Arquivo | Tipo de Arquivo | Função no Power-Up |
| :--- | :--- | :--- |
| `client/public/manifest.json` | Configuração JSON | Manifesto oficial lido pelo Trello para registrar o Power-Up [3]. |
| `client/public/connector.html` | HTML / JS | Conector principal que registra as capacidades (Card Back, Settings, Board Buttons) [3]. |
| `client/public/card-back.html` | HTML / JS | Iframe intermediário que redireciona de forma segura para a interface React do cartão. |
| `client/public/settings.html` | HTML / JS | Iframe intermediário que redireciona para a tela de configurações dos campos. |
| `client/public/export.html` | HTML / JS | Iframe intermediário que redireciona para a tela de exportação de dados. |
| `client/public/icon.svg` | Vetor SVG | Ícone oficial do Power-Up exibido na interface do Trello. |
| `client/src/App.tsx` | Código React | Roteador principal que identifica a tela solicitada pelo Trello (Card Back, Settings, Export). |
| `client/src/pages/CardBackView.tsx` | Código React | Interface que renderiza os campos customizados dentro do cartão do Trello. |
| `client/src/pages/SettingsView.tsx` | Código React | Painel de controle completo para criar campos, grupos e gerenciar templates. |
| `client/src/pages/ExportView.tsx` | Código React | Ferramenta que gera e baixa a planilha Excel/CSV com os dados consolidados do quadro. |
| `client/src/lib/trello.ts` | Código TypeScript | Wrapper de integração e tipagem com a biblioteca oficial `power-up.min.js` [4]. |

---

## 2. Processo de Hospedagem

Como o Trello renderiza o Power-Up através de iframes seguros, os arquivos do projeto precisam estar hospedados em um servidor web com suporte a **HTTPS** [1].

### Opção Recomendada: Hospedagem Interna do Manus (Imediata)
O seu Power-Up já está compilado e rodando em um servidor seguro provido pelo Manus. 
* **URL Base de Hospedagem:** `https://3000-iu8ha8ei1ni4re4m668yc-1a443938.us3.manus.computer`
* **URL do Conector Iframe:** `https://3000-iu8ha8ei1ni4re4m668yc-1a443938.us3.manus.computer/connector.html`

> ⚠️ **Aviso de Produção:** A hospedagem temporária do Manus é excelente para testes imediatos. Para uso corporativo diário e permanente, recomendamos implantar o projeto em uma plataforma de hospedagem estática gratuita como **Vercel**, **Netlify** ou **GitHub Pages** [1].

---

## 3. Guia Passo a Passo: Criação do Power-Up no Trello

Siga as etapas abaixo para registrar o **Private Fields** na sua conta do Trello:

1. Acesse o portal de desenvolvedores do Trello em [Trello Power-Up Admin](https://trello.com/power-ups/admin) [5].
2. Clique no botão **"Criar um Power-Up"** (ou "Create a Power-Up") no canto superior direito [5].
3. Preencha as informações básicas do formulário:
   * **Nome:** `Private Fields`
   * **Espaço de Trabalho (Workspace):** Selecione o espaço de trabalho onde deseja utilizar o Power-Up.
   * **E-mail de Suporte:** Seu e-mail de contato.
   * **Nome do Autor:** Seu nome ou nome da sua empresa.
4. Na seção **"URL do Conector do Iframe"** (Iframe Connector URL), insira exatamente o link do conector hospedado:
   * URL: `https://3000-iu8ha8ei1ni4re4m668yc-1a443938.us3.manus.computer/connector.html`
5. Clique em **"Salvar"** (Save) para criar o registro inicial.

---

## 4. Configuração das Capacidades (Capabilities) no Trello

Para que o Trello saiba quais partes da interface o Power-Up vai modificar, você precisa ativar as capacidades corretas no painel de administração [3]:

1. No menu lateral esquerdo do seu Power-Up recém-criado, clique em **"Capacidades"** (Capabilities) [3].
2. Ative as seguintes opções (marcando a caixinha ou selecionando "Ativado"):
   * **Seção Traseira do Cartão (Card Back Section):** Permite renderizar a interface de preenchimento de campos dentro de cada cartão [3].
   * **Mostrar Configurações (Show Settings):** Habilita o botão de engrenagem para abrir a área de criação de campos [3].
   * **Botões do Quadro (Board Buttons):** Permite adicionar o botão no topo do quadro para exportar os dados para o Excel [3].
3. Clique em **"Salvar"** (Save) no final da página de capacidades.

---

## 5. Processo de Instalação e Ativação no Quadro

Agora que o Power-Up está registrado e configurado, vamos ativá-lo no seu quadro de trabalho diário:

1. Abra o **Trello** e navegue até o quadro onde deseja usar os campos personalizados.
2. No topo do quadro, clique no botão **"Power-Ups"** e selecione **"Adicionar Power-Ups"** (ou "Add Power-Ups").
3. No menu lateral esquerdo da loja de Power-Ups, clique na categoria **"Personalizado"** (Custom) [3].
4. Você verá o **Private Fields** listado como um Power-Up privado disponível.
5. Clique no botão **"Adicionar"** (Add) para instalá-lo no quadro [3].

---

## 6. Como Utilizar o Private Fields (Guia de Uso)

### Passo 1: Criar seus Primeiros Campos
1. Abra qualquer cartão no seu quadro.
2. Na seção do **Private Fields** (que aparecerá logo acima da área de anexos), clique no ícone de **Engrenagem (Configurações)** no canto direito da seção.
3. No painel de configurações que se abrirá:
   * Vá na aba **"Grupos"** e crie categorias para organizar seus dados (ex: "CRM", "Dados de Entrega").
   * Vá na aba **"Campos"** e adicione seus campos personalizados. Escolha o tipo de campo (Texto, Número, Data, Checkbox, Lista Suspensa ou Múltipla Escolha) e associe ao grupo correspondente.
   * Se desejar, configure **Campos Dependentes** ativando a chave de dependência (ex: exibir o campo "Data de Faturamento" apenas se o checkbox "Faturado?" estiver marcado como `true`).
4. Feche a janela de configurações. Os campos aparecerão imediatamente no cartão prontos para preenchimento!

### Passo 2: Preencher e Salvar Dados
* O preenchimento é extremamente simples e intuitivo.
* O salvamento é **automático**. Assim que você digita em um campo de texto e clica fora (perda de foco), ou altera uma seleção, o Power-Up exibe um indicador "salvando..." e grava os dados diretamente na nuvem segura do Trello [2].

### Passo 3: Exportar para o Excel
1. No topo do seu quadro do Trello, clique no botão **"Exportar Private Fields"** (localizado ao lado do botão de filtros/membros do quadro).
2. O painel de exportação fará uma varredura em todos os cartões do quadro atual em busca de dados salvos.
3. Clique em **"Baixar Planilha Excel (.CSV)"**.
4. Um arquivo formatado com ponto e vírgula (`;`) e codificação UTF-8 com BOM será baixado, permitindo que você o abra diretamente no Microsoft Excel com acentuação e colunas perfeitamente alinhadas.

---

## Referências

[1] Atlassian. *Building A Trello Power-Up: Part One*. Disponível em: <https://developer.atlassian.com/cloud/trello/guides/power-ups/building-a-power-up-part-one/>. Acesso em: 01 jun. 2026.

[2] Atlassian. *Getting and Setting Plugin Data*. Disponível em: <https://developer.atlassian.com/cloud/trello/power-ups/client-library/getting-and-setting-data/>. Acesso em: 01 jun. 2026.

[3] Atlassian. *Power-Up Capabilities*. Disponível em: <https://developer.atlassian.com/cloud/trello/power-ups/capabilities/>. Acesso em: 01 jun. 2026.

[4] Atlassian. *Power-Up Client Library*. Disponível em: <https://developer.atlassian.com/cloud/trello/power-ups/client-library/>. Acesso em: 01 jun. 2026.

[5] Atlassian. *REST API Client*. Disponível em: <https://developer.atlassian.com/cloud/trello/power-ups/rest-api-client/>. Acesso em: 01 jun. 2026.
