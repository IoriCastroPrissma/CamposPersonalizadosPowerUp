# 🔧 Instalar Git no Windows - Passo a Passo

O Git é um programa que você precisa para fazer upload do código. Vamos instalar agora!

---

## ✅ PASSO 1: Baixar o Git

1. Abra este link no seu navegador: **https://git-scm.com/download/win**

2. O download vai começar automaticamente (um arquivo `.exe`)

3. Aguarde terminar (pode levar alguns segundos)

---

## ✅ PASSO 2: Instalar o Git

1. **Abra a pasta Downloads** no seu computador

2. **Procure pelo arquivo `Git-2.x.x-64-bit.exe`** (o número da versão pode ser diferente)

3. **Clique duas vezes** para abrir o instalador

4. Uma janela vai aparecer. Clique em **"Next >"** (Próximo)

5. **Aceite o contrato de licença:**
   - Marque a caixa **"I accept the agreement"**
   - Clique em **"Next >"**

6. **Escolha o local de instalação:**
   - Deixe como está (geralmente `C:\Program Files\Git`)
   - Clique em **"Next >"**

7. **Escolha os componentes:**
   - Deixe tudo marcado como está
   - Clique em **"Next >"**

8. **Escolha o editor padrão:**
   - Deixe como está (Vim ou o que estiver selecionado)
   - Clique em **"Next >"**

9. **Configuração do PATH:**
   - Selecione **"Git from the command line and also from 3rd-party software"** (segunda opção)
   - Clique em **"Next >"**

10. **Escolha a biblioteca HTTPS:**
    - Deixe como está (OpenSSL)
    - Clique em **"Next >"**

11. **Configuração de quebra de linha:**
    - Selecione **"Checkout Windows-style, commit Unix-style line endings"** (primeira opção)
    - Clique em **"Next >"**

12. **Escolha o emulador de terminal:**
    - Selecione **"Use Windows' default console window"**
    - Clique em **"Next >"**

13. **Comportamento do pull padrão:**
    - Deixe como está
    - Clique em **"Next >"**

14. **Credenciais:**
    - Deixe como está
    - Clique em **"Next >"**

15. **Opções extras:**
    - Deixe como está
    - Clique em **"Next >"**

16. **Experimental:**
    - Deixe como está
    - Clique em **"Install"** (Instalar)

17. **Aguarde a instalação terminar** (pode levar 1-2 minutos)

18. Quando terminar, clique em **"Finish"** (Concluir)

✅ **Git instalado com sucesso!**

---

## ✅ PASSO 3: Verificar se o Git foi Instalado

1. **Abra o Prompt de Comando novamente:**
   - Pressione `Windows + R`
   - Digite `cmd`
   - Pressione `Enter`

2. **Digite este comando:**

```
git --version
```

3. **Pressione `Enter`**

4. **Se aparecer algo como `git version 2.x.x`, significa que funcionou! ✅**

---

## ✅ PASSO 4: Configurar o Git (Primeira Vez)

Agora você precisa configurar seu nome e email no Git.

1. **No Prompt de Comando, copie e cole este comando:**

```
git config --global user.name "Seu Nome"
```

**Substitua `Seu Nome` pelo seu nome real.** Exemplo:

```
git config --global user.name "Iori Castro"
```

Pressione `Enter`.

2. **Copie e cole este comando:**

```
git config --global user.email "seu.email@gmail.com"
```

**Substitua `seu.email@gmail.com` pelo seu email do GitHub.** Exemplo:

```
git config --global user.email "iori@example.com"
```

Pressione `Enter`.

✅ **Git configurado!**

---

## ✅ PASSO 5: Voltar para o Upload do Código

Agora que o Git está instalado, você pode voltar ao guia anterior e continuar do **PASSO 3** (Fazer Upload do Código para o GitHub).

**Abra o Prompt de Comando novamente na pasta do projeto:**

1. Abra a pasta: `C:\Users\priss\OneDrive\Área de Trabalho\CamposPersonalizadosPowerUp-main\CamposPersonalizadosPowerUp-main`

2. Clique na barra de endereço com botão direito

3. Escolha **"Copiar endereço como texto"**

4. Abra o Prompt de Comando (`Windows + R`, depois `cmd`)

5. Digite:

```
cd C:\Users\priss\OneDrive\Área de Trabalho\CamposPersonalizadosPowerUp-main\CamposPersonalizadosPowerUp-main
```

Pressione `Enter`.

6. Agora você pode continuar com os comandos do Git! 🚀

---

## ❓ Dúvidas

### P: Onde está o arquivo do Git?
**R:** Procure em `C:\Program Files\Git` ou `C:\Program Files (x86)\Git`

### P: O instalador não abriu
**R:** Tente clicar com botão direito no arquivo `.exe` e escolha **"Executar como administrador"**

### P: Ainda aparece "git não é reconhecido"
**R:** Reinicie o Prompt de Comando (feche e abra novamente)

---

**Pronto! Agora você tem o Git instalado. Volta ao guia anterior e continua! 💪**
