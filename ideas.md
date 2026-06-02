# Brainstorming de Design - Private Fields Trello Power-Up

Este documento explora três abordagens estéticas e conceituais distintas para a interface do Power-Up "Private Fields". Como o Power-Up é executado dentro do próprio Trello via iframes, a interface deve se integrar perfeitamente ao fluxo de trabalho do usuário, oferecendo uma experiência premium, polida e intuitiva.

<response>
<text>
## Abordagem 1: Atlassian Native Harmonious (Integração Perfeita)

### Design Movement
**Minimalismo Corporativo Moderno (SaaS Premium)**. Esta abordagem foca em replicar exatamente a linguagem visual oficial do Trello e do ecossistema Atlassian (Design System da Atlassian - ADS), fazendo com que o Power-Up pareça uma funcionalidade nativa e oficial do Trello.

### Core Principles
1. **Invisibilidade de Costura**: O usuário não deve perceber onde termina o Trello e onde começa o Power-Up.
2. **Clareza de Informação**: Foco total na legibilidade dos dados com contraste ideal e hierarquia tipográfica limpa.
3. **Eficiência Espacial**: Uso inteligente de padding e margens para encaixar múltiplos campos na lateral do cartão sem poluir visualmente.

### Color Philosophy
Utilização da paleta oficial do Trello/Atlassian:
* **Background**: Branco (`#FFFFFF`) e cinza muito claro (`#F4F5F7` / `oklch(0.97 0.005 250)`) para áreas de fundo.
* **Primary/Accent**: Azul Atlassian (`#0052CC` / `oklch(0.45 0.18 255)`) para botões de ação primária e foco.
* **Text**: Cinza escuro neutro (`#172B4D` / `oklch(0.25 0.02 250)`) para legibilidade máxima.
* **Borders**: Cinza suave (`#DFE1E6` / `oklch(0.90 0.01 250)`) para divisores e inputs.

### Layout Paradigm
Estrutura limpa, baseada em colunas verticais e grupos expansíveis (Accordions). O layout de configuração usa uma barra lateral de navegação esquerda e um painel de edição à direita. No verso do cartão (card-back), os campos são organizados em seções de duas colunas (para telas maiores) ou uma coluna compacta, com agrupamento visual claro usando bordas sutis.

### Signature Elements
* **Ícones oficiais do Trello** (via Lucide adaptados para estilo Atlassian).
* **Badges de status arredondadas** com cores suaves de fundo (ex: verde pastel para ativado, azul pastel para rascunho).
* **Inputs com bordas finas** que se tornam azuis e ganham sombra suave ao receber foco.

### Interaction Philosophy
Transições extremamente rápidas e diretas. O drag-and-drop de campos é suave, mostrando um indicador sutil de posicionamento ("drop indicator") na cor azul. Feedback visual imediato ao salvar ou alterar valores de campos.

### Animation
Animações rápidas e discretas (150ms a 200ms) usando curvas de transição suaves:
* **Foco em Inputs**: Transição de cor de borda em 120ms.
* **Grupos Expansíveis**: Deslizamento vertical suave com opacidade (180ms).
* **Drag-and-Drop**: Efeito de "levitação" sutil no item arrastado com sombra suave.

### Typography System
* **Font Family**: `Segoe UI`, `Roboto`, `Helvetica Neue`, sans-serif (para combinar perfeitamente com o Trello).
* **Hierarchy**:
  * Título da Seção: `font-semibold text-sm text-slate-800`
  * Rótulo do Campo (Label): `font-medium text-xs text-slate-600`
  * Valor do Campo: `text-sm text-slate-900`
</text>
<probability>0.08</probability>
</response>

<response>
<text>
## Abordagem 2: Cyber-Grid Executive (Visual de Alta Densidade de Dados)

### Design Movement
**Neo-Brutalismo Corporativo / Dark Mode Executive**. Uma estética moderna que valoriza a densidade de informações, linhas estruturadas fortes e contraste nítido. Perfeito para usuários avançados que usam o Trello como um banco de dados de alta performance (CRM, ERP, controle financeiro complexo).

### Core Principles
1. **Alta Densidade**: Maximizar o espaço útil exibindo o máximo de dados sem necessidade de rolagem excessiva.
2. **Estrutura Baseada em Grid**: Uso de linhas e divisores nítidos para delimitar dados e inputs.
3. **Contraste Forte**: Cores de destaque vibrantes contra fundos neutros profundos.

### Color Philosophy
* **Background**: Cinza escuro profundo (`oklch(0.18 0.01 260)`) com subtons azulados para um visual moderno e profissional.
* **Primary/Accent**: Verde neon/esmeralda vibrante (`oklch(0.75 0.18 140)`) ou azul elétrico para destaques de foco, botões ativos e indicadores de dependência.
* **Text**: Branco puro para títulos e cinza claro (`oklch(0.85 0.01 260)`) para textos secundários.
* **Borders**: Cinza médio nítido (`oklch(0.3 0.01 260)`) com 1px de espessura.

### Layout Paradigm
Layout baseado em tabelas de alta densidade e grids modulares. Os grupos de campos são divididos por linhas horizontais sólidas. Não há sombras suaves; em vez disso, usa-se bordas sólidas e contrastes de cores de fundo para criar profundidade.

### Signature Elements
* **Monospace numbers**: Números e datas exibidos em fonte monoespaçada para alinhamento perfeito.
* **Indicadores de dependência com linhas conectoras**: Linhas finas conectando o campo pai ao campo filho dependente, simulando um fluxo lógico.
* **Botões com cantos vivos (radius-sm)** e bordas grossas ao passar o mouse.

