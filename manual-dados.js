/* Conteúdo da cartilha (primeira tela). Texto fixo escrito no projeto; **negrito** é interpretado por rich() em app.js, sem innerHTML.
   Tipos de bloco: p (parágrafo), fluxo (passos em linha), passos (cartões numerados), demo (exemplo colorido), cards (ponto fraco: h, x, faca), lista. */
const MANUAL=[
 {id:'oque',titulo:'O que é isto',sub:'Um molde, não um corretor.',blocos:[
  {t:'p',x:'O Majorama.redação é um **formatador**. Ele te leva a escrever a redação em blocos curtos, cada um com uma função, marca sozinho onde cada bloco começa e termina e, no fim, monta um **prompt** para um LLM (ChatGPT, Claude, Gemini…) corrigir.'},
  {t:'p',x:'Quem corrige é o LLM. O app só garante que o texto chegue organizado e que o corretor saiba **o que cada trecho deveria fazer**. Isso torna a correção mais específica, mas não a torna infalível (veja a página 3).'},
  {t:'fluxo',itens:[['1','Projeto de texto','Tema, as 2 ideias e as soluções'],['2','Escrita em blocos','Um trecho por vez, no texto corrido'],['3','Prompt','Seu texto + critérios, prontos para colar'],['4','Correção','O LLM avalia; você lê com senso crítico']]},
  {t:'p',x:'**Regra de ouro do app:** o molde organiza o raciocínio, não o substitui. Se as ideias da etapa 1 forem fracas, o texto sai “certinho e vazio”.'}
 ]},
 {id:'algoritmo',titulo:'O algoritmo, sem decoreba',sub:'Cada parágrafo de desenvolvimento é um mini-texto.',blocos:[
  {t:'p',x:'Pense em um advogado em 4 frases: **afirmo, provo, explico, fecho**. É isso que cada desenvolvimento (D1 e D2) faz.'},
  {t:'passos',itens:[
   {h:'1 · Afirmo',x:'Conectivo de abertura + **tópico frasal**: a ideia do parágrafo, curta e direta, nos mesmos termos da tese.',q:'Pergunta que responde: “qual é a ideia deste parágrafo?”'},
   {h:'2 · Provo',x:'Um **repertório** (autor, obra, lei, dado) que sustenta a ideia. Legitimado, pertinente e produtivo (LEPER PRO).',q:'Pergunta: “quem ou o que me dá autoridade?”'},
   {h:'3 · Explico',x:'O **aprofundamento**: como o repertório se aplica ao Brasil. Por que acontece? Como aparece no cotidiano? Qual a consequência? O óbvio precisa ser dito.',q:'Pergunta: “e daí? por que isso importa aqui?”'},
   {h:'4 · Fecho',x:'Um **fechamento** conclusivo: reafirma que é preciso enfrentar aquela ideia, sem assunto novo.',q:'Pergunta: “o que o leitor deve levar deste parágrafo?”'}]},
  {t:'p',x:'Ilustração da **forma** (o tema é só exemplo; o conteúdo é seu):'},
  {t:'demo',itens:[['TÓPICO',210,'Em primeiro lugar, a escassez de debate sobre a invisibilidade social atua como entrave central no Brasil.'],['REPERTÓRIO',150,'Nessa ótica, o conceito de “invisibilidade social”, da sociologia, mostra como certos grupos são ignorados pelo corpo social.'],['APROFUNDAMENTO',35,'No país, essa ocultação aparece na falta de informação clara, e a população não reconhece a gravidade; assim, os afetados ficam sem amparo, o que perpetua um ciclo alarmante de exclusão.'],['FECHAMENTO',290,'Desse modo, romper o silêncio sobre a pauta é passo urgente.']]},
  {t:'p',x:'**Os dois desenvolvimentos não são iguais.** O D1 desenvolve a ideia A1 e o D2, a ideia A2. Você escolhe **como dividir o tema** na etapa 1: instituições × sociedade, dois desafios, causa × consequência, passado × presente, indivíduo × coletivo, ou uma divisão sua. O app ajusta perguntas e conectivos à divisão escolhida.'}
 ]},
 {id:'fracos',titulo:'Pontos fracos: leve a sério',sub:'Onde o método pode te enganar.',blocos:[
  {t:'p',x:'Todo molde ajuda e também vicia. Estes são os riscos conhecidos deste app e o que fazer com cada um.'},
  {t:'cards',itens:[
   {h:'1. Molde cheio, ideia vazia',x:'Preencher os 4 passos com ideias vagas gera um parágrafo correto na forma e fraco no conteúdo. O app não avalia ideias.',faca:'Na etapa 1, teste cada argumento: “alguém poderia discordar disto? o que muda se for falso?”.'},
   {h:'2. Repertório de bolso',x:'Autor famoso encaixado à força vale menos que nenhum. Os exemplos do app são só de forma, com colchetes de propósito.',faca:'Se o seu repertório serviria para qualquer tema, ele não serve para este. Troque.'},
   {h:'3. Divisão errada para o tema',x:'“Instituições × sociedade” funciona muito, mas não sempre. Forçar um “culpado institucional” onde ele não existe gera argumento artificial. A1 e A2 também não podem se sobrepor.',faca:'Escolha a divisão que o tema pede. Se A2 for só A1 com outras palavras, refaça.'},
   {h:'4. Conectivo em toda frase',x:'Abrir cada frase com um conectivo soa mecânico e cobra pontos de coesão. Os conectivos internos são opcionais.',faca:'Use “Sem conectivo” quando a frase já fluir. Mantenha os de abertura de parágrafo.'},
   {h:'5. Parágrafos clonados',x:'Dois desenvolvimentos com o mesmo ritmo e as mesmas fórmulas denunciam texto decorado. O algoritmo é andaime, não a obra.',faca:'Varie o jeito de abrir e de explicar. A estrutura fica; a voz é sua.'},
   {h:'6. O algoritmo não cobre tudo',x:'Ele não avalia norma culta, extensão (a prova pede de 7 a 30 linhas) nem se a proposta respeita os direitos humanos, que pesa na nota. O prompt pede essas checagens ao LLM, mas elas são suas também.',faca:'Releia o texto corrido em voz alta e confira a ortografia e a pontuação.'},
   {h:'7. “LEPER PRO” não é regra da prova',x:'É um mnemônico de cursinho, útil, mas não o critério oficial. Um texto que foge do molde de modo eficaz não está “errado”. A prova também não exige dois desenvolvimentos nem quatro parágrafos: o molde é uma escolha segura, não uma obrigação.',faca:'O prompt separa “fora do molde” de “erro”. Cobre isso da correção.'},
   {h:'8. Bloco a bloco perde o fio',x:'Escrever em pedaços pode quebrar a progressão entre as frases.',faca:'Antes de gerar o prompt, leia o texto inteiro, de cima a baixo, como um corretor leria.'}]}
 ]},
 {id:'correcao',titulo:'A correção, passo a passo',sub:'Como usar o prompt e como ler o resultado.',blocos:[
  {t:'passos',itens:[
   {h:'1 · Confira antes',x:'Na tela do prompt, o app mostra uma **checagem mecânica** (blocos vazios, conectivos repetidos, palavras-chave ausentes). São fatos contados, não nota.',q:''},
   {h:'2 · Copie e cole',x:'Toque em **Copiar prompt** e cole em uma **conversa nova** do LLM, sem histórico. Se puder escolher, use o modelo mais capaz.',q:''},
   {h:'3 · Leia pelas evidências',x:'Confie mais nos apontamentos que **citam um trecho seu** e dizem o que falta do que na nota. Elogio genérico e nota alta sem trecho são sinal de alerta.',q:''},
   {h:'4 · Verifique as fontes',x:'O LLM pode errar autor, obra ou lei. Quando ele escrever “verificar”, confira você mesmo. Você também deve conferir o seu repertório.',q:''},
   {h:'5 · Peça a contra-prova',x:'Depois da correção, use **Copiar contra-prova**: ela manda o LLM argumentar contra a própria nota e achar onde foi indulgente.',q:''},
   {h:'6 · Cruze e aja',x:'Rode em dois modelos (ou duas vezes) e **só aja no que se repetir**. Depois reescreva apenas o bloco apontado: toque nele no texto, edite e gere de novo.',q:''}]},
  {t:'p',x:'**Sobre a nota:** a estimativa do LLM é uma opinião, não um resultado. Ela varia entre modelos e tende a ser generosa. Use como termômetro, nunca como placar.'},
  {t:'p',x:'**O que o LLM recebe:** o algoritmo, o seu projeto, o texto corrido e cada bloco entre marcadores (@R1I@ … @R1F@) com “o que se espera” dele. Os marcadores são colocados pelo app; o que você digita nunca vira marcador.'}
 ]}
];
