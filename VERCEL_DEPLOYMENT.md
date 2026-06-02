# Guia: Deploy em Vercel (Hospedagem Permanente)

Este guia fornece instruções passo a passo para fazer o deploy do Power-Up Private Fields em Vercel, garantindo uma URL permanente e funcionamento 24/7 [1].

---

## 📋 Pré-requisitos

1. ✅ Código enviado para o GitHub (veja `GITHUB_PUSH_GUIDE.md`)
2. ✅ Conta no GitHub
3. ✅ Conta no Vercel (gratuita em https://vercel.com)

---

## 🚀 Passo 1: Conectar Vercel ao GitHub

1. Acesse https://vercel.com e clique em **"Sign Up"**
2. Escolha **"Continue with GitHub"** e autorize a conexão
3. Após fazer login, você estará no dashboard do Vercel

---

## 📦 Passo 2: Importar o Repositório

1. No dashboard do Vercel, clique em **"Add New..."** → **"Project"**
2. Na seção **"Import Git Repository"**, procure por seu repositório:
   - Digite: `CamposPersonalizadosPowerUp`
   - Selecione: `IoriCastroPrissma/CamposPersonalizadosPowerUp`
3. Clique em **"Import"**

---

## ⚙️ Passo 3: Configurar o Build

A tela de configuração do projeto abrirá. Verifique:

| Campo | Valor Esperado | Ação |
| :--- | :--- | :--- |
| **Project Name** | `CamposPersonalizadosPowerUp` | Pode manter ou alterar |
| **Framework Preset** | `Vite` | Deve estar selecionado automaticamente |
| **Build Command** | `pnpm run build` | Já está configurado no `vercel.json` |
| **Output Directory** | `dist/public` | Já está configurado no `vercel.json` |
| **Environment Variables** | (deixe vazio) | Não há variáveis de ambiente necessárias |

Se tudo estiver correto, clique em **"Deploy"** [1].

---

## ✅ Passo 4: Aguardar o Deploy

O Vercel começará a construir e fazer o deploy do seu projeto. Você verá:

1. **Building** - Compilando o código React
2. **Analyzing** - Verificando os arquivos
3. **Deploying** - Enviando para os servidores
4. **Ready** - ✅ Seu Power-Up está ao vivo!

Isso leva geralmente 2-5 minutos.

---

## 🌐 Passo 5: Obter a URL Permanente

Após o deploy ser concluído com sucesso:

1. Você verá uma mensagem **"Congratulations! Your project has been successfully deployed"**
2. Clique em **"Visit"** para ver seu projeto ao vivo
3. A URL será algo como: `https://campos-personalizados-power-up.vercel.app`

**Copie esta URL** - ela será usada para configurar o Power-Up no Trello.

---

## 🔗 Passo 6: Atualizar a URL no Trello

Agora que você tem uma URL permanente, atualize o Power-Up no Trello:

1. Acesse https://trello.com/power-ups/admin
2. Selecione seu Power-Up **"Private Fields"**
3. Vá para a aba **"Capabilities"** ou **"Settings"**
4. Procure por **"Iframe Connector URL"** ou **"URL do Conector"**
5. Substitua a URL antiga pela nova URL do Vercel:
   ```
   https://seu-dominio-vercel.vercel.app/connector.html
   ```
6. Clique em **"Save"** ou **"Salvar"**

---

## 🔄 Passo 7: Testar o Power-Up

1. Abra um quadro do Trello onde o Power-Up está instalado
2. Abra um cartão
3. Você deve ver a seção **"Private Fields"** carregando normalmente
4. Teste criando um campo e preenchendo dados
5. Verifique se os dados são salvos corretamente

---

## 📊 Monitorar o Deploy

Após o deploy, você pode:

1. **Ver logs de build:** Dashboard do Vercel → Seu projeto → **"Deployments"** → Clique no deploy → **"Build Logs"**
2. **Ver logs de runtime:** Dashboard do Vercel → Seu projeto → **"Deployments"** → Clique no deploy → **"Runtime Logs"**
3. **Configurar alertas:** Vá para **"Settings"** → **"Notifications"** para receber alertas sobre erros

---

## 🔐 Configurações de Segurança Recomendadas

### Proteger Deployments com Senha (Opcional)

Se você quiser proteger seu deployment com uma senha:

1. No dashboard do Vercel, vá para **"Settings"** → **"Deployment Protection"**
2. Ative **"Password Protection"**
3. Defina uma senha forte
4. Qualquer pessoa que acessar a URL precisará inserir a senha

**Nota:** Isso pode afetar o funcionamento do Trello, então use com cuidado.

### Configurar Domínio Customizado (Opcional)

Se você quiser usar um domínio próprio em vez de `vercel.app`:

1. Vá para **"Settings"** → **"Domains"**
2. Clique em **"Add"**
3. Insira seu domínio (ex: `powerup.seudominio.com`)
4. Siga as instruções para apontar os registros DNS
5. Após a verificação, atualize a URL no Trello

---

## 🚀 Atualizações Futuras

Sempre que você fizer alterações no código:

1. Faça commit e push para o GitHub:
   ```bash
   git add .
   git commit -m "Descrição da mudança"
   git push origin main
   ```

2. O Vercel **detectará automaticamente** a mudança e fará o deploy novamente
3. Seu Power-Up será atualizado sem necessidade de ação manual

---

## ❓ Problemas Comuns

### Erro: "Build failed"
**Solução:** Verifique os logs de build no Vercel. Geralmente é um erro de sintaxe ou dependência faltando.

### Erro: "Cannot find module 'date-fns'"
**Solução:** Execute `pnpm install` localmente e faça push novamente.

### Power-Up não carrega no Trello
**Solução:** 
1. Verifique se a URL do conector está correta no Trello
2. Abra o console do navegador (F12) e procure por erros CORS
3. Teste a URL diretamente no navegador

### Vercel mostra "404 Not Found"
**Solução:** Verifique se o `outputDirectory` está correto em `vercel.json` (deve ser `dist/public`)

---

## 📞 Suporte

- **Documentação Vercel:** https://vercel.com/docs
- **Comunidade Vercel:** https://github.com/vercel/vercel/discussions
- **Status do Vercel:** https://www.vercelstatus.com/

---

## ✨ Próximos Passos

Após o deploy bem-sucedido:

1. ✅ Teste o Power-Up em um cartão do Trello
2. ✅ Configure campos personalizados no painel de configurações
3. ✅ Preencha dados em alguns cartões
4. ✅ Teste a exportação para Excel
5. ✅ Convide outros membros do seu espaço de trabalho para usar o Power-Up

---

**Parabéns! Seu Power-Up Private Fields agora está hospedado de forma permanente e segura no Vercel!** 🎉

---

## Referências

[1] Vercel. *Deploying with Vercel*. Disponível em: <https://vercel.com/docs/deployments/overview>. Acesso em: 01 jun. 2026.
