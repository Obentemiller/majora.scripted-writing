# Relatório de testes — Majorama.redação (reformulação)

## O que foi testado e como
- **Navegador real** (Chromium via Playwright), celular 390×780 e desktop 1280×800: `python tests/browser_test.py`. **35 verificações, 0 falhas** na última rodada.
- Inspeção do código e do prompt gerado.
- **Não foi testado:** nenhum LLM real (sem acesso à rede neste ambiente). Por isso, o efeito do novo prompt sobre as correções está **sem medição**; o protocolo para medir está em `tests/casos_de_vies.md`. O `ui_smoke.mjs` (jsdom) foi adaptado, mas **não foi executado** (jsdom não está instalado aqui).

## Vieses e defeitos encontrados no original → o que foi feito
| # | Achado | Gravidade | Estado |
|---|---|---|---|
| 1 | O aluno digitando `@R1F@` no texto criava um fim de bloco falso no prompt (confirmado em teste). Também permitia injetar ordens. | Alta | **Corrigido**: `@` do aluno vira `＠`; o prompt trata o texto como dado. |
| 2 | Prompt mandava corrigir "EXCLUSIVAMENTE" pelo algoritmo: o LLM nota aderência ao molde, não qualidade; ignora norma culta e direitos humanos (que zeram a Competência V). | Alta | **Corrigido**: duas camadas (A estrutura / B ENEM), regra "fora do molde ≠ erro", C-I e C-V cobradas. |
| 3 | Divisão fixa "institucional × sociocultural" escrita no algoritmo, nos rótulos e no prompt: todo tema era empurrado para o mesmo molde, e textos válidos com outra divisão seriam marcados como falha. O algoritmo geral novo diz justamente que ela é só uma entre várias. | Alta | **Corrigido**: 6 divisões; perguntas, rótulos, conectivos e prompt acompanham. |
| 4 | "Além disso" fixo na abertura do D2 afirma relação de soma mesmo quando A2 é consequência/tempo. | Média | **Corrigido**: conectivo muda por divisão. |
| 5 | Exemplos com Bauman, Kant e *Vidas Secas* (guia, e Bauman no texto do prompt): ancoragem e incentivo a repertório de bolso. | Média | **Corrigido**: exemplos só de forma, com `[colchetes]`; teste automático impede reincidência. |
| 6 | 11 conectivos obrigatórios: cada frase do D1 e do D2 abria com conectivo (coesão mecânica, repetição). | Média | **Corrigido**: internos opcionais ("Sem conectivo"); omissão não é falha no prompt; abertura de parágrafo segue obrigatória. |
| 7 | "Estimativa de nota 0 a 200" sem regras: tende a inflar e a dar valor único. | Média | **Mitigado**: faixas, evidência citada obrigatória, "na dúvida, o menor", contra-prova. **Sem medição.** |
| 8 | LLM "confirma" citações de memória. | Média | **Mitigado**: regra VERIFICAR. **Sem medição.** |
| 9 | LEPER PRO apresentado como critério "ENEM". | Baixa | **Corrigido**: marcado como mnemônico de cursinho, no prompt e no manual. |
| 10 | Usuário novo caía direto no formulário, sem explicação; limites do método invisíveis. | Alta (usabilidade) | **Corrigido**: manual de 4 páginas na 1ª visita (botão ≡ reabre). |
| 11 | Sem orientação sobre como ler a resposta do LLM. | Alta (usabilidade) | **Corrigido**: página 4, "Como usar" na tela do prompt, contra-prova. |

## Riscos que continuam abertos
1. **Ancoragem pelo "Esperado:"**: dar ao LLM o que cada bloco deveria fazer facilita veredito "Cumpre". As regras 3–5 do prompt mitigam, mas só os casos C1–C2 com LLM real dizem quanto.
2. **Algoritmo em si**: parágrafos com o mesmo ritmo de 4 passos podem soar como fórmula; a Competência III valoriza autoria. O app avisa (manual, ponto 5), mas não mede.
3. **Checagem mecânica** (palavra-chave ausente, tópico frasal sem termo do projeto) compara palavras e erra com sinônimos. Está rotulada "confira"; não entra no prompt.
4. **Divisão é do usuário**: o app não detecta A1 e A2 sobrepostos nem divisão inadequada ao tema (só alerta no manual e nas perguntas).
5. **Não há modo "só prompt de revisão"**: depois da correção, o ciclo reescrever → novo prompt é manual.
6. O estado salvo (`localStorage`) é por navegador; sem exportar/importar.

## Sugestão de próximo passo
Rodar `tests/casos_de_vies.md` (C1–C6) em 2 modelos, antes e depois, e anotar. Se C1 ou C2 falharem, o ajuste mais provável é **tirar "Esperado:" do prompt** (deixar só no app) e testar de novo.
