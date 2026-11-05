/* Dados do algoritmo: etapas, explicações e texto-base do prompt.
   Planejamento (etapa 1) + Introdução + D1 + D2 + Conclusão.
   Desenvolvimento 1 e 2: fiel ao algoritmo anexado. Introdução e Conclusão: complemento do projeto. */
const PARAGRAFOS=['Introdução','Desenvolvimento 1 — causa institucional (C1)','Desenvolvimento 2 — causa sociocultural (C2)','Conclusão'];

const PLANO_GUIA='Antes de escrever, extraia o que vai sustentar a redação. Para cada problemática, pergunte: por que isso é um problema? Quem é afetado? O que falta? Quais são as consequências? Para cada solução, pense em agente, ação, meio/modo e finalidade. Esse plano será o norte do D1, do D2 e da conclusão.';

const PLANO_CAMPOS=[
 {id:'tema',rotulo:'Tema',dica:'Qual é o tema proposto? Escreva em uma frase objetiva.',placeholder:'Ex.: A persistência da desigualdade no acesso à educação básica no Brasil.'},
 {id:'palavras',rotulo:'Palavras-chave',dica:'Liste os termos que não podem faltar na redação, separados por vírgula.',placeholder:'Ex.: desigualdade, educação, acesso, políticas públicas, inclusão.'},
 {id:'p1',rotulo:'Problemática do D1 (C1)',rows:3,dica:'Causa institucional/estrutural. Por que isso é um problema? Quem é afetado? O que falta? Transforme o raciocínio em uma frase.',placeholder:'Ex.: A falta de investimento e de gestão pública mantém escolas periféricas sem estrutura, perpetuando a exclusão.'},
 {id:'p2',rotulo:'Problemática do D2 (C2)',rows:3,dica:'Causa sociocultural/comportamental. Por que isso é um problema? Como a sociedade contribui? Transforme o raciocínio em uma frase.',placeholder:'Ex.: A desinformação e o preconceito levam parte da população a naturalizar a desigualdade e a não cobrar mudanças.'},
 {id:'s1',rotulo:'Solução para o D1',rows:3,dica:'Pense em agente, ação, meio/modo e finalidade. Essa solução será retomada na conclusão.',placeholder:'Ex.: O Ministério da Educação deve ampliar o repasse de verbas e a formação de gestores, por meio de um programa nacional, a fim de garantir estrutura às escolas.'},
 {id:'s2',rotulo:'Solução para o D2',rows:3,dica:'Pense em agente, ação, meio/modo e finalidade. Essa solução será retomada na conclusão.',placeholder:'Ex.: Escolas e mídias públicas devem promover campanhas de conscientização, com oficinas e debates, para combater a desinformação.'}
];

