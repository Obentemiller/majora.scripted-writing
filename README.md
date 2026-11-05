# Majorama.redação

Interface que ensina a estrutura fixa da redação dissertativo-argumentativa. Primeiro o usuário monta o **plano** (tema, palavras-chave, problemáticas C1/C2 e soluções); depois escreve a redação **como um texto direto**, com cada etapa do algoritmo grifada no fluxo. Ao final, o app gera um prompt estruturado (plano + algoritmo + texto com demarcações + o que se espera de cada etapa) para correção em qualquer LLM.

Feito com o kit **Majorama UI** (`vendor/`). Sem dependências e sem build.

## Publicar no GitHub Pages
Repositório `majorama-redacao` → Settings → Pages → branch `main`, pasta `/`.
Teste local: `python -m http.server` e abra http://localhost:8000.

## Licença
PolyForm Noncommercial 1.0.0 — uso comercial proibido (apenas acadêmico/não comercial). Ver `LICENSE`.
