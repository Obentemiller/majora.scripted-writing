# Manual — Majorama.redação

Escreva a redação dissertativo-argumentativa **uma etapa por vez** e gere um prompt estruturado para qualquer LLM corrigir.

## Tela
- **Texto (centro):** a caixa colorida é a etapa atual. As etapas concluídas viram blocos coloridos, lidos em sequência como a redação final.
- **Painel lateral:** *Estrutura* (✓ feita, ● atual, ○ pendente) e *Guia da etapa* (o que se espera, objetivo, conectivos, exemplo). Oculte com **Painel** para ampliar o texto.

## Uso
1. Escreva a etapa atual seguindo o guia.
2. Pressione **Ctrl+Enter** (⌘+Enter no Mac), ou toque em **Concluir**. O app marca início e fim da etapa (`@R1I@ … @R1F@`) e avança.
3. Clique em um bloco (ou em uma etapa feita no painel) para editá-lo. **Ctrl+Enter** salva; **Esc** cancela.
4. Ao final (ou a qualquer momento), toque em **Prompt**, depois **Copiar prompt**, e cole no LLM.

## Etapas
Introdução (3): repertório inicial `R1`, conectivo `CI`, tema + tese `TE`.
Desenvolvimento 1 (C1) e 2 (C2), 4 passos cada: `P1` conectivo + tópico frasal, `P2` repertório LEPER PRO, `P3` aprofundamento, `P4` fechamento.
Conclusão (2): retomada `CC` e proposta de intervenção `PI`.
O algoritmo do D1/D2 é o anexado ao projeto; Introdução e Conclusão são complementos e estão identificados no prompt.

## Problemas comuns
- **“Escreva o texto antes de concluir”:** a etapa está vazia.
- **Perdi o texto:** o app salva no navegador (localStorage). Modo anônimo ou outro navegador não enxerga o que foi salvo.
- **Copiar não funciona:** selecione o texto do prompt e copie manualmente.

## Limites
A correção é feita pelo LLM que você escolher; o app só prepara o prompt. A nota é apenas estimativa.

## Licença
PolyForm Noncommercial 1.0.0: uso não comercial (acadêmico). Veja `LICENSE`.
