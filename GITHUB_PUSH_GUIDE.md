# Guia: Fazer Push do Código para o GitHub

Como o repositório foi criado no GitHub, você precisa fazer o push do código local. Siga um dos métodos abaixo:

---

## Método 1: Usando GitHub CLI (Recomendado)

### Passo 1: Instalar GitHub CLI
Se você ainda não tem o GitHub CLI instalado, baixe em: https://cli.github.com/

### Passo 2: Autenticar no GitHub
```bash
gh auth login
```

Siga as instruções na tela. Escolha:
- **What is your preferred protocol for Git operations?** → `HTTPS`
- **Authenticate Git with your GitHub credentials?** → `Yes`

### Passo 3: Fazer Push do Código
Abra o terminal/prompt de comando e execute:

```bash
cd /home/ubuntu/private-fields-trello-powerup

# Remover remote antigo (se existir)
git remote remove origin

# Adicionar novo remote
git remote add origin https://github.com/IoriCastroPrissma/CamposPersonalizadosPowerUp.git

# Fazer push
git push -u origin main
```

---

## Método 2: Usando Token de Acesso Pessoal (HTTPS)

### Passo 1: Criar um Token de Acesso Pessoal
1. Acesse: https://github.com/settings/tokens
2. Clique em **"Generate new token"** → **"Generate new token (classic)"**
3. Preencha os campos:
   - **Note:** `Private Fields Power-Up Push`
   - **Expiration:** Escolha um período (ex: 90 dias)
   - **Scopes:** Marque apenas `repo` (acesso completo aos repositórios)
4. Clique em **"Generate token"**
5. **Copie o token** (você não verá novamente!)

### Passo 2: Fazer Push Usando o Token
Abra o terminal/prompt de comando e execute:

```bash
cd /home/ubuntu/private-fields-trello-powerup

# Remover remote antigo (se existir)
git remote remove origin

# Adicionar novo remote com token
git remote add origin https://SEU_TOKEN@github.com/IoriCastroPrissma/CamposPersonalizadosPowerUp.git

# Fazer push
git push -u origin main
```

**Substitua `SEU_TOKEN`** pelo token que você copiou no Passo 1.

---

## Método 3: Usando SSH (Avançado)

Se você já tem SSH configurado no GitHub:

```bash
cd /home/ubuntu/private-fields-trello-powerup

# Remover remote antigo (se existir)
git remote remove origin

# Adicionar novo remote SSH
git remote add origin git@github.com:IoriCastroPrissma/CamposPersonalizadosPowerUp.git

# Fazer push
git push -u origin main
```

---

## ✅ Verificar se o Push foi Bem-Sucedido

Após executar o comando `git push`, você deve ver uma mensagem similar a:

```
Enumerating objects: 150, done.
Counting objects: 100% (150/150), done.
Delta compression using up to 8 threads
Compressing objects: 100% (120/120), done.
Writing objects: 100% (150/150), 5.23 MiB | 2.50 MiB/s, done.
Total 150 (delta 30), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (30/30), done.
To https://github.com/IoriCastroPrissma/CamposPersonalizadosPowerUp.git
 * [new branch]      main -> main
Branch 'main' set to track remote branch 'main' from 'origin'.
```

Acesse seu repositório no GitHub para confirmar que todos os arquivos foram enviados:
https://github.com/IoriCastroPrissma/CamposPersonalizadosPowerUp

---

## 🔒 Segurança

- **Nunca compartilhe seu token pessoal** com ninguém
- Se você compartilhou acidentalmente, delete o token em https://github.com/settings/tokens
- Tokens com escopo `repo` têm acesso completo aos seus repositórios
- Considere usar um token com escopo limitado ou SSH para maior segurança

---

## ❓ Problemas Comuns

### Erro: "fatal: could not read Username for 'https://github.com'"
**Solução:** Use o GitHub CLI (`gh auth login`) ou um token de acesso pessoal.

### Erro: "Permission denied (publickey)"
**Solução:** Você está usando SSH, mas não tem a chave SSH configurada. Use HTTPS ou configure SSH em https://github.com/settings/keys

### Erro: "remote origin already exists"
**Solução:** Execute `git remote remove origin` antes de adicionar o novo remote.

---

Após fazer o push com sucesso, você estará pronto para configurar o deployment automático em Vercel! 🚀