### Interaction Philosophy
Interações rápidas e mecânicas. Ao clicar em um campo, ele se expande instantaneamente. O drag-and-drop usa um contorno tracejado nítido para indicar o local de destino.

### Animation
Animações quase instantâneas (100ms a 150ms) para dar uma sensação de extrema performance:
* **Entradas**: Efeito de fade-in rápido (100ms).
* **Hover**: Mudança de cor de fundo instantânea para indicar interatividade.
* **Drag-and-Drop**: Sem atraso de movimentação, encaixe imediato.

### Typography System
* **Font Family**: `JetBrains Mono` ou `Fira Code` para números/valores técnicos; `Inter` ou `System-UI` para rótulos e textos.
* **Hierarchy**:
  * Títulos: `font-bold text-xs uppercase tracking-wider text-slate-400`
  * Rótulos: `font-semibold text-xs text-slate-300`
  * Valores: `font-mono text-sm text-white`
</text>
<probability>0.05</probability>
</response>

<response>
<text>
## Abordagem 3: Warm Organic & Craft (Foco em Usabilidade Humana)

### Design Movement
**Minimalismo Orgânico / Warm Corporate**. Uma estética acolhedora, com cores quentes e terrosas, cantos bastante arredondados e sombras extremamente suaves. É voltada para equipes criativas, agências de design, marketing ou gerenciamento de projetos pessoais, onde o trabalho deve parecer agradável, tátil e livre de estresse.

### Core Principles
1. **Sensação Tátil**: Elementos que parecem objetos físicos reais (cartões físicos, papéis sobrepostos).
2. **Espaço para Respirar**: Margens generosas e espaçamentos amplos que reduzem a ansiedade cognitiva.
3. **Micro-momentos de Delícia**: Detalhes visuais charmosos e feedbacks sutis que tornam o preenchimento de dados satisfatório.

### Color Philosophy
Uma paleta de tons quentes e suaves inspirada na natureza:
* **Background**: Off-white quente (`oklch(0.98 0.005 60)`) para a tela de fundo.
* **Primary/Accent**: Terracota suave (`oklch(0.60 0.15 45)`) ou verde oliva quente (`oklch(0.55 0.10 120)`) para botões e seleções.
* **Secondary**: Creme suave (`oklch(0.95 0.01 70)`) para cartões internos e agrupamentos.
* **Text**: Marrom escuro/carvão quente (`oklch(0.25 0.01 60)`) em vez de preto puro, tornando a leitura mais confortável para os olhos.

### Layout Paradigm
Layout baseado em "cards sobre cards". Cada grupo de campos é um cartão arredondado com uma sombra projetada muito sutil e desfocada. Os campos têm cantos arredondados generosos (`rounded-xl`).

### Signature Elements
* **Ícones arredondados e amigáveis** (Lucide com traços mais grossos).
* **Campos de seleção estilo "pills"** com transições de cor de fundo extremamente suaves.
* **Indicadores de campos obrigatórios** representados por pequenos pontos coloridos em vez do tradicional asterisco vermelho agressivo.

### Interaction Philosophy
Interações táteis e fluidas. Ao arrastar um campo para reordenar, ele se inclina ligeiramente (1-2 graus) simulando gravidade e peso físico.

### Animation
Animações ligeiramente mais longas (250ms a 350ms) com curvas de amortecimento elásticas (spring physics) para parecerem orgânicas e naturais:
* **Drag-and-Drop**: Efeito de inclinação física e mola ao soltar.
* **Expansão de Grupos**: Transição suave com amortecimento elástico (`cubic-bezier(0.34, 1.56, 0.64, 1)`).
* **Hover em Botões**: Elevação sutil no eixo Z com aumento da sombra difusa.

### Typography System
* **Font Family**: `Plus Jakarta Sans` ou `Outfit` para títulos e rótulos; `Inter` para o corpo do texto.
* **Hierarchy**:
  * Títulos: `font-bold text-base text-stone-800`
  * Rótulos: `font-semibold text-xs text-stone-500`
  * Inputs/Valores: `text-sm text-stone-900 rounded-lg`
</text>
<probability>0.07</probability>
</response>

---

## Escolha e Compromisso de Design

Para o desenvolvimento do **Private Fields Trello Power-Up**, a abordagem escolhida é a **Abordagem 1: Atlassian Native Harmonious**.

### Justificativa da Escolha
Como o objetivo do usuário é ter um Power-Up privado real rodando dentro do Trello para uso diário, a integração perfeita com o visual do Trello é crucial. O usuário não deve sentir que está usando um sistema externo ou "estranho" enxertado em seu quadro. A Abordagem 1 garante que os Private Fields pareçam uma extensão natural e premium das funcionalidades nativas do Trello, oferecendo extrema usabilidade, familiaridade imediata para qualquer membro do quadro e excelente legibilidade.

### Aplicação Prática
1. Usaremos a biblioteca oficial do Trello para garantir que as fontes, tamanhos e cores básicas herdem ou complementem as do Trello.
2. O tema padrão será `light` (combinando com a maioria das telas traseiras de cartões do Trello), mas daremos suporte a cores de texto e bordas que se adaptem caso o usuário use o modo escuro do Trello.
3. Adicionaremos o arquivo CSS de estilos globais (`client/src/index.css`) com as variáveis de cores correspondentes a essa identidade corporativa limpa.
