# Manual — Majorama.redação

O app é um **molde**, não um corretor. Você escreve a redação **uma etapa por vez**, em texto corrido; ele marca cada bloco e monta um prompt para qualquer LLM corrigir. Na primeira visita, o **Manual** (botão ≡) abre sozinho com 4 páginas curtas: o que é o app, o algoritmo sem decoreba, os pontos fracos e a correção.

## Fluxo
1. **Etapa 1 · Projeto de texto.** Escolha **como dividir o tema** (A1 × A2): instituições × sociedade, dois desafios, causa × consequência, passado × presente, indivíduo × coletivo, ou divisão própria. Depois preencha tema, palavras-chave, "por que isso é um problema?", argumento 1 (D1), argumento 2 (D2) e uma solução para cada. **Ctrl+Enter** avança de campo.
2. **Redação.** Cada etapa aparece grifada. Escreva e pressione **Ctrl+Enter** (⌘+Enter no Mac, ou **Concluir**). Os marcadores (`@R1I@ … @R1F@`) são colocados sozinhos; o que você digitar nunca vira marcador.
3. **Conectivos são etapas (K1 a K11).** Os de abertura de parágrafo (K2, K6, K10) são obrigatórios; os internos têm o botão **Sem conectivo (opcional)** no guia da etapa. Abrir toda frase com conectivo soa mecânico.
4. **Prompt.** Toque em **Prompt**. A tela mostra uma **checagem mecânica** (fatos contados, não nota), **Copiar prompt** e **Copiar contra-prova**.

## O algoritmo (4 passos por desenvolvimento)
**Afirmo** (conectivo + tópico frasal) → **provo** (repertório LEPER PRO) → **explico** (aprofundamento, sem lacunas) → **fecho** (síntese). O D1 desenvolve A1 e o D2, A2. O conectivo de abertura do D2 muda conforme a divisão (soma, causa, tempo, escala).

## Pontos fracos (leve a sério)
1. Molde cheio, ideia vazia: o app não avalia ideias.
2. Repertório de bolso: exemplos do app são só de forma. Não copie.
3. Divisão errada para o tema; A1 e A2 não podem se sobrepor.
4. Conectivo em toda frase soa mecânico: omita os internos quando a frase já fluir.
5. Parágrafos clonados denunciam texto decorado.
6. O algoritmo não cobre norma culta, extensão (7 a 30 linhas) nem direitos humanos na proposta. O prompt pede essas checagens; elas também são suas.
7. LEPER PRO é mnemônico de cursinho, não regra da prova; a prova não exige dois desenvolvimentos.
8. Bloco a bloco pode quebrar o fio: releia o texto inteiro antes do prompt.

## Correção
1. Confira a checagem mecânica. 2. Copie o prompt para uma **conversa nova** do LLM. 3. Leia pelas **evidências** (trechos citados), não pela nota. 4. Onde aparecer **VERIFICAR**, confira a fonte. 5. Cole a **contra-prova** na mesma conversa. 6. Rode em dois modelos e **só aja no que se repetir**; reescreva apenas o bloco apontado.

A nota do LLM é uma opinião e tende a ser generosa: use como termômetro, não como placar.

## Tela
- **Foco:** o trecho com o cursor cresce; os demais ficam levemente transparentes. Clique em qualquer trecho para editá-lo; ← → passam ao vizinho; **Ctrl+Enter** em trecho antigo volta ao fim do texto.
- **Painel do projeto (esquerda)** e **estrutura/guia (direita):** ocultáveis em **Projeto** e **Painel**. O Manual e o Prompt ocupam a tela toda.
- **? Ajuda:** tour da interface.

## Problemas comuns
- **"Escreva … antes de concluir":** a etapa está vazia (nos conectivos internos, use "Sem conectivo").
- **Perdi o texto:** o app salva no navegador (localStorage); modo anônimo ou outro navegador não enxerga.
- **Copiar não funciona:** selecione o texto do prompt e copie manualmente.

## Licença
PolyForm Noncommercial 1.0.0: uso não comercial (acadêmico). Veja `LICENSE`.