const ETAPAS=[
 /* ---------------- INTRODUÇÃO ---------------- */
 {id:'R1',p:0,nome:'Repertório inicial',cor:210,
  espera:'Abra com um repertório sociocultural (filosofia, sociologia, história, lei, cinema, literatura, pesquisa) que se relacione ao tema.',
  objetivo:'Mostrar domínio de uma área do conhecimento já na primeira frase e abrir caminho para o tema.',
  ex:'“Na obra ‘Vidas Secas’, Graciliano Ramos retrata a exclusão de sujeitos invisibilizados pelo Estado.”'},

 {id:'CI',p:0,nome:'Conectivo repertório → tema',cor:195,tipo:'conectivo',
  espera:'Uma ponte curta que liga o repertório ao tema, sem salto brusco. Pode ser uma frase completa ou uma expressão de transição.',
  objetivo:'Manter a leitura linear: o leitor deve entender por que o repertório foi trazido.',
  ex:'“Fora da ficção, essa realidade ainda persiste no Brasil contemporâneo.”',
  dicaConectivo:{principal:'Fora da ficção',alternativas:'Nesse sentido · Nessa ótica · Sob esse viés',funcao:'Ligar o repertório ao tema e mostrar que a obra dialoga com a realidade brasileira.'}},

 {id:'TE',p:0,nome:'Tema + tese (antecipa C1 e C2)',cor:225,
  espera:'Apresente o tema com clareza e declare a tese, antecipando as duas causas: a institucional (C1) e a sociocultural (C2).',
  objetivo:'Dar ao avaliador o projeto de texto. O D1 retomará C1 e o D2 retomará C2, exatamente como anunciados aqui.',
  ex:'“Nesse cenário, o problema X persiste. Isso ocorre pela inoperância governamental (C1) e pela desinformação social (C2).”',
  dicaConectivo:{principal:'Nesse cenário',alternativas:'Diante disso · Nessa perspectiva · Assim',funcao:'Retomar o tema depois da ponte e apresentar a tese.'}},

 /* ---------------- DESENVOLVIMENTO 1 ---------------- */
 {id:'D1C',p:1,nome:'D1 · Conectivo interparágrafo',cor:160,tipo:'conectivo',
  espera:'Escreva a expressão de transição que abre o D1 e introduz a primeira causa. Termine com vírgula ou com “que” para o tópico frasal continuar a frase.',
  objetivo:'Sinalizar ao leitor que começa o primeiro parágrafo de desenvolvimento e marcar a progressão do texto.',
  ex:'“Em primeiro plano, cabe destacar que”',
  dicaConectivo:{principal:'Em primeiro plano, cabe destacar que',alternativas:'Em primeira análise · Sob esse viés · Primeiramente',funcao:'Abrir o D1 e anunciar a primeira causa (C1), sem repetir o conectivo no tópico frasal.'}},

 {id:'D1P1',p:1,nome:'D1 · Tópico frasal (C1)',cor:150,
  espera:'Frase curta e direta que retoma C1 exatamente como foi antecipada na tese. Como o conectivo já foi escrito na etapa anterior, comece com minúscula e não repita “Em primeiro plano”.',
  objetivo:'Orientar a leitura do avaliador e demonstrar um projeto de texto planejado.',
  ex:'“a inoperância governamental se configura como um entrave decisivo para o enfrentamento dessa problemática.”'},

 {id:'D1P2',p:1,nome:'D1 · Repertório (LEPER PRO)',cor:140,
  espera:'Fundamentação de uma área do conhecimento reconhecida. Legitimado: área formal. Pertinente: ligado ao eixo temático. Produtivo: vinculado ao argumento, nunca uma citação de bolso solta.',
  objetivo:'Atingir a nota máxima na Competência II com repertório que sustenta a causa.',
  ex:'“Nessa perspectiva, o sociólogo Zygmunt Bauman, em ‘Modernidade Líquida’, defende que as instituições públicas perdem sua função social quando não garantem a proteção efetiva dos cidadãos.”',
  dicaConectivo:{principal:'Nessa perspectiva',alternativas:'Sob essa ótica · Nesse contexto',funcao:'Introduzir o repertório que sustenta a causa C1.'}},

 {id:'D1P3',p:1,nome:'D1 · Aprofundamento crítico',cor:130,
  espera:'Explique como o repertório se aplica ao Brasil. Responda: por que isso acontece? Como se manifesta no cotidiano? Quais as consequências imediatas? Use marcas de autoria e juízo de valor (adjetivos e advérbios opinativos).',
  objetivo:'Evitar lacunas argumentativas. Regra de ouro: o óbvio precisa ser dito; o corretor não deduz a relação entre teoria e tema.',
  ex:'“Sob essa ótica, constata-se que a tese de Bauman se materializa no cenário brasileiro, haja vista que a escassez de investimentos estatais perpetua a marginalização dos grupos afetados. Dessa forma, a ausência de políticas públicas integradas converte direitos em meros privilégios inalcançáveis.”',
  dicaConectivo:{principal:'Sob essa ótica',alternativas:'Nesse sentido · Constata-se que',funcao:'Ligar o repertório à análise da realidade brasileira.'}},

 {id:'D1P4',p:1,nome:'D1 · Fechamento do parágrafo',cor:120,
  espera:'Conectivo conclusivo intraparágrafo que sintetiza a discussão, reafirma a necessidade de superar C1 e conclui sem introduzir assunto novo.',
  objetivo:'Arrematar o raciocínio do parágrafo.',
  ex:'“Dessa forma, torna-se imperioso combater a omissão do Poder Público para que a cidadania plena seja restaurada.”',
  dicaConectivo:{principal:'Dessa forma',alternativas:'Assim · Consequentemente',funcao:'Sintetizar o D1 e reafirmar a necessidade de superar C1.'}},

 /* ---------------- DESENVOLVIMENTO 2 ---------------- */
 {id:'D2C',p:2,nome:'D2 · Conectivo de progressão',cor:40,tipo:'conectivo',
  espera:'Conectivo de adição/progressão que liga o D1 ao D2. Termine com vírgula ou com “que” para o tópico frasal continuar a frase.',
  objetivo:'Marcar a progressão do texto: sair da primeira causa e acrescentar a segunda.',
  ex:'“Além disso, é válido ressaltar que”',
  dicaConectivo:{principal:'Além disso, é válido ressaltar que',alternativas:'Ademais · Outrossim · Em segundo plano',funcao:'Progressão: sair do D1 e acrescentar a segunda causa (C2).'}},

 {id:'D2P1',p:2,nome:'D2 · Tópico frasal (C2)',cor:35,
  espera:'Tópico frasal que declara a causa social/comportamental (C2), exatamente como antecipada na tese. Como o conectivo já foi escrito, comece com minúscula e não repita “Além disso”.',
  objetivo:'Manter o projeto planejado e orientar a leitura da segunda causa.',
  ex:'“a desinformação da própria sociedade contribui diretamente para a manutenção desse problema.”'},

 {id:'D2P2',p:2,nome:'D2 · Repertório (LEPER PRO)',cor:34,
  espera:'Novo repertório legitimado, pertinente e produtivo, vinculado a C2 (diferente do usado no D1).',
  objetivo:'Sustentar a causa sociocultural com fundamentação reconhecida.',
  ex:'“Nesse contexto, o filósofo Immanuel Kant afirma que o esclarecimento é a saída do homem de sua menoridade, o que exige acesso ao conhecimento.”',
  dicaConectivo:{principal:'Nesse contexto',alternativas:'Sob esse viés · Nessa perspectiva',funcao:'Introduzir o repertório que sustenta a causa C2.'}},

 {id:'D2P3',p:2,nome:'D2 · Aprofundamento crítico',cor:30,
  espera:'Mostre o impacto da desinformação, do preconceito ou da omissão da própria sociedade. Responda: por quê? Como se manifesta? Quais as consequências? Com marcas de autoria.',
  objetivo:'Sem lacunas: descreva a relação entre repertório e realidade brasileira.',
  ex:'“Sob esse viés, a tese kantiana se concretiza no Brasil, pois a circulação de informações falsas mantém a população refém de preconceitos, o que agrava a exclusão social.”',
  dicaConectivo:{principal:'Sob esse viés',alternativas:'Nesse sentido · Constata-se que',funcao:'Ligar o repertório à análise da causa C2.'}},

 {id:'D2P4',p:2,nome:'D2 · Fechamento do parágrafo',cor:25,
  espera:'Conectivo conclusivo que sintetiza o parágrafo e reafirma a necessidade de superar C2, sem assunto novo.',
  objetivo:'Arrematar o raciocínio do parágrafo.',
  ex:'“Dessa maneira, é urgente combater a desinformação para que a sociedade exerça sua cidadania de forma crítica.”',
  dicaConectivo:{principal:'Dessa maneira',alternativas:'Assim · Portanto',funcao:'Sintetizar o D2 e reafirmar a necessidade de superar C2.'}},

 /* ---------------- CONCLUSÃO ---------------- */
 {id:'CCL',p:3,nome:'Conclusão · Conectivo conclusivo',cor:285,tipo:'conectivo',
  espera:'Conectivo que fecha a argumentação e abre a conclusão. Termine com vírgula ou com “que” para a retomada continuar a frase.',
  objetivo:'Sinalizar o fim da argumentação e preparar a retomada da tese.',
  ex:'“Portanto, é possível concluir que”',
  dicaConectivo:{principal:'Portanto, é possível concluir que',alternativas:'Em suma · Diante do exposto · Dessa forma',funcao:'Fechar a argumentação e abrir a conclusão.'}},

 {id:'CC',p:3,nome:'Conclusão · Retomada da tese',cor:290,
  espera:'Retomada breve da tese (tema, C1 e C2), sem novos argumentos. Como o conectivo já foi escrito, comece com minúscula.',
  objetivo:'Fechar o texto de modo coeso com a introdução.',
  ex:'“a persistência do problema X resulta da omissão estatal e da desinformação social.”'},

 {id:'PI',p:3,nome:'Conclusão · Proposta de intervenção',cor:310,
  espera:'Proposta com agente, ação, meio/modo, finalidade e detalhamento, articulada às causas C1 e C2 e às soluções do plano.',
  objetivo:'Apresentar solução viável e coerente com o que foi discutido.',
  ex:'“Cabe ao Ministério da Educação, em parceria com as escolas, promover campanhas e debates por meio de oficinas, a fim de combater a desinformação e garantir a cidadania.”',
  dicaConectivo:{principal:'Cabe ao',alternativas:'É imperioso que · Diante disso',funcao:'Introduzir a proposta de intervenção e articular as soluções do plano.'}}
];

