# Majorama.redação

Interface que ensina a estrutura fixa da redação dissertativo-argumentativa: o usuário monta o projeto de texto (etapa 1) e escreve em texto corrido, etapa por etapa, com trechos grifados e marcadores automáticos (`@R1I@ … @R1F@`). O app gera um prompt estruturado (algoritmo + projeto + redação em blocos + o que se espera de cada bloco) para correção em qualquer LLM.

Feito com o kit **Majorama UI** (`vendor/`). Sem dependências e sem build.

## Publicar no GitHub Pages
Repositório `majorama-redacao` → Settings → Pages → branch `main`, pasta `/`.
Teste local: `python -m http.server` e abra http://localhost:8000.

## Licença
PolyForm Noncommercial 1.0.0 — uso comercial proibido (apenas acadêmico/não comercial). Ver `LICENSE`.
