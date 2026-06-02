# 🪟 Guia para Windows - Passo a Passo

Você está no Windows! Sem problema, vou adaptar tudo para você.

---

## 📥 PASSO 0: Baixar o Código do Projeto

Primeiro, você precisa ter o código do Power-Up no seu computador.

### Como fazer:

1. Abra este link no navegador: **https://github.com/IoriCastroPrissma/CamposPersonalizadosPowerUp**

2. Clique no botão verde **"< > Code"** (verde, no topo direito)

3. Clique em **"Download ZIP"**

4. Aguarde o download terminar (vai baixar um arquivo `.zip`)

5. **Abra a pasta Downloads** no seu computador

6. **Clique com botão direito** no arquivo `CamposPersonalizadosPowerUp-main.zip` e escolha **"Extrair Tudo"**

7. Escolha um local para extrair (recomendo a pasta `Documentos` ou `Desktop`)

8. **Abra a pasta extraída** - ela se chama `CamposPersonalizadosPowerUp-main`

✅ **Pronto! Você tem o código no seu computador!**

---

## ✅ PASSO 1: Criar um Token de Acesso (Chave de Segurança)

1. Abra este link no seu navegador: **https://github.com/settings/tokens**
   - Se não estiver logado no GitHub, faça login com sua conta

2. Clique no botão verde **"Generate new token"** (Gerar novo token)

3. Clique em **"Generate new token (classic)"** (a opção clássica)

4. Na tela que abrir, preencha assim:
   - **Note:** Digite `Private Fields Upload`
   - **Expiration:** Escolha `90 days`
   - **Scopes:** Procure por `repo` e marque a caixa ao lado dele

5. Clique no botão verde **"Generate token"** no final da página

6. **COPIE A SENHA LONGA QUE APARECER** e guarde em um bloco de notas (Notepad)

✅ **Token criado!**

---

## ✅ PASSO 2: Abrir o Prompt de Comando no Local Correto

Agora vamos abrir o Prompt de Comando na pasta do projeto.

### Como fazer:

1. **Abra a pasta extraída** `CamposPersonalizadosPowerUp-main` no seu computador

2. **Clique na barra de endereço** (onde mostra o caminho da pasta) com o botão direito do mouse

3. Escolha **"Copiar endereço como texto"** (ou algo parecido)

4. **Abra o Prompt de Comando:**
   - Pressione `Windows + R`
   - Digite `cmd`
   - Pressione `Enter`

5. **Uma janela preta vai abrir.** Nela, digite:

```
cd C:\Users\SeuUsuario\Desktop\CamposPersonalizadosPowerUp-main
```

**Substitua `SeuUsuario` pelo seu nome de usuário do Windows** (o nome que aparece no início quando você liga o computador)

**Exemplo real:**
```
cd C:\Users\Iori\Desktop\CamposPersonalizadosPowerUp-main
```

6. Pressione `Enter`

✅ **Você está na pasta correta!**

---

## ✅ PASSO 3: Fazer Upload do Código para o GitHub

Agora vamos enviar o código para o GitHub.

### Como fazer:

1. **No Prompt de Comando, copie e cole este comando:**

```
git remote remove origin
```

Pressione `Enter`. (Pode aparecer um erro, não se preocupe)

2. **Copie e cole este comando (com seu token):**

```
git remote add origin https://SEU_TOKEN@github.com/IoriCastroPrissma/CamposPersonalizadosPowerUp.git
```

**Antes de pressionar Enter, substitua `SEU_TOKEN` pelo token que você copiou no PASSO 1.**

Exemplo (não use este, é só exemplo):
```
git remote add origin https://ghp_abc123xyz456@github.com/IoriCastroPrissma/CamposPersonalizadosPowerUp.git
```

Pressione `Enter`.

3. **Copie e cole este comando final:**

```
git push -u origin main
```

Pressione `Enter` e aguarde alguns segundos.

4. **Se aparecer uma mensagem com "main -> main", funcionou! ✅**

Se aparecer um erro, me envie a mensagem de erro que vou ajudar.

---

## ✅ PASSO 4: Conectar GitHub ao Vercel

Agora vamos publicar seu código na internet.

### Como fazer:

1. Abra este link no navegador: **https://vercel.com/signup**

2. Clique em **"Continue with GitHub"** (Continuar com GitHub)

3. Clique em **"Authorize Vercel"** (Autorizar Vercel)

4. Você voltará para o Vercel. Clique em **"Add New..."** (Adicionar Novo)

5. Clique em **"Project"** (Projeto)

6. Na caixa de busca, digite: `CamposPersonalizadosPowerUp`

7. Selecione o repositório que aparecer

8. Clique em **"Import"** (Importar)

9. **Na próxima tela, não mude nada. Apenas clique em "Deploy"** (Publicar)

10. **Aguarde 2-5 minutos** até aparecer "Congratulations!"

11. Clique em **"Visit"** (Visitar)

12. **COPIE A URL** que aparecer na barra de endereço (ex: `https://campos-personalizados-power-up.vercel.app`)

✅ **Seu Power-Up está na internet!**

---

## ✅ PASSO 5: Atualizar o Trello

Agora vamos dizer ao Trello onde encontrar seu Power-Up.

### Como fazer:

1. Abra este link: **https://trello.com/power-ups/admin**

2. Clique no seu Power-Up **"Private Fields"**

3. Procure por **"Iframe Connector URL"** ou **"URL do Conector"**

4. **Apague a URL antiga**

5. **Cole a URL nova do Vercel com `/connector.html` no final:**

```
https://seu-dominio-vercel.vercel.app/connector.html
```

6. Clique em **"Save"** ou **"Salvar"**

✅ **Pronto!**

---

## ✅ PASSO 6: Testar no Trello

1. Abra o **Trello**

2. Abra um cartão do seu quadro

3. **Procure pela seção "Private Fields"** na parte inferior

4. Se aparecer, **funcionou! 🎉**

---

## ❓ Dúvidas Comuns no Windows

### P: Onde coloco o token?
**R:** No comando `git remote add origin https://SEU_TOKEN@github.com/...` você substitui `SEU_TOKEN` pelo token que copiou.

### P: Não consegui abrir o Prompt de Comando
**R:** Pressione `Windows + R`, digite `cmd` e pressione Enter.

### P: Qual é meu nome de usuário do Windows?
**R:** Abra o Explorador de Arquivos, clique em "Este Computador" e veja o caminho. O nome de usuário é o que vem depois de `C:\Users\`

### P: Apareceu "git: command not found"
**R:** Você precisa instalar o Git. Baixe em: https://git-scm.com/download/win

### P: Perdi meu token
**R:** Sem problema! Crie um novo em https://github.com/settings/tokens

---

**Você consegue! Comece pelo PASSO 0 e me avisa quando terminar cada um! 💪**
