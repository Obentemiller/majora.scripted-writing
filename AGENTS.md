# AGENTS.md — Majorama.redacao

Este projeto segue o **padrão Majorama UI** (`vendor/majorama-ui/` + `PADRAO.md` do kit). Regras:
1. Não edite `vendor/majorama-ui/*`: mudanças de visual/comportamento geral vão para o repositório do kit. Regras do projeto: `app.css` / `app.js`.
2. Mantenha os ids da convenção do kit e o sistema de ajuda (`? Ajuda`, `PASSOS` em `app.js`, `manual.md`). Mudou um controle? Atualize o passo do tutorial e o manual.
3. Sem estilos inline, sem `onclick=`, sem `innerHTML` com dados de usuário. `localStorage` sempre em try/catch.
4. Todo controle precisa ter alvo de toque ≥ 44 px no modo vertical e funcionar com o dedo (sem depender de hover).
5. Exemplos de etapa mostram só a FORMA, com [colchetes]; nunca nomes de autores/obras prontos para copiar (teste em `tests/browser_test.py`). O prompt nunca deve impor uma divisão A1 × A2 fixa nem mandar corrigir "exclusivamente" pelo algoritmo.
6. Antes de concluir: `python tests/browser_test.py` (Chromium) e, `npm install --no-save jsdom && node tests/ui_smoke.mjs`; confira o visual no navegador, em tela larga e em celular (em pé e deitado).
