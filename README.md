# Majorama.redação

Interface que ensina a estrutura fixa da redação dissertativo-argumentativa: o usuário monta o projeto de texto (etapa 1) e escreve em texto corrido, etapa por etapa, com trechos grifados e marcadores automáticos (`@R1I@ … @R1F@`). O app abre com um manual (algoritmo, pontos fracos e correção), deixa escolher a divisão A1 × A2 do tema e gera um prompt estruturado (regras anti-viés + algoritmo + projeto + redação em blocos + o que se espera de cada bloco) para correção em qualquer LLM, com um segundo prompt de contra-prova.

Feito com o kit **Majorama UI** (`vendor/`). Sem dependências e sem build.

## Testes
`python tests/browser_test.py` (Playwright/Chromium) cobre fluxo, manual e testes de viés do prompt. `tests/ui_smoke.mjs` (jsdom) é o smoke antigo. Casos para testar a correção com LLMs reais: `tests/casos_de_vies.md`. Resultados e limites: `RELATORIO_TESTES.md`.

## Publicar no GitHub Pages
Repositório `majorama-redacao` → Settings → Pages → branch `main`, pasta `/`.
Teste local: `python -m http.server` e abra http://localhost:8000.

## Licença
PolyForm Noncommercial 1.0.0 — uso comercial proibido (apenas acadêmico/não comercial). Ver `LICENSE`.
