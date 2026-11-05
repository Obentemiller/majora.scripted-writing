# Manual — Majorama.redação

Primeiro você monta o **plano** da redação; depois escreve o texto **como um texto direto**, com as etapas do algoritmo grifadas, e gera um prompt estruturado para qualquer LLM corrigir.

## Tela
- **Texto (centro):** a redação é um texto contínuo. Cada etapa aparece como um trecho grifado, com uma cor. Clique em um trecho para editá-lo.
- **Foco:** quando o cursor está em um trecho, ele cresce um pouco e os demais ficam levemente transparentes. Assim você mantém o fio da meada sem perder a leitura do restante.
- **Painel lateral:** *Plano* (etapa 1), *Estrutura* (✓ feita, ● atual, ○ pendente) e *Guia da etapa* (o que se espera, objetivo, dica de conectivo e exemplo). Recolha o plano no botão **▾**; oculte o painel inteiro no botão **Painel**.

## Uso
1. Preencha o **plano**: tema, palavras-chave, problemática do D1 (C1), problemática do D2 (C2) e uma solução para cada causa. O guia pergunta “por que isso é um problema?” para ajudar a extrair as problemáticas.
2. Toque em **Concluir plano e começar a redação**. A escrita só é liberada depois disso.
3. Escreva a etapa atual seguindo o guia. O plano fica visível no painel lateral enquanto você escreve.
4. Pressione **Ctrl+Enter** (⌘+Enter no Mac), ou toque em **Concluir**. O app avança para a próxima etapa e guarda os marcadores de início e fim para o prompt.
5. Clique em um trecho grifado (ou em uma etapa feita no painel) para editá-lo. **Ctrl+Enter** salva; **Esc** cancela.
6. Ao final (ou a qualquer momento), toque em **Prompt**, depois **Copiar prompt**, e cole no LLM.

## Etapas
**Plano (etapa 1):** tema, palavras-chave, problemáticas C1 e C2, soluções para as duas causas.

**Introdução (3):** repertório inicial `R1`, conectivo repertório → tema `CI`, tema + tese `TE`.

**Desenvolvimento 1 (5):** conectivo interparágrafo `D1C`, tópico frasal `D1P1` (C1), repertório `D1P2` (LEPER PRO), aprofundamento `D1P3`, fechamento `D1P4`.

**Desenvolvimento 2 (5):** conectivo de progressão `D2C`, tópico frasal `D2P1` (C2), repertório `D2P2`, aprofundamento `D2P3`, fechamento `D2P4`.

**Conclusão (3):** conectivo conclusivo `CCL`, retomada da tese `CC`, proposta de intervenção `PI`.

Total: **1 plano + 16 etapas de escrita**.

## Conectivos
Cada passagem tem uma função; o guia mostra a melhor dica para a etapa:
- **Repertório → tema (`CI`):** *Fora da ficção* (alternativas: Nesse sentido, Nessa ótica, Sob esse viés).
- **Abrir o D1 (`D1C`):** *Em primeiro plano, cabe destacar que* (alternativas: Em primeira análise, Sob esse viés, Primeiramente).
- **Progredir para o D2 (`D2C`):** *Além disso, é válido ressaltar que* (alternativas: Ademais, Outrossim, Em segundo plano).
- **Fechar o D1 (`D1P4`):** *Dessa forma* (alternativas: Assim, Consequentemente).
- **Fechar o D2 (`D2P4`):** *Dessa maneira* (alternativas: Assim, Portanto).
- **Abrir a conclusão (`CCL`):** *Portanto, é possível concluir que* (alternativas: Em suma, Diante do exposto, Dessa forma).

Como o conectivo é escrito em uma etapa própria, o tópico frasal seguinte começa com minúscula e não repete o conectivo.

## Prompt
O prompt reúne:
1. o plano da redação;
2. o algoritmo (critério de correção);
3. a redação como **texto direto**, com os marcadores `@XXXI@ … @XXXF@` demarcando cada etapa;
4. o que se espera de cada etapa;
5. o que o corretor deve retornar.

Os marcadores não fazem parte do texto do aluno; servem apenas para o corretor localizar cada etapa.

## Problemas comuns
- **“Conclua o plano…”:** a escrita só começa depois que todos os campos do plano estão preenchidos.
- **“Escreva o texto da etapa…”:** a etapa está vazia.
- **Perdi o texto:** o app salva no navegador (localStorage). Modo anônimo ou outro navegador não enxerga o que foi salvo.
- **Dados de uma versão antiga:** a redação é preservada e os conectivos iniciais são separados automaticamente quando possível. O plano pode aparecer vazio; use **Editar plano** para preenchê-lo.
- **Ao voltar do plano:** use **Salvar** para manter as alterações. Sair pelo botão **Plano** ou por **Voltar ao texto** descarta o que não foi salvo.
- **Trecho com sublinhado tracejado:** há uma alteração não concluída. Clique no trecho e use **Ctrl+Enter** para salvar.
- **Copiar não funciona:** selecione o texto do prompt e copie manualmente.

## Limites
A correção é feita pelo LLM que você escolher; o app só prepara o prompt. A nota é apenas estimativa.
Apagar a redação mantém o plano; para trocar o tema, edite o plano.

## Licença
PolyForm Noncommercial 1.0.0: uso não comercial (acadêmico). Veja `LICENSE`.
