# AGENTS.md — Majorama.redacao

Este projeto segue o **padrão Majorama UI** (`vendor/majorama-ui/` + `PADRAO.md` do kit). Regras:
1. Não edite `vendor/majorama-ui/*`: mudanças de visual/comportamento geral vão para o repositório do kit. Regras do projeto: `app.css` / `app.js`.
2. Mantenha os ids da convenção do kit e o sistema de ajuda (`? Ajuda`, `PASSOS` em `app.js`, `manual.md`). Mudou um controle? Atualize o passo do tutorial e o manual.
3. Sem estilos inline, sem `onclick=`, sem `innerHTML` com dados de usuário. `localStorage` sempre em try/catch.
4. Todo controle precisa ter alvo de toque ≥ 44 px no modo vertical e funcionar com o dedo (sem depender de hover).
5. Antes de concluir: `npm install --no-save jsdom && node tests/ui_smoke.mjs`; confira o visual no navegador, em tela larga e em celular (em pé e deitado).
