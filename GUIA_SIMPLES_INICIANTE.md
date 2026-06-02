# 🎯 Guia Simples para Iniciantes - Sem Experiência Técnica

Este guia foi feito especialmente para você que não tem experiência com Git, GitHub ou deploy. Vamos fazer tudo passo a passo, como se estivéssemos conversando.

---

## 📌 O que você precisa fazer (resumo):

1. **Copiar o código para o GitHub** (é como fazer upload de um arquivo)
2. **Conectar o GitHub ao Vercel** (é como dizer "publique meu código na internet")
3. **Usar a URL gerada no Trello** (é como colocar o link do seu Power-Up)

Pronto! Seu Power-Up estará funcionando 24/7 na internet.

---

## ✅ PASSO 1: Criar um Token de Acesso (Chave de Segurança)

Pense em um "token" como uma chave especial que permite que você faça upload do código para o GitHub de forma segura.

### Como fazer:

1. Abra este link no seu navegador: **https://github.com/settings/tokens**
   - Se não estiver logado no GitHub, faça login com sua conta

2. Clique no botão verde **"Generate new token"** (Gerar novo token)

3. Clique em **"Generate new token (classic)"** (a opção clássica)

4. Na tela que abrir, preencha assim:
   - **Note:** Digite `Private Fields Upload` (é só um nome para você lembrar)
   - **Expiration:** Escolha `90 days` (90 dias é suficiente)
   - **Scopes:** Procure por `repo` e marque a caixa ao lado dele

5. Clique no botão verde **"Generate token"** no final da página

6. **IMPORTANTE:** Uma senha longa vai aparecer na tela. **Copie essa senha e guarde em um lugar seguro** (pode ser um bloco de notas). Você não verá essa senha novamente!

✅ **Pronto! Você tem seu token!**

---

## ✅ PASSO 2: Fazer Upload do Código para o GitHub

Agora vamos enviar o código do Power-Up para seu repositório no GitHub.

### Como fazer:

1. **Abra o Prompt de Comando (Windows) ou Terminal (Mac/Linux):**
   
   - **Windows:** Pressione `Windows + R`, digite `cmd` e pressione Enter
   - **Mac:** Procure por "Terminal" no Spotlight (Cmd + Espaço)
   - **Linux:** Procure por "Terminal" no menu de aplicações

2. **Copie e cole este comando no terminal:**

```
cd /home/ubuntu/private-fields-trello-powerup
```

Pressione **Enter**.

3. **Agora copie e cole este comando:**

```
git remote remove origin
```

Pressione **Enter**. (Pode aparecer um erro, não se preocupe - é normal)

4. **Copie e cole este comando (com seu token):**

```
git remote add origin https://SEU_TOKEN@github.com/IoriCastroPrissma/CamposPersonalizadosPowerUp.git
```

**Antes de pressionar Enter, substitua `SEU_TOKEN` pelo token que você copiou no PASSO 1.**

Exemplo real (não use este, é só exemplo):
```
git remote add origin https://ghp_abc123xyz456@github.com/IoriCastroPrissma/CamposPersonalizadosPowerUp.git
```

Pressione **Enter**.

5. **Agora copie e cole este comando final:**

```
git push -u origin main
```

Pressione **Enter** e aguarde. Pode levar alguns segundos.

6. **Se aparecer uma mensagem verde com "main -> main", significa que funcionou! ✅**

---

## ✅ PASSO 3: Conectar GitHub ao Vercel (Deploy Automático)

Agora vamos publicar seu código na internet usando o Vercel.

### Como fazer:

1. Abra este link no navegador: **https://vercel.com/signup**

2. Clique em **"Continue with GitHub"** (Continuar com GitHub)

3. Você será redirecionado para o GitHub. Clique em **"Authorize Vercel"** (Autorizar Vercel)

4. Você voltará para o Vercel. Clique em **"Add New..."** (Adicionar Novo)

5. Clique em **"Project"** (Projeto)

6. Na caixa de busca que aparecer, digite: `CamposPersonalizadosPowerUp`

7. Selecione o repositório que aparecer (deve ser o seu)

8. Clique em **"Import"** (Importar)

9. **Na próxima tela, não mude nada. Apenas clique em "Deploy"** (Publicar)

10. **Aguarde 2-5 minutos.** Você verá uma animação de carregamento.

11. Quando aparecer a mensagem **"Congratulations! Your project has been successfully deployed"**, clique em **"Visit"** (Visitar)

12. **COPIE A URL que aparecer na barra de endereço do navegador.** Ela será algo como:
    ```
    https://campos-personalizados-power-up.vercel.app
    ```

✅ **Pronto! Seu Power-Up está na internet!**

---

## ✅ PASSO 4: Atualizar o Trello com a Nova URL

Agora vamos dizer ao Trello onde encontrar seu Power-Up.

### Como fazer:

1. Abra este link: **https://trello.com/power-ups/admin**

2. Clique no seu Power-Up **"Private Fields"**

3. Procure por uma seção chamada **"Iframe Connector URL"** ou **"URL do Conector"**

4. **Apague a URL antiga** que estava lá

5. **Cole a URL nova** que você copiou do Vercel (ex: `https://campos-personalizados-power-up.vercel.app/connector.html`)

   **IMPORTANTE:** Adicione `/connector.html` no final da URL!

6. Clique em **"Save"** ou **"Salvar"**

✅ **Pronto! O Trello agora sabe onde encontrar seu Power-Up!**

---

## ✅ PASSO 5: Testar no Trello

Vamos verificar se tudo está funcionando.

### Como fazer:

1. Abra o **Trello** no seu navegador

2. Abra um dos seus quadros

3. Abra um cartão qualquer

4. **Procure pela seção "Private Fields"** na parte inferior do cartão

5. Se aparecer a seção com campos para preencher, **significa que funcionou! 🎉**

6. Teste criando um campo:
   - Clique no ícone de engrenagem (⚙️) na seção Private Fields
   - Clique em "Adicionar Campo"
   - Preencha o nome e tipo
   - Clique em "Salvar"

7. Volte ao cartão e teste preenchendo o campo

---

## 🎉 Parabéns!

Seu Power-Up **Private Fields** agora está:
- ✅ Hospedado no GitHub
- ✅ Publicado na internet via Vercel
- ✅ Funcionando no seu Trello
- ✅ Funcionando 24/7 sem parar

---

## ❓ Dúvidas Comuns

### P: Onde coloco o token?
**R:** Você coloca o token no comando do git. Ele fica assim: `https://SEU_TOKEN@github.com/...`

### P: Perdi meu token. O que faço?
**R:** Sem problema! Vá em https://github.com/settings/tokens, delete o token antigo e crie um novo seguindo o PASSO 1 novamente.

### P: Apareceu um erro no terminal. E agora?
**R:** Copie a mensagem de erro e me envie. Vou ajudar a resolver.

### P: Quanto custa o Vercel?
**R:** É totalmente gratuito para este tipo de projeto! Você não paga nada.

### P: Preciso fazer isso tudo novamente?
**R:** Não! Só na primeira vez. Depois, sempre que você quiser atualizar o código, basta fazer:
```
git add .
git commit -m "Descrição da mudança"
git push
```

E o Vercel atualiza automaticamente!

---

## 📞 Precisa de Ajuda?

Se ficar preso em algum passo:
1. Leia o passo novamente com calma
2. Verifique se copiou e colou corretamente
3. Se ainda tiver dúvida, me envie uma mensagem com:
   - Qual passo você está
   - O que você fez
   - Qual erro apareceu (se houver)

Estou aqui para ajudar! 😊

---

**Boa sorte! Você consegue! 💪**