const ALGORITMO=`ALGORITMO DE DESENVOLVIMENTO DA REDAÇÃO DO ENEM
Microestrutura sequencial de 4 passos lógicos, aplicada a cada parágrafo argumentativo (Desenvolvimento 1 e Desenvolvimento 2).
Projeto de texto: D1 processa a Causa Institucional/Estrutural (C1: inoperância governamental, insuficiência legislativa). D2 processa a Causa Sociocultural/Comportamental (C2: desinformação, preconceito enraizado). C1 e C2 devem ser antecipadas na tese da introdução.

Passo 1 — Conectivo interparágrafo + tópico frasal
Inicia-se com operador argumentativo interparágrafo; em seguida, tópico frasal (frase curta e direta que sintetiza a ideia central, retomando exatamente C1 no D1 ou C2 no D2, antecipada na tese). Objetivo: orientar a leitura do avaliador e demonstrar projeto de texto planejado.
Exemplo (D1): "Em primeiro plano, cabe pontuar que a inoperância governamental se configura como um entrave decisivo para o enfrentamento dessa problemática."

Passo 2 — Repertório sociocultural (regra LEPER PRO)
Fundamentação de área do conhecimento reconhecida (filosofia, sociologia, história, legislação, cinema, literatura, pesquisas). Para a nota máxima na Competência II: Legitimado (área formal do conhecimento), Pertinente (relação direta com o eixo temático), Produtivo (ativamente vinculado ao argumento, nunca citação de "bolso" decorativa).
Exemplo: "Nessa perspectiva, o sociólogo Zygmunt Bauman, em sua obra 'Modernidade Líquida', defende que as instituições públicas perdem sua função social quando não garantem a proteção efetiva dos cidadãos."

Passo 3 — Aprofundamento argumentativo e análise crítica (sem lacunas)
Explicar explicitamente como o repertório se aplica à realidade do problema no Brasil. Para evitar lacunas argumentativas (relação lógica subentendida), responder: Por que isso acontece? Como se manifesta no cotidiano? Quais são as consequências imediatas? É indispensável usar marcas de autoria e juízo de valor (adjetivos e advérbios opinativos). Regra de ouro: "O óbvio precisa ser dito" — o corretor não deve deduzir a relação entre teoria e tema.
Exemplo: "Sob essa ótica, constata-se que a tese de Bauman se materializa no cenário brasileiro, haja vista que a escassez de investimentos estatais perpetua a marginalização dos grupos afetados. Dessa forma, a ausência de políticas públicas integradas converte direitos constitucionalmente assegurados em meros privilégios inalcançáveis, agravando a vulnerabilidade social."

Passo 4 — Fechamento do parágrafo (síntese intraparágrafo)
Conectivo conclusivo intraparágrafo (Dessa forma, Assim, Consequentemente) que sintetiza a discussão, reafirma a necessidade de superar aquela causa específica e conclui sem introduzir assuntos novos.
Exemplo: "Assim, torna-se imperioso combater a omissão do Poder Público para que a cidadania plena seja restaurada."

Diferenciação D1 x D2
- Conectivo inicial: D1 = Em primeiro plano / Em primeira análise / Sob esse viés. D2 = Além disso / Ademais / Outrossim (adição/progressão).
- Tópico frasal: D1 declara a causa estatal/estrutural (C1). D2 declara a causa social/comportamental (C2).
- Foco do aprofundamento: D1 = falhas de gestão, omissão legislativa, falta de investimentos. D2 = impacto da desinformação, do preconceito ou da omissão da própria sociedade.

Complemento do projeto (não consta no algoritmo anexado; usar como critério básico): a Introdução segue a ordem repertório inicial → conectivo repertório-tema → apresentação do tema com tese que antecipa C1 e C2. A Conclusão retoma a tese e apresenta proposta de intervenção (agente, ação, meio/modo, finalidade, detalhamento).

Na interface, o conectivo interparágrafo e o tópico frasal são escritos em etapas separadas; juntos, formam o Passo 1.`;
